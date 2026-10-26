import type { FeaturesBlock } from "../../../../shared/landing";
import { escapeHtml } from "../../lib/html";
import "./features.css";

export function renderFeatures(
    block: FeaturesBlock,
    registerUrl: string,
): string {
    return `
        <section class="features container" id="features" aria-labelledby="features-title">
            <div class="features-heading">
                <div>
                    <p class="eyebrow">${escapeHtml(block.eyebrow)}</p>
                    <h2 id="features-title">${escapeHtml(block.title)}</h2>
                </div>
                <p class="features-description">${escapeHtml(block.description)}</p>
            </div>
            <div class="features-grid">
                ${block.cards
                    .map(
                        (card, index) => `
                    <article class="feature-card">
                        <span class="feature-number" aria-hidden="true">${String(index + 1).padStart(2, "0")} <span>↗</span></span>
                        <h3>${escapeHtml(card.title)}</h3>
                        <p>${escapeHtml(card.description)}</p>
                    </article>
                `,
                    )
                    .join("")}
            </div>
            <div class="features-action">
                <a class="button" href="${escapeHtml(registerUrl)}">${escapeHtml(block.ctaLabel)} <span aria-hidden="true">↗</span></a>
            </div>
        </section>
    `;
}
