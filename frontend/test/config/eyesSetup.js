//eyesSetup.js
require('dotenv').config(); // As close to the top of the file as possible

const elementUtil = require('../../../utils/elementUtil');
const { Eyes, Target, BatchInfo } = require('@applitools/eyes-webdriverio');
const dateTime = require('../../../utils/utils');

const eyes = new Eyes();



eyes.setServerUrl(process.env.APPLITOOLS_SERVER_URL);
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

// Create a BatchInfo for desktop and mobile
const desktopBatch = new BatchInfo(`Metered Assets Batch ${dateTime.getCurrentDateTime()}`);
eyes.setBatch(desktopBatch);

async function checkElementView(ipAddress, UnivName) {
    try {
        // Check the specified view
        //await eyes.open(driver, UnivName);
        //eyes.setViewportSize({ width: 1200, height: 800 });
        // Capture the current screenshot
        await eyes.check(`${ipAddress}`, Target.region(elementUtil.getElement('section.welcomeAdLayout:nth-child(4)')));
        
        // Close the Eyes session and wait for it to complete
        //await eyes.close();
    } catch (error) {
        console.error(`Error in checkViews:`, error);
    }
}

module.exports = {
    checkElementView, eyes
};