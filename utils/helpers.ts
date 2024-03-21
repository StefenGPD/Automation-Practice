import { expect, Locator, Page, TestInfo } from '@playwright/test';
import dayjs = require('dayjs');
import fs = require('fs');

export class Helpers {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async assertElements(selectorList: string[], highlightElement = false) {
        for (let i = 0; i < selectorList.length; i++) {
            try {
                await this.page.locator(selectorList[i]).first().waitFor();
            } catch (e) {
                console.log(`Error: The element ${this.page.locator(selectorList[i])} was not found.`);
            }
            await this.highlight(this.page.locator(selectorList[i]).first(), highlightElement || false);
            await expect(
                this.page.locator(selectorList[i]).first(),
            ).toBeVisible();
            await this.page.locator(selectorList[i]).first().scrollIntoViewIfNeeded();
        }
    }

    delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    async highlight(locator: Locator, flag: boolean) {
        try {
            if (flag == true) {
                const additionalStyles = 'outline: orange solid 2px !important; outline-offset: -1px !important;';

                await locator.evaluate((element, additionalStyles) => {
                    // Get the existing styles
                    const existingStyles = element.getAttribute('style') || '';

                    // Combine existing styles with additional styles
                    const combinedStyles = existingStyles + additionalStyles;

                    // Set the combined styles back to the element
                    element.setAttribute('style', combinedStyles);
                }, additionalStyles);
            }
        } catch (e) {
            console.log(`Error: The element to highlight "${locator}" was not found.`);
            throw e;
        }
    }

    async screenshotAndAttach(testInfo: TestInfo) {
        const testTitle = await testInfo.title.trim();
        let counter = 1;
        let filename = `./test-results/screenshots/${testTitle}_${counter}.png`;

        // Check if the file already exists
        while (fs.existsSync(filename)) {
            // If the file exists, increment the counter and modify the filename
            counter++;
            filename = `./test-results/screenshots/${testTitle}_${counter}.png`;
        }

        // Screenshot after the step
        const img = await this.page.screenshot({ path: filename, type: "png" });
        // Attach screenshot to test scenario
        await testInfo.attach(`${testTitle}_${counter}`, { body: img, contentType: 'image/png' });
    }

    async generateUniqueEmail() {
        // Generate unique email
        const currentDatetime = dayjs().format('YYYYMMDDHHmmss');
        const uniqueEmail = `testCreate_${currentDatetime}@mailinator.com`
        return uniqueEmail;
    }
}
