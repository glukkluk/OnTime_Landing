/** Публічний контент лендінгу; не містить даних користувачів планувальника. */
export interface HeroBlock {
    blockType: "hero";
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    highlights: string[];
}

export interface FeaturesBlock {
    blockType: "features";
    eyebrow: string;
    title: string;
    description: string;
    cards: { title: string; description: string }[];
    ctaLabel: string;
}

export type LandingBlock = HeroBlock | FeaturesBlock;

export interface LandingPage {
    title: string;
    description: string;
    blocks: LandingBlock[];
}

export interface SiteSettings {
    siteName: string;
    tagline: string;
    loginLabel: string;
    startLabel: string;
    footerText: string;
    backToTopLabel: string;
}

export interface LandingContent {
    page: LandingPage;
    site: SiteSettings;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function hasStrings(value: Record<string, unknown>, keys: string[]): boolean {
    return keys.every((key) => typeof value[key] === "string");
}

export function isLandingContent(value: unknown): value is LandingContent {
    if (!isRecord(value) || !isRecord(value.page) || !isRecord(value.site))
        return false;

    return (
        hasStrings(value.page, ["title", "description"]) &&
        hasStrings(value.site, [
            "siteName",
            "tagline",
            "loginLabel",
            "startLabel",
            "footerText",
            "backToTopLabel",
        ]) &&
        Array.isArray(value.page.blocks) &&
        value.page.blocks.length >= 1 &&
        value.page.blocks.length <= 2 &&
        value.page.blocks.every(isLandingBlock) &&
        value.page.blocks[0].blockType === "hero" &&
        (value.page.blocks.length === 1 || value.page.blocks[1].blockType === "features")
    );
}

function isLandingBlock(block: unknown): block is LandingBlock {
    if (!isRecord(block) || !hasStrings(block, ["eyebrow", "title", "description"]))
        return false;

    switch (block.blockType) {
        case "hero":
            return hasStrings(block, ["accent", "primaryLabel", "secondaryLabel"])
                && Array.isArray(block.highlights)
                && block.highlights.every((item: unknown) => typeof item === "string");
        case "features":
            return hasStrings(block, ["ctaLabel"])
                && Array.isArray(block.cards)
                && block.cards.length >= 1 && block.cards.length <= 6
                && block.cards.every((card: unknown) =>
                    isRecord(card) && hasStrings(card, ["title", "description"]));
        default:
            return false;
    }
}
