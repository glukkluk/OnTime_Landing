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

export interface HowItWorksBlock {
    blockType: "how-it-works";
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; description: string }[];
}

export interface AudiencesBlock {
    blockType: "audiences";
    eyebrow: string;
    title: string;
    description: string;
    scenarios: {
        audience: string;
        title: string;
        description: string;
        schedule: { time: string; activity: string }[];
    }[];
}

export interface FAQBlock {
    blockType: "faq";
    eyebrow: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
}

export interface CallToActionBlock {
    blockType: "cta";
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
}

export type LandingBlock =
    | HeroBlock
    | FeaturesBlock
    | HowItWorksBlock
    | AudiencesBlock
    | FAQBlock
    | CallToActionBlock;

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
        value.page.blocks.length <= 6 &&
        value.page.blocks.every(isLandingBlock) &&
        value.page.blocks[0].blockType === "hero" &&
        new Set(value.page.blocks.map((block) => block.blockType)).size ===
            value.page.blocks.length
    );
}

function isLandingBlock(block: unknown): block is LandingBlock {
    if (
        !isRecord(block) ||
        !hasStrings(block, ["eyebrow", "title", "description"])
    )
        return false;

    switch (block.blockType) {
        case "hero":
            return (
                hasStrings(block, [
                    "accent",
                    "primaryLabel",
                    "secondaryLabel",
                ]) &&
                Array.isArray(block.highlights) &&
                block.highlights.every(
                    (item: unknown) => typeof item === "string",
                )
            );
        case "features":
            return (
                hasStrings(block, ["ctaLabel"]) &&
                Array.isArray(block.cards) &&
                block.cards.length >= 1 &&
                block.cards.length <= 6 &&
                block.cards.every(
                    (card: unknown) =>
                        isRecord(card) &&
                        hasStrings(card, ["title", "description"]),
                )
            );
        case "how-it-works":
            return (
                Array.isArray(block.steps) &&
                block.steps.length >= 1 &&
                block.steps.length <= 5 &&
                block.steps.every(
                    (step: unknown) =>
                        isRecord(step) &&
                        hasStrings(step, ["title", "description"]),
                )
            );
        case "audiences":
            return (
                Array.isArray(block.scenarios) &&
                block.scenarios.length >= 1 &&
                block.scenarios.length <= 3 &&
                block.scenarios.every(
                    (scenario: unknown) =>
                        isRecord(scenario) &&
                        hasStrings(scenario, [
                            "audience",
                            "title",
                            "description",
                        ]) &&
                        Array.isArray(scenario.schedule) &&
                        scenario.schedule.length >= 2 &&
                        scenario.schedule.length <= 4 &&
                        scenario.schedule.every(
                            (item: unknown) =>
                                isRecord(item) &&
                                typeof item.time === "string" &&
                                item.time.trim().length > 0 &&
                                typeof item.activity === "string" &&
                                item.activity.trim().length > 0,
                        ),
                )
            );
        case "faq":
            return (
                Array.isArray(block.items) &&
                block.items.length >= 1 &&
                block.items.length <= 10 &&
                block.items.every(
                    (item: unknown) =>
                        isRecord(item) &&
                        typeof item.question === "string" &&
                        item.question.trim().length > 0 &&
                        typeof item.answer === "string" &&
                        item.answer.trim().length > 0,
                )
            );
        case "cta":
            return hasStrings(block, ["primaryLabel", "secondaryLabel"]);
        default:
            return false;
    }
}
