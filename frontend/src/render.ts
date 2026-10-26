import type { LandingBlock } from "../../shared/landing";
import { renderHero } from "./blocks/hero/hero";
import { renderFeatures } from "./blocks/features/features";
import { renderHowItWorks } from "./blocks/how-it-works/how-it-works";
import { appLinks } from "./config";

export function renderBlock(block: LandingBlock): string {
    switch (block.blockType) {
        case "hero":
            return renderHero(block);
        case "features":
            return renderFeatures(block, appLinks.register);
        case "how-it-works":
            return renderHowItWorks(block);
    }
}
