// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { toLandingContent } from '../../src/lib/landing'
import { isLandingContent } from '../../../shared/landing'
import type { Page, SiteSetting } from '../../src/payload-types'
import type { FeaturesBlock } from '../../../shared/landing'
import { renderFeatures } from '../../../frontend/src/blocks/features/features'

const page: Page = {
  id: 1,
  slug: 'home',
  title: 'OnTime',
  description: 'Планувальник',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  blocks: [
    {
      id: 'hero-id',
      blockType: 'hero',
      blockName: 'Редакторська назва',
      eyebrow: 'Твій день',
      title: 'Плануй',
      accent: 'Спокійно',
      description: '<script>alert(1)</script>',
      primaryLabel: 'Почати',
      secondaryLabel: 'Увійти',
      highlights: [{ id: 'item-id', text: 'Календар' }],
    },
  ],
}

const site: SiteSetting = {
  id: 1,
  siteName: 'OnTime',
  tagline: 'Твій ритм',
  loginLabel: 'Увійти',
  startLabel: 'Почати',
  footerText: 'Простір для планів',
  backToTopLabel: 'Нагору',
}

describe('Публічний контракт лендінгу', () => {
  it('перетворює масиви Payload і прибирає службові поля', () => {
    const content = toLandingContent(page, site)
    expect(isLandingContent(content)).toBe(true)
    expect(content.page.blocks[0]).toMatchObject({ highlights: ['Календар'] })
    expect(content.page.blocks[0].description).toBe(page.blocks[0].description)
    expect(content.page).not.toHaveProperty('id')
    expect(content.page.blocks[0]).not.toHaveProperty('blockName')
    expect(content.site).not.toHaveProperty('id')
  })

  it('відхиляє незаповнений контент та невідомі блоки', () => {
    const content = toLandingContent(page, site)
    expect(isLandingContent(null)).toBe(false)
    expect(isLandingContent({ ...content, site: {} })).toBe(false)
    expect(isLandingContent({ ...content, page: { ...content.page, blocks: [] } })).toBe(false)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [{ ...content.page.blocks[0], highlights: [42] }] },
      }),
    ).toBe(false)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [{ ...page.blocks[0], blockType: 'unknown' }] },
      }),
    ).toBe(false)
  })

  const features: FeaturesBlock = {
    blockType: 'features',
    eyebrow: 'Можливості',
    title: 'Твій день',
    description: 'Знайди час',
    ctaLabel: 'Спробувати OnTime',
    cards: [{ title: '<img src=x onerror=alert(1)>', description: 'Календар & завдання' }],
  }

  it('передає картки CMS без службових полів та зберігає порядок блоків', () => {
    const content = toLandingContent(
      {
        ...page,
        blocks: [
          ...page.blocks,
          { ...features, id: 'features-id', cards: [{ ...features.cards[0], id: 'card-id' }] },
        ],
      },
      site,
    )
    expect(content.page.blocks.map((block) => block.blockType)).toEqual(['hero', 'features'])
    expect(content.page.blocks[1]).toEqual(features)
    expect(isLandingContent(content)).toBe(true)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [...content.page.blocks].reverse() },
      }),
    ).toBe(false)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [content.page.blocks[0], content.page.blocks[0]] },
      }),
    ).toBe(false)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [content.page.blocks[0], { ...features, cards: [] }] },
      }),
    ).toBe(false)
  })

  it('екранує текст карток і не створює HTML із контенту CMS', () => {
    const html = renderFeatures(features, 'https://app.example/register/')
    expect(html).not.toContain('<img')
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).toContain('Календар &amp; завдання')
    expect(html).toContain('/register/')
  })
})
