import { isLandingContent, type LandingContent } from "../../shared/landing";

export async function getLandingContent(): Promise<LandingContent> {
    const baseUrl = import.meta.env.VITE_CMS_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/landing`, {
        signal: AbortSignal.timeout(15000),
        credentials: "omit",
        cache: "no-store",
    });

    if (!response.ok) throw new Error(`CMS: HTTP ${response.status}`);

    const content: unknown = await response.json();
    if (!isLandingContent(content))
        throw new Error("CMS: невідповідний формат контенту");

    return content;
}
