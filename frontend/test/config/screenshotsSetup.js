// Save a screenshot with a timestamp
const dir = './screenshots';
const date = new Date().toISOString().replace(/:/g, '-');

async function takeScreenshot(ipAddress) {
//Users/marinasukhova/Documents/QaTestProject/screenshots
await browser.saveScreenshot(`${dir}/${ipAddress}-${date}.png`);
}
module.exports = {
    takeScreenshot,
};