
const expect = require('chai').expect;
const elementUtil = require('../../../utils/elementUtil');
const { eyes, checkElementView } = require('../config/eyesSetup');
const { handleNewWindowAndVerify } = require('../../../utils/windowHandling');
const { iterateListOfLists } = require('../../src/pages/mainPage');
const { getRandomIPAddresses } = require('../../../utils/randomeIPList');
const { getDataLayer } = require('../../../backend/dataUtils/dataLayer')
const { takeScreenshot } = require('../config/screenshotsSetup')


const expectCISAccountCode = ['908666621', '908660418']
const expDisplayName = 'The University of Luzern';

const expectedURL = 'https://www.nytimes.com/activate-access/digitalpass';
const expectedMessage = `Activate now for unlimited articles, courtesy of ${expDisplayName}. No payment needed.`
const expectedHeader = 'Unlock your complimentary access.';
const expectedCTA = 'ACTIVATE NOW';



const ipRanges = [
    [[147,88,207,0], [147,88,254,255]
    //[78, 108, 170, 0][78, 108, 170, 31],
    ]
];

describe('QA B2B Assets testing', () => {
    const fastlyClientIpArray = [];


    const ipAddresses = getRandomIPAddresses(ipRanges);

    ipAddresses.forEach(({ ipAddress }) => {
        it(`should perform tests for IP address ${ipAddress}`, async () => {


            // perform other actions and verifications 
            const { actualMessage, actualHeader, actualButtonText } = await iterateListOfLists(ipAddress);

            await takeScreenshot(ipAddress);

            expect(actualMessage).to.equal(expectedMessage, `Expected message: ${expectedMessage}`);
            expect(actualHeader).to.equal(expectedHeader, `Expected header: ${expectedHeader}`);
            expect(actualButtonText).to.equal(expectedCTA, `Expected CTA text: ${expectedCTA}`);

            // Call the window handling function
            const actualDrivesToURL = await handleNewWindowAndVerify(browser, elementUtil);
            expect(actualDrivesToURL).to.equal(expectedURL, `The URL should be equal to: "${expectedURL}"`);


        });
        it(`should perform data verifications for IP address ${ipAddress}`, async () => {
            const jsonKiddModel = await getDataLayer(ipAddress);

            // Data layer verifications
            expect(jsonKiddModel).to.exist; // Assert that jsonKiddModel is not null or undefined
            expect(jsonKiddModel.user.type).to.equal('anon', 'Expected user type to be "anon", Actual: ', jsonKiddModel.user.type);// Assert the User is Anon
            expect(jsonKiddModel.user.tracking.uid).to.equal(0, 'Expected tracking UID to be 0'); // Assert the tracking UID
            expect(expectCISAccountCode).to.include(jsonKiddModel.ip.corp.cisAccountCode, `Expected CIS Account Number to be one of ${expectCISAccountCode.join(', ')}, Actual: ${jsonKiddModel.ip.corp.cisAccountCode}`);
            //expect(jsonKiddModel.ip.corp.cisAccountCode).to.equal(expectCISAccountCode, `Expected CIS Account Number: ${expectCISAccountCode}, Actual: ${jsonKiddModel.ip.corp.cisAccountCode}`);
            expect(jsonKiddModel.ip.corp.displayName).to.equal(expDisplayName, `Expected Display Name: ${expDisplayName}, Actual: ${jsonKiddModel.ip.corp.displayName}`);
        });
    });
});







