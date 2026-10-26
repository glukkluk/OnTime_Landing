import type { LandingContent } from '../../../shared/landing'
import type { Page, SiteSetting } from '../payload-types'

/** Публічний контракт без службових полів Payload та ідентифікаторів БД. */
export function toLandingContent(page: Page, site: SiteSetting): LandingContent {
  return {
    page: {
      title: page.title,
      description: page.description,
      blocks: page.blocks.map((block) => ({
        blockType: block.blockType,
        eyebrow: block.eyebrow,
        title: block.title,
        accent: block.accent,
        description: block.description,
        primaryLabel: block.primaryLabel,
        secondaryLabel: block.secondaryLabel,
        highlights: block.highlights.map((item) => item.text),
      })),
    },
    site: {
      siteName: site.siteName,
      tagline: site.tagline,
      loginLabel: site.loginLabel,
      startLabel: site.startLabel,
      footerText: site.footerText,
      backToTopLabel: site.backToTopLabel,
    },
  }
}
