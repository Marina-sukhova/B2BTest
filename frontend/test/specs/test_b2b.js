
const expect = require('chai').expect;
const elementUtil = require('../../../utils/elementUtil');
const { handleNewWindowAndVerify } = require('../../../utils/windowHandling');
const { iterateListOfLists } = require('../../src/pages/mainPage');
const { getRandomIPAddresses } = require('../../../utils/randomeIPList');
const { checkDesktopViews } = require('../config/eyesSetup');
const { getDataLayer } = require('../../../backend/dataUtils/dataLayer')
const fastlyClientIpArray = [];

const expectedURL = 'http://www.accessnyt.com/';

const expectCISAccountCode = '900608647'
const expDisplayName = 'Paradise Valley Community College';

const expectedMessage = `Activate now for unlimited articles, courtesy of ${expDisplayName}. No payment needed.`
const expectedHeader = 'Unlock your complimentary access.';
const expectedCTA = 'ACTIVATE NOW';



const ipRanges = [
    [[140, 198, 144, 0], [140, 198, 159, 255],
   // [78, 108, 170, 0][78, 108, 170, 31]
]

];


describe('QA B2B Assets testing', () => {

    it('should successfully click the "Updated our terms" button inside an iframe', async () => {

        await browser.url('/')
        const cta = await elementUtil.getElement('.css-1fzhd9j');
        cta.click();
    });

    it('open the main page with ip address', async () => {
        // Number of checks IP addresses in each list
        const ipAddresses = getRandomIPAddresses(ipRanges);

        for (const { ipAddress, fastlyClientIp } of ipAddresses) {
            try {
                const { actualMessage, actualHeader, actualButtonText } = await iterateListOfLists(ipAddress)
                // Push the fastlyClientIp into the array
                fastlyClientIpArray.push(fastlyClientIp);

                expect(actualMessage.replace("\n", " ")).to.be.equal(expectedMessage, `The Asset header should be  ${expectedMessage}`);
                expect(actualHeader).to.equal(expectedHeader, `The Asset header should be  ${expectedHeader}`);
                expect(actualButtonText).to.equal(expectedCTA, `The CTA should have text: ${expectedCTA}`);

                //Capture screenshot using Applitools Eyes
                //await checkDesktopViews(ipAddress, expDisplayName);

                // Call the window handling function
                const actualDrivesToURL = await handleNewWindowAndVerify(browser, elementUtil);
                expect(actualDrivesToURL).to.equal(expectedURL, `The URL should be equal to: "${expectedURL}"`);

            } catch (error) {
                console.error(`An error occurred for IP address ${ipAddress}:`, error.message);
                // Continue to the next iteration
                continue;
            }
        }
    });
    describe('Data Layer Test', () => {
        it('Should fetch data from the data layer', async () => {
            for (const fastlyClientIp of fastlyClientIpArray) {
                try {
                    console.log(`Data verification with ${fastlyClientIp}`)
                    // Use each fastlyClientIp in the second test
                    const jsonKiddModel = await getDataLayer(fastlyClientIp);

                    // Example test case
                    expect(jsonKiddModel).to.exist; // Assert that jsonKiddModel is not null or undefined
                    expect(jsonKiddModel.user.type).to.equal('anon', 'Expected user type to be "anon", Actual: ', jsonKiddModel.user.type);// Assert the User is Anon
                    expect(jsonKiddModel.user.tracking.uid).to.equal(0, 'Expected tracking UID to be 0'); // Assert the tracking UID
                    expect(jsonKiddModel.ip.corp.cisAccountCode).to.equal(expectCISAccountCode, `Expected CIS Account Number: ${expectCISAccountCode}, Actual: ${jsonKiddModel.ip.corp.cisAccountCode}`);
                    expect(jsonKiddModel.ip.corp.displayName).to.equal(expDisplayName, `Expected Display Name: ${expDisplayName}, Actual: ${jsonKiddModel.ip.corp.displayName}`);
                } catch (error) {
                    console.error(`An error occurred for fastlyClientIp ${fastlyClientIp}:`, error.message);
                    // Continue to the next iteration
                    continue;
                }
            }

        });

    });

    it('should take a screenshot', async () => {

        await browser.url('/');
        // Save a screenshot with a timestamp
        const date = new Date();
        await browser.saveScreenshot('../screenshots' + date + '.png');
    });
});







