export const myAccountSelectors = {
    register: {
        inputField: (placeholder: string) =>
            `//input[@placeholder="${placeholder}"]`,
        agreeCheckbox: `//label[@for="input-agree"]`,
        continueButton: `//input[@type="submit"]`,

        accountCreatedLabel: `//h1[contains(text(), "Your Account")]`,
    }
}