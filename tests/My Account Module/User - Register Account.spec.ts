import { expect, test } from "@playwright/test";
import { Helpers } from "../../utils/helpers";
import { componentSelectors } from "../../selectors/components";
import { homepageCollection } from "../../selectors/homepage";
import testCases = require('../../test_data/TC_Repository.json');
import { allure } from "allure-playwright";
import { HeaderComp } from "../../page_objects/headerComp";
import { MyAccountPage } from "../../page_objects/myAccount";
import { myAccountSelectors } from "../../selectors/myAccount";

test.describe("My Account Page Tests @MyAccount", () => {
    let helpers: Helpers;
    let headerComp: HeaderComp;
    let myAccountPage: MyAccountPage;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
        headerComp = new HeaderComp(page);
        myAccountPage = new MyAccountPage(page);
    });

    test(`[TC-007] Must be able to create an account @TC007`, async ({ page }, testInfo) => {
        await allure.description(testCases["TC-007"].DESCRIPTION);
        await allure.suite(testCases["TC-007"].MODULE);
        await allure.subSuite(testCases["TC-007"].SECTION);

        await test.step(`Given I am in Register account page`, async () => {
            await page.goto(process.env.BASE_URL);
            await headerComp.navigateToRegister();
        });

        await test.step(`When I fill the necessary input fields with details`, async () => {
            await myAccountPage.fillRegisterDetails();
        });

        await test.step(`And I click the Continue button`, async () => {
            await page.locator(myAccountSelectors.register.continueButton).click();
        });

        await test.step(`Then I should see that my account has been created successfully`, async () => {
            await helpers.assertElements([myAccountSelectors.register.accountCreatedLabel], true);
            await helpers.screenshotAndAttach(testInfo);
        });
    });

    test(`[TC-008] Register account input fields must be validated @TC008`, async ({ page }, testInfo) => {
        await allure.description(testCases["TC-008"].DESCRIPTION);
        await allure.suite(testCases["TC-008"].MODULE);
        await allure.subSuite(testCases["TC-008"].SECTION);
        
        await test.step(`Given I am in Register account page`, async () => {
            await page.goto(process.env.BASE_URL);
            await headerComp.navigateToRegister();
        });

        await test.step(`When I click the Continue button`, async () => {
            await page.locator(myAccountSelectors.register.continueButton).click();
        });

        await test.step(`But I did not fill the necessary input fields with details`, async () => {
            // Do nothing here
        });

        await test.step(`Then I should not be navigated to a success page`, async () => {
            await helpers.delay(500);
            expect(page.url()).toContain("/register");
        });

        await test.step(`And I should see that the missing fields have validation messages in them`, async () => {
            const validationMessages = await page.locator(myAccountSelectors.register.validationMessages).all();

            for (const message of validationMessages) {
                await helpers.highlight(message, true);
            }

            await helpers.screenshotAndAttach(testInfo);
        });
    });
})
