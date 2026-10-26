import type { FAQBlock } from "../../../../shared/landing";
import { escapeHtml } from "../../lib/html";
import "./faq.css";

export function renderFAQ(block: FAQBlock): string {
    return `
        <section class="faq container" id="faq" aria-labelledby="faq-title">
            <div class="faq-intro">
                <p class="eyebrow">${escapeHtml(block.eyebrow)}</p>
                <h2 id="faq-title">${escapeHtml(block.title)}</h2>
                <p class="faq-description">${escapeHtml(block.description)}</p>
            </div>
            <div class="faq-items">
                ${block.items.map((item) => `
                    <details class="faq-item" name="landing-faq">
                        <summary>
                            <span>${escapeHtml(item.question)}</span>
                            <span class="faq-toggle" aria-hidden="true"></span>
                        </summary>
                        <p class="faq-answer">${escapeHtml(item.answer)}</p>
                    </details>
                `).join("")}
            </div>
        </section>
    `;
}
