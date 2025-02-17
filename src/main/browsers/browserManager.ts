import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";
import { config } from "../../test/resources/Config/configProperties";

const chromeoptions: LaunchOptions = {
    headless: false,
    channel: "chrome",
    args: ['--ignore-certificate-errors', '--start-maximized']
}
const edgeoptions: LaunchOptions = {
    headless: false,
    channel: "msedge",
    args: ['--ignore-certificate-errors', '--start-maximized']
}
const firefoxoptions: LaunchOptions = {
    headless: false,
    channel: "firefox",
    args: ['--ignore-certificate-errors', '--start-maximized']
}
const webkitoptions: LaunchOptions = {
    headless: false,
    channel: "webkit",
    args: ['--ignore-certificate-errors', '--start-maximized']
}
const chromiumoptions: LaunchOptions = {
    headless: false,
    args: ['--ignore-certificate-errors', '--start-maximized']
}

const caps={
    
}
export const invokeBrowser = () => {
    const browserType = config.browserName || "chrome";
    switch (browserType) {
        case "chrome":
            return chromium.launch(chromeoptions);
        case "msedge":
            return chromium.launch(edgeoptions);
        case "firefox":
            return firefox.launch(firefoxoptions);
        case "webkit":
            return webkit.launch(webkitoptions);
        case "chromium":
            return webkit.launch(chromiumoptions);
        case "browserStack":
            return chromium.connect({
                wsEndpoint:
                `wss://cdp/browserstack.com/playwright?caps=`+
                `${encodeURIComponent(JSON.stringify(caps))}`
            })
        default:
            throw new Error("Please set the proper browser!")
    }

}