// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { isLandingContent, type FAQBlock, type HeroBlock, type LandingContent } from '../../../shared/landing'
import { renderFAQ } from '../../../frontend/src/blocks/faq/faq'
import { toLandingContent } from '../../src/lib/landing'
import type { Page, SiteSetting } from '../../src/payload-types'

const hero: HeroBlock = {
  blockType: 'hero', eyebrow: 'Вступ', title: 'Планування', accent: 'Для тебе',
  description: 'Організуй справи', primaryLabel: 'Почати', secondaryLabel: 'Увійти',
  highlights: ['Завдання'],
}
const faq: FAQBlock = {
  blockType: 'faq', eyebrow: 'FAQ', title: 'Запитання', description: 'Відповіді',
  items: [
    { question: 'Що таке подія?', answer: 'Час у календарі.' },
    { question: '<img src=x onerror=alert(1)>', answer: 'Плани & справи\nДругий рядок' },
  ],
}
const content: LandingContent = {
  page: { title: 'OnTime', description: 'Планувальник', blocks: [hero, faq] },
  site: {
    siteName: 'OnTime', tagline: 'Твій день', loginLabel: 'Увійти', startLabel: 'Почати',
    footerText: 'Плануй', backToTopLabel: 'Нагору',
  },
}

describe('FAQ лендінгу', () => {
  it('приймає FAQ у довільному порядку, з повторами та без обмеження кількості питань', () => {
    expect(isLandingContent(content)).toBe(true)
    expect(isLandingContent({ ...content, page: { ...content.page, blocks: [faq, hero] } })).toBe(true)
    expect(isLandingContent({ ...content, page: { ...content.page, blocks: [hero, faq, faq] } })).toBe(true)
    expect(isLandingContent({
      ...content,
      page: { ...content.page, blocks: [{ ...faq, items: Array.from({ length: 11 }, () => faq.items[0]) }] },
    })).toBe(true)
  })

  it('відхиляє порожні та неповні списки запитань', () => {
    const invalidItems: unknown[] = [
      [],
      [{ question: ' ', answer: 'Відповідь' }],
      [{ question: 'Запитання', answer: '  ' }],
      [{ question: 'Запитання' }],
    ]
    for (const items of invalidItems) {
      expect(isLandingContent({
        ...content,
        page: { ...content.page, blocks: [hero, { ...faq, items }] },
      })).toBe(false)
    }
  })

  it('екранує HTML і дозволяє розгортати питання нативним details/summary', () => {
    const html = renderFAQ(faq)
    expect(html).toContain('id="faq"')
    expect((html.match(/<details\b/g) || []).length).toBe(faq.items.length)
    expect(html).toContain('<summary>')
    expect(html).toContain('name="landing-faq"')
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).toContain('Плани &amp; справи\nДругий рядок')
    expect(html).not.toContain('<img')
  })

  it('прибирає службові id Payload із FAQ та його елементів', () => {
    const page = {
      id: 1, slug: 'home', title: 'OnTime', description: 'Планувальник',
      updatedAt: '2026-10-26T00:00:00Z', createdAt: '2026-10-26T00:00:00Z',
      blocks: [
        { ...hero, id: 'hero-block-id', highlights: [{ id: 'one', text: 'Завдання' }] },
        { ...faq, id: 'faq-block-id', items: faq.items.map((item, i) => ({ ...item, id: `q-${i}` })) },
      ],
    } as unknown as Page
    const site = { id: 1, ...content.site } as SiteSetting
    const result = toLandingContent(page, site)
    expect(result.page.blocks[1]).toEqual(faq)
    expect(JSON.stringify(result)).not.toContain('faq-block-id')
    expect(JSON.stringify(result)).not.toContain('q-0')
    expect(isLandingContent(result)).toBe(true)
  })
})
