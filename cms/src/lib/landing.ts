import type {
  AudiencesBlock,
  CallToActionBlock,
  LandingBlock,
  LandingContent,
} from '../../../shared/landing'
import type { Page, SiteSetting } from '../payload-types'

export function toLandingContent(page: Page, site: SiteSetting): LandingContent {
  const blocks: Array<Page['blocks'][number] | CallToActionBlock | AudiencesBlock> = page.blocks

  return {
    page: {
      title: page.title,
      description: page['seo-title'],
      blocks: blocks.map((block): LandingBlock => {
        if (block.blockType === 'cta') {
          return {
            blockType: block.blockType,
            eyebrow: block.eyebrow,
            title: block.title,
            description: block.description,
            primaryLabel: block.primaryLabel,
            secondaryLabel: block.secondaryLabel,
          }
        }
        if (block.blockType === 'audiences') {
          return {
            blockType: block.blockType,
            eyebrow: block.eyebrow,
            title: block.title,
            description: block.description,
            scenarios: block.scenarios.map((scenario) => ({
              audience: scenario.audience,
              title: scenario.title,
              description: scenario.description,
              schedule: scenario.schedule.map(({ time, activity }) => ({ time, activity })),
            })),
          }
        }
        if (block.blockType === 'faq') {
          return {
            blockType: block.blockType,
            eyebrow: block.eyebrow,
            title: block.title,
            description: block.description,
            items: block.items.map(({ question, answer }) => ({ question, answer })),
          }
        }
        if (block.blockType === 'how-it-works') {
          return {
            blockType: block.blockType,
            eyebrow: block.eyebrow,
            title: block.title,
            description: block.description,
            steps: block.steps.map(({ title, description }) => ({ title, description })),
          }
        }
        if (block.blockType === 'features') {
          return {
            blockType: block.blockType,
            eyebrow: block.eyebrow,
            title: block.title,
            description: block.description,
            cards: block.cards.map(({ title, description }) => ({ title, description })),
            ctaLabel: block.ctaLabel,
          }
        }
        return {
          blockType: block.blockType,
          eyebrow: block.eyebrow,
          title: block.title,
          accent: block.accent,
          description: block.description,
          primaryLabel: block.primaryLabel,
          secondaryLabel: block.secondaryLabel,
          highlights: block.highlights.map((item) => item.text),
        }
      }),
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
