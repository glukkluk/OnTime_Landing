import type { CallToActionBlock } from "../../../../shared/landing";
import { escapeHtml } from "../../lib/html";
import "./cta.css";

export function renderCallToAction(
    block: CallToActionBlock,
    links: { register: string; login: string },
): string {
    return `
        <section class="closing-cta container" id="start" aria-labelledby="cta-title">
            <div class="closing-cta-panel">
                <span class="closing-cta-symbol" aria-hidden="true">✳</span>
                <p class="eyebrow">${escapeHtml(block.eyebrow)}</p>
                <h2 id="cta-title">${escapeHtml(block.title)}</h2>
                <p class="closing-cta-description">${escapeHtml(block.description)}</p>
                <div class="closing-cta-actions">
                    <a class="button" href="${escapeHtml(links.register)}">${escapeHtml(block.primaryLabel)} <span aria-hidden="true">↗</span></a>
                    <a class="closing-cta-login" href="${escapeHtml(links.login)}">${escapeHtml(block.secondaryLabel)} <span aria-hidden="true">→</span></a>
                </div>
            </div>
        </section>
    `;
}
