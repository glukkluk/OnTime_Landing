import type { HowItWorksBlock } from "../../../../shared/landing";
import { escapeHtml } from "../../lib/html";
import "./how-it-works.css";

export function renderHowItWorks(block: HowItWorksBlock): string {
    return `
        <section class="how-it-works container" id="how-it-works" aria-labelledby="how-it-works-title">
            <div class="how-it-works-intro">
                <p class="eyebrow">${escapeHtml(block.eyebrow)}</p>
                <h2 id="how-it-works-title">${escapeHtml(block.title)}</h2>
                <p class="how-it-works-description">${escapeHtml(block.description)}</p>
            </div>
            <ol class="how-it-works-steps" role="list">
                ${block.steps
                    .map(
                        (step, index) => `
                    <li class="how-it-works-step">
                        <span class="step-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
                        <div>
                            <h3>${escapeHtml(step.title)}</h3>
                            <p>${escapeHtml(step.description)}</p>
                        </div>
                    </li>
                `,
                    )
                    .join("")}
            </ol>
        </section>
    `;
}
