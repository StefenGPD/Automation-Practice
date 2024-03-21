import { expect, Locator, Page, TestInfo } from '@playwright/test';
import * as fs from "node:fs";
import * as dayjs from 'dayjs'
import { Helpers } from '../utils/helpers';
import { componentSelectors } from '../selectors/components';
import { myAccountSelectors } from '../selectors/myAccount';

export class MyAccountPage {
    readonly page: Page;
    readonly helpers: Helpers;

    constructor(page: Page) {
        this.page = page;
        this.helpers = new Helpers(page)
    }

    async fillRegisterDetails() {
        await this.page.locator(myAccountSelectors.register.inputField("First Name")).fill("Test First");
        await this.page.locator(myAccountSelectors.register.inputField("Last Name")).fill("Test Last");
        await this.page.locator(myAccountSelectors.register.inputField("E-Mail")).fill(await this.helpers.generateUniqueEmail());
        await this.page.locator(myAccountSelectors.register.inputField("Telephone")).fill("+12345678901");
        await this.page.locator(myAccountSelectors.register.inputField("Password")).fill("testpass");
        await this.page.locator(myAccountSelectors.register.inputField("Password Confirm")).fill("testpass");

        await this.page.locator(myAccountSelectors.register.agreeCheckbox).click();
    }

    async fillLoginDetails(email: string, password: string) {
        await this.page.locator(myAccountSelectors.login.inputField("E-Mail Address")).fill(email);
        await this.page.locator(myAccountSelectors.login.inputField("Password")).fill(password);
    }
}