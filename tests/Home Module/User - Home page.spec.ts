import { test } from "@playwright/test";
import { Helpers } from "../../utils/helpers";
import { componentSelectors } from "../../selectors/components";
import { homepageCollection } from "../../selectors/homepage";
import testCases = require('../../test_data/TC_Repository.json');
import { allure } from "allure-playwright";

test.describe("Home Page Tests @Home", () => {
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
    });

    test("[TC-001] Verify home page elements @TC001", async ({ page }, testInfo) => {
        await allure.description(testCases["TC-001"].DESCRIPTION);
        await allure.suite(testCases["TC-001"].MODULE);
        await allure.subSuite(testCases["TC-001"].SECTION);
        
        await test.step(`Given I am in the Home page`, async () => {
            await page.goto(process.env.BASE_URL);
        });

        await test.step(`Then I should see the elements loaded in the page, #elements`, async () => {
            for (const element of homepageCollection) {
                await helpers.assertElements([element], true);
                await helpers.screenshotAndAttach(testInfo);
            }
        });
    });

})
