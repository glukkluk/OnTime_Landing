// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { isLandingContent, type CallToActionBlock } from '../../../shared/landing'
import { renderCallToAction } from '../../../frontend/src/blocks/cta/cta'

const cta: CallToActionBlock = {
  blockType: 'cta',
  eyebrow: 'ТВІЙ НАСТУПНИЙ КРОК',
  title: 'Почни планувати',
  description: 'Плани в одному місці',
  primaryLabel: 'Створити акаунт',
  secondaryLabel: 'Увійти',
}

const hero = {
  blockType: 'hero', eyebrow: 'Привіт', title: 'OnTime', accent: 'Час',
  description: 'Персональний розклад', primaryLabel: 'Реєстрація',
  secondaryLabel: 'Вхід', highlights: ['Календар'],
}

const content = {
  page: { title: 'OnTime', description: 'Лендінг', blocks: [hero, cta] },
  site: {
    siteName: 'OnTime', tagline: 'Розклад', loginLabel: 'Увійти',
    startLabel: 'Спробувати', footerText: 'OnTime', backToTopLabel: 'Нагору',
  },
}

describe('завершальний заклик до дії', () => {
  it('приймає необов’язкову CTA після Hero', () => {
    expect(isLandingContent(content)).toBe(true)
    expect(isLandingContent({
      ...content,
      page: { ...content.page, blocks: [cta, hero] },
    })).toBe(false)
    expect(isLandingContent({
      ...content,
      page: { ...content.page, blocks: [hero, cta, cta] },
    })).toBe(false)
  })

  it('екранує текст із Payload та використовує посилання на застосунок', () => {
    const html = renderCallToAction(
      { ...cta, title: '<img src=x onerror=alert(1)>', primaryLabel: 'Спробувати & почати' },
      { register: 'https://app.example/register/', login: 'https://app.example/login/' },
    )
    expect(html).not.toContain('<img')
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).toContain('Спробувати &amp; почати')
    expect(html).toContain('href="https://app.example/register/"')
    expect(html).toContain('href="https://app.example/login/"')
  })
})
