import { test } from "@playwright/test";
import { Helpers } from "../../utils/helpers";
import { componentSelectors, navHeaderCollection, searchCategoryCollection } from "../../selectors/components";
import { homepageCollection } from "../../selectors/homepage";
import testCases = require('../../test_data/TC_Repository.json');
import { allure } from "allure-playwright";

test.describe("Navigation Tests @Header", () => {
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
    });

    test(`[TC-005] Header should contain a navigation section @TC005`, async ({ page }, testInfo) => {
        await allure.description(testCases["TC-005"].DESCRIPTION);
        await allure.suite(testCases["TC-005"].MODULE);
        await allure.subSuite(testCases["TC-005"].SECTION);
        
        await test.step(`Given I am in any page of the website`, async () => {
            await page.goto(process.env.BASE_URL);
        });

        await test.step(`Then I should be able to see the navigation section, #navigation`, async () => {
            await helpers.assertElements(navHeaderCollection, true);
            await helpers.screenshotAndAttach(testInfo);
        }); 
    });
    
    test(`[TC-006] Clicking Shop by Category should show categories @TC006`, async ({ page }, testInfo) => {
        await allure.description(testCases["TC-006"].DESCRIPTION);
        await allure.suite(testCases["TC-006"].MODULE);
        await allure.subSuite(testCases["TC-006"].SECTION);
        
        await test.step(`Given I am in any page of the website`, async () => {
            await page.goto(process.env.BASE_URL);
        });

        await test.step(`When I click the Shop by Category element in the header`, async () => {
            await page.locator(componentSelectors.navHeader.shopByCategory).first().click()
        });

        await test.step(`Then a list of categories should pop up from the left of the screen`, async () => {
            await helpers.assertElements([componentSelectors.navHeader.topCategoriesContainer], true);
            await helpers.screenshotAndAttach(testInfo);
        });
    });
})