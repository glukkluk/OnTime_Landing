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

export interface LandingPage {
    title: string;
    description: string;
    blocks: HeroBlock[];
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
        value.page.blocks.length === 1 &&
        value.page.blocks.every(
            (block: unknown) =>
                isRecord(block) &&
                block.blockType === "hero" &&
                hasStrings(block, [
                    "eyebrow",
                    "title",
                    "accent",
                    "description",
                    "primaryLabel",
                    "secondaryLabel",
                ]) &&
                Array.isArray(block.highlights) &&
                block.highlights.every(
                    (item: unknown) => typeof item === "string",
                ),
        )
    );
}
