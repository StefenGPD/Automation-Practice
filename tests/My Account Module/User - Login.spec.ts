import { expect, test } from "@playwright/test";
import { Helpers } from "../../utils/helpers";
import { componentSelectors } from "../../selectors/components";
import { homepageCollection } from "../../selectors/homepage";
import testCases = require('../../test_data/TC_Repository.json');
import { allure } from "allure-playwright";
import { HeaderComp } from "../../page_objects/headerComp";
import { MyAccountPage } from "../../page_objects/myAccount";
import { myAccountSelectors } from "../../selectors/myAccount";
import { examples } from "../../test_data/examples";

test.describe("My Account Page Tests @MyAccount", () => {
    let helpers: Helpers;
    let headerComp: HeaderComp;
    let myAccountPage: MyAccountPage;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
        headerComp = new HeaderComp(page);
        myAccountPage = new MyAccountPage(page);
    });

    test(`[TC-009] Must be able to log in to a registered account @TC009`, async ({ page }, testInfo) => {
        await allure.description(testCases["TC-009"].DESCRIPTION);
        await allure.suite(testCases["TC-009"].MODULE);
        await allure.subSuite(testCases["TC-009"].SECTION);
        
        await test.step(`Given I am in Login page`, async () => {
            await page.goto(process.env.BASE_URL);
            await headerComp.navigateToLogin();
        });

        await test.step(`When I fill the input fields with the correct <email> and <password>`, async () => {
            await myAccountPage.fillLoginDetails(process.env.EMAIL, process.env.PASSWORD);
        });

        await test.step(`And I click the Login button`, async () => {
            await page.locator(myAccountSelectors.login.loginButton).click()
        });

        await test.step(`Then I should be logged in and navigated to My Account Page`, async () => {
            await page.waitForURL(/account/);
            await helpers.screenshotAndAttach(testInfo);
        });
    });

    let TC010_TestData = examples.TC010;
    let count = 1;
    for (const testData of TC010_TestData) {
        test(`[TC-010] Must not be logged in with incorrect credentials - Run ${count} @TC010`, async ({ page }, testInfo) => {
            await allure.description(testCases["TC-010"].DESCRIPTION);
            await allure.suite(testCases["TC-010"].MODULE);
            await allure.subSuite(testCases["TC-010"].SECTION);
            
            await test.step(`Given I am in Login page`, async () => {
                await page.goto(process.env.BASE_URL);
                await headerComp.navigateToLogin();
            });
    
            await test.step(`When I fill the input fields with invalid <email> and <password>`, async () => {
                await myAccountPage.fillLoginDetails(testData.email, testData.password);
            });
    
            await test.step(`And I click the Login button`, async () => {
                await page.locator(myAccountSelectors.login.loginButton).click()
            });
    
            await test.step(`Then I should not be logged in and see an error message`, async () => {
                await helpers.delay(500);
                expect(page.url()).toContain("/login");
                await helpers.assertElements([myAccountSelectors.login.loginError], true)
                await helpers.screenshotAndAttach(testInfo);
            });
        });
        count++;
    }
})
