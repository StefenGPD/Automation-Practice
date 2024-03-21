import { componentSelectors } from "./components"

export const homepageSelectors = {
    dummyWebsiteLabel: `//strong[contains(text(), "This is a dummy website")]`,
    
    homepageSections: (sectionName: string) => `//h3[text()="${sectionName}"]/ancestor::div[contains(@class, "entry-section")]`
}

export const homepageCollection = [
    componentSelectors.mainHeader.container,
    homepageSelectors.homepageSections("Top Trending Categories"),
    homepageSelectors.homepageSections("Top Products"),
    homepageSelectors.homepageSections("Top Collection"),
    componentSelectors.navHeader.container,
    componentSelectors.footer.copyright,
    componentSelectors.returnToTopButton,
]