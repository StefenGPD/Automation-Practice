import { test } from "@playwright/test";
import { Helpers } from "../../utils/helpers";
import { componentSelectors, searchCategoryCollection } from "../../selectors/components";
import { homepageCollection } from "../../selectors/homepage";
import testCases = require('../../test_data/TC_Repository.json');
import { allure } from "allure-playwright";

test.describe("Search Bar Tests @Header", () => {
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        helpers = new Helpers(page);
    });

    test("[TC-003] Can use search bar to look for products @TC003", async ({ page }, testInfo) => {
        await allure.description(testCases["TC-003"].DESCRIPTION);
        await allure.suite(testCases["TC-003"].MODULE);
        await allure.subSuite(testCases["TC-003"].SECTION);
        

        await test.step(`Given I am in any page of the website`, async () => {
            await page.goto(process.env.BASE_URL);
        });

        await test.step(`When I type a keyword or keywords in the search bar`, async () => {
            await page.locator(componentSelectors.mainHeader.searchBarInput).first().fill("Apple");
        });

        await test.step(`And click the Search button`, async () => {
            await page.locator(componentSelectors.mainHeader.searchButton).first().click();
        });

        await test.step(`Then I should be navigated to the search result page`, async () => {
            await page.waitForURL(/product/);
            await helpers.screenshotAndAttach(testInfo);
        });
    });

    test(`[TC-004] Can filter search by categories @TC004`, async ({ page }, testInfo) => {
        await allure.description(testCases["TC-004"].DESCRIPTION);
        await allure.suite(testCases["TC-004"].MODULE);
        await allure.subSuite(testCases["TC-004"].SECTION);
        
        await test.step(`Given I am in any page of the website`, async () => {
            await page.goto(process.env.BASE_URL);
        });

        await test.step(`When I click on the All Categories dropdown in the search bar`, async () => {
            await page.locator(componentSelectors.mainHeader.searchCategories).first().click();
        });

        await test.step(`Then I should be able to see the categories to filter my search with, #categories`, async () => {
            await helpers.assertElements(searchCategoryCollection, true);
            await helpers.screenshotAndAttach(testInfo);
        });
    });
})