import type { AudiencesBlock } from "../../../../shared/landing";
import { escapeHtml } from "../../lib/html";
import "./audiences.css";

export function renderAudiences(block: AudiencesBlock): string {
    return `
    <section class="audiences container" id="audiences" aria-labelledby="audiences-title">
        <div class="audiences-heading">
            <div>
                <p class="eyebrow">${escapeHtml(block.eyebrow)}</p>
                <h2 id="audiences-title">${escapeHtml(block.title)}</h2>
            </div>
            <p class="audiences-intro">${escapeHtml(block.description)}</p>
        </div>
        <div class="audiences-grid">
            ${block.scenarios
                .map(
                    (scenario, index) => `
                <article class="audience-card">
                <div class="audience-card-top">
                    <span class="audience-label">${escapeHtml(scenario.audience)}</span>
                    <span class="audience-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>${escapeHtml(scenario.title)}</h3>
                <p class="audience-description">${escapeHtml(scenario.description)}</p>
                <div class="audience-preview">
                    <p class="audience-preview-label">Приклад дня</p>
                    <ul class="audience-schedule">
                    ${scenario.schedule
                        .map(
                            (item) => `
                        <li>
                            <span class="audience-time">${escapeHtml(item.time)}</span>
                            <span class="audience-activity">${escapeHtml(item.activity)}</span>
                        </li>
                    `,
                        )
                        .join("")}
                    </ul>
                </div>
                </article>
            `,
                )
                .join("")}
        </div>
    </section>
  `;
}
