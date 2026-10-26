// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { toLandingContent } from '../../src/lib/landing'
import { isLandingContent } from '../../../shared/landing'
import type { Page, SiteSetting } from '../../src/payload-types'

const page: Page = {
  id: 1,
  slug: 'home',
  title: 'Dayflow',
  description: 'Планувальник',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  blocks: [{
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
  }],
}

const site: SiteSetting = {
  id: 1,
  siteName: 'Dayflow',
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
    expect(content.page.blocks[0].highlights).toEqual(['Календар'])
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
    content.page.blocks[0].highlights = [42 as unknown as string]
    expect(isLandingContent(content)).toBe(false)
    expect(isLandingContent({
      ...content,
      page: { ...content.page, blocks: [{ ...page.blocks[0], blockType: 'unknown' }] },
    })).toBe(false)
  })
})
