import { BeforeAll, AfterAll, Before, AfterStep, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { invokeBrowser } from "../browsers/browserManager";
import { createLogger, Logger } from "winston";
import Fixture from "./pageFixture";
import { options } from "../util/logger";
import TestDataReader from "../wrapper/testDataReader";

const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let logger: Logger;
let page: Page;
let count;
let testdataReader: TestDataReader;
export let contextFixture: Fixture;

BeforeAll(async function () {
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        ignoreHTTPSErrors: true,
        viewport: null,
        // recordVideo: {
        //     dir: "test-results/videos",
        // },
    });
    // await context.tracing.start({
    //     name: scenarioName,
    //     title: pickle.name,
    //     sources: true,
    //     screenshots: true, snapshots: true
    // });
    page = await context.newPage();
    testdataReader = new TestDataReader();
    // fixture.page = page;
    logger = createLogger(options(scenarioName));
    contextFixture = await new Fixture(page, logger, testdataReader, context)
});


// // Before(async function ({ pickle }) {
//     const scenarioName = pickle.name + pickle.id
//     context = await browser.newContext({
//         // storageState: getStorageState(pickle.name),
//         // recordVideo: {
//         //     dir: "test-results/videos",
//         // },
//     });
//     // await context.tracing.start({
//     //     name: scenarioName,
//     //     title: pickle.name,
//     //     sources: true,
//     //     screenshots: true, snapshots: true
//     // });
//     const page = await context.newPage();
//     logger = createLogger(options(scenarioName));
// // });

AfterStep(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;
    count+=1
    page = await contextFixture.getPage();
    // const path = `./test-results/trace/${pickle.id}.zip`;
    if (result?.status == Status.FAILED) {
        img = await page.screenshot(
            { path: `./test-results/screenshots/${pickle.name+count}.png`, type: "png" })
        // videoPath = await fixture.page.video().path();
    }
    // await context.tracing.stop({ path: path });
    await page.close();
    await context.close();
    if (result?.status == Status.FAILED) {
        await this.attach(
            img, "image/png"
        );
        // await this.attach(
        //     fs.readFileSync(videoPath),
        //     'video/webm'
        // );
        // const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
        // await this.attach(`Trace file: ${traceFileLink}`, 'text/html');

    }

    //ADO update
    // if()

});

AfterAll(async function () {
    await browser.close();
})


// function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
//     if (user.endsWith("admin"))
//         return "src/helper/auth/admin.json";
//     else if (user.endsWith("lead"))
//         return "src/helper/auth/lead.json";
// }


