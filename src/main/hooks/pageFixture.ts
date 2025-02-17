import { BrowserContext, Browser, Page } from "@playwright/test";
import { Logger } from "winston";
import TestDataReader from "../wrapper/testDataReader";

// export const fixture (
//@ts-Ignore
// page: undefined as Page,
// contextFixture: undefined as Fixture
export default class Fixture {
    private page: Page;
    private browser: BrowserContext;
    private logger: Logger;
    private testDataReader: TestDataReader;
    constructor(private page1: Page, private logger1: Logger, private testData: TestDataReader, private browsers: BrowserContext) {
        this.page = page1;
        this.logger = logger1;
        this.testDataReader = testData;
        this.browser = browsers;
    }
    //*****Retrun Page reference*********…………/
    async getPage() {
        return await this.page;
    }
    //******return browser reference********
    async browserContext() {
        return await this.browser;
    }
    //********return logger reference*
    getLogger() {
        return this.logger;
    }
    //******return test data reader reference"
    getTestDatalleader() {
        return this.testDataReader;
    }
    //********store the page reference/
    async setPage(page) {
        this.page = await page;
    }
}