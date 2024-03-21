import { expect, Locator, Page, TestInfo } from '@playwright/test';
import * as fs from "node:fs";
import * as dayjs from 'dayjs'
import { Helpers } from '../utils/helpers';
import { componentSelectors } from '../selectors/components';

export class HeaderComp {
    readonly page: Page;
    readonly helpers: Helpers;

    constructor(page: Page) {
        this.page = page;
        this.helpers = new Helpers(page)
    }

    async navigateToRegister() {
        await this.page.locator(componentSelectors.navHeader.navDropdown("My account")).hover();
        await this.page.locator(componentSelectors.navHeader.navDropdownItem("Register")).click();
        await this.page.waitForURL(/register/);
    }
}