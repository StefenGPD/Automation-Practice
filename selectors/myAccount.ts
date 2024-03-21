export const myAccountSelectors = {
    register: {
        inputField: (placeholder: string) =>
            `//input[@placeholder="${placeholder}"]`,
        agreeCheckbox: `//label[@for="input-agree"]`,
        continueButton: `//input[@type="submit"]`,

        accountCreatedLabel: `//h1[contains(text(), "Your Account")]`,

        validationMessages: `//div[@class="text-danger"]`, // Returns multiple
    },

    login: {
        inputField: (placeholder: string) =>
            `//input[@placeholder="${placeholder}"]`,
        loginButton: `//input[@type="submit"][@value="Login"]`,

        loginError: `//div[contains(@class, "alert-danger")]`, 
    }
}