export const componentSelectors = {
    mainHeader: {
        container: `//div[@id="main-header"]`,
        searchBarInput: `//input[@type="text"]`,
        searchButton: `//button[@type="submit"]`,
        searchCategories: `//div[@class="dropdown search-category"]`,
        searchCategoryItem: (category: string) => `//div[contains(@class, "dropdown-menu")]/a[text()="${category}"]`,
    },

    navHeader: {
        container: `//div[@id="main-navigation"]`,
        shopByCategory: `//div[contains(@class, "shop-by-category")]`,
        topCategoriesContainer: `//h5[contains(text(), "Top categories")]/parent::div`,
        navDropdown: (category: string) =>
            `//nav[contains(@class, "horizontal")]/descendant::span[contains(text(), "${category}")]/ancestor::a`,
        navDropdownItem: (itemName: string) => 
            `//span[contains(text(), "${itemName}")]/ancestor::a`,
        login: `//span[contains(text(), "My account")]/ancestor::a/following-sibling::ul/descendant::span[contains(text(), "Login")]`,
        register: `//span[contains(text(), "My account")]/ancestor::a/following-sibling::ul/descendant::span[contains(text(), "Register")]`

    },

    footer: {
        copyright: `//p[contains(text(), "LambdaTest - Powered by OpenCart")]`
    },

    returnToTopButton: `//a[@id="back-to-top"]`,
}

export const searchCategoryCollection = [
    componentSelectors.mainHeader.searchCategoryItem("All Categories"),
    componentSelectors.mainHeader.searchCategoryItem("Desktops"),
    componentSelectors.mainHeader.searchCategoryItem("Laptops"),
    componentSelectors.mainHeader.searchCategoryItem("Components"),
    componentSelectors.mainHeader.searchCategoryItem("Tablets"),
    componentSelectors.mainHeader.searchCategoryItem("Software"),
    componentSelectors.mainHeader.searchCategoryItem("Phones & PDAs"),
    componentSelectors.mainHeader.searchCategoryItem("Cameras"),
    componentSelectors.mainHeader.searchCategoryItem("MP3 Players"),
]

export const navHeaderCollection = [
    componentSelectors.navHeader.navDropdown("Home"),
    componentSelectors.navHeader.navDropdown("Special"),
    componentSelectors.navHeader.navDropdown("Blog"),
    componentSelectors.navHeader.navDropdown("Mega Menu"),
    componentSelectors.navHeader.navDropdown("AddOns"),
    componentSelectors.navHeader.navDropdown("My account"),
]