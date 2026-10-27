// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  isLandingContent,
  type AudiencesBlock,
  type HeroBlock,
  type LandingContent,
} from '../../../shared/landing'
import { renderAudiences } from '../../../frontend/src/blocks/audiences/audiences'
import { toLandingContent } from '../../src/lib/landing'
import type { Page, SiteSetting } from '../../src/payload-types'

const hero: HeroBlock = {
  blockType: 'hero',
  eyebrow: 'Вступ',
  title: 'OnTime',
  accent: 'Планування',
  description: 'Плануй',
  primaryLabel: 'Почати',
  secondaryLabel: 'Увійти',
  highlights: ['Календар'],
}
const audiences: AudiencesBlock = {
  blockType: 'audiences',
  eyebrow: 'КОЖЕН МАЄ СВІЙ РИТМ',
  title: 'Для кого OnTime',
  description: 'Справи без поспіху',
  scenarios: [
    {
      audience: 'Навчання',
      title: 'Для студентів',
      description: 'Пари та сесія',
      schedule: [
        { time: '09:00', activity: 'Заняття' },
        { time: '17:00', activity: 'Повторити & запам’ятати' },
      ],
    },
  ],
}
const content: LandingContent = {
  page: { title: 'OnTime', description: 'Лендінг', blocks: [hero, audiences] },
  site: {
    siteName: 'OnTime',
    tagline: 'Плануй',
    loginLabel: 'Увійти',
    startLabel: 'Почати',
    footerText: 'OnTime',
    backToTopLabel: 'Нагору',
  },
}

describe('блок Для кого OnTime', () => {
  it('приймає блок у довільному порядку та з повторами, але вимагає сценарії', () => {
    expect(isLandingContent(content)).toBe(true)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [audiences, hero] },
      }),
    ).toBe(true)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [hero, audiences, audiences] },
      }),
    ).toBe(true)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [hero, { ...audiences, scenarios: [] }] },
      }),
    ).toBe(false)
  })

  it('підтримує всі типи блоків та сторінки довші за шість блоків', () => {
    const features = {
      blockType: 'features',
      eyebrow: 'Можливості',
      title: 'Можливості',
      description: 'Опис',
      ctaLabel: 'Почати',
      cards: [{ title: 'Календар', description: 'Події' }],
    }
    const howItWorks = {
      blockType: 'how-it-works',
      eyebrow: 'Кроки',
      title: 'Початок',
      description: 'Опис',
      steps: [{ title: 'Крок', description: 'Коротко' }],
    }
    const faq = {
      blockType: 'faq',
      eyebrow: 'FAQ',
      title: 'Запитання',
      description: 'Опис',
      items: [{ question: 'Що це?', answer: 'OnTime' }],
    }
    const cta = {
      blockType: 'cta',
      eyebrow: 'Старт',
      title: 'Приєднайся',
      description: 'Опис',
      primaryLabel: 'Почати',
      secondaryLabel: 'Увійти',
    }
    const blocks = [hero, features, howItWorks, audiences, faq, cta]
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks },
      }),
    ).toBe(true)
    expect(
      isLandingContent({
        ...content,
        page: { ...content.page, blocks: [...blocks, cta] },
      }),
    ).toBe(true)
  })

  it('перевіряє кількість сценаріїв та пунктів прикладу дня', () => {
    const invalid = [
      { ...audiences, scenarios: Array.from({ length: 4 }, () => audiences.scenarios[0]) },
      { ...audiences, scenarios: [{ ...audiences.scenarios[0], schedule: [] }] },
      {
        ...audiences,
        scenarios: [
          { ...audiences.scenarios[0], schedule: [{ time: '09:00', activity: 'Заняття' }] },
        ],
      },
      {
        ...audiences,
        scenarios: [
          {
            ...audiences.scenarios[0],
            schedule: Array.from({ length: 5 }, () => audiences.scenarios[0].schedule[0]),
          },
        ],
      },
      {
        ...audiences,
        scenarios: [
          {
            ...audiences.scenarios[0],
            schedule: [{ time: '  ', activity: 'Заняття' }, audiences.scenarios[0].schedule[1]],
          },
        ],
      },
    ]
    for (const bad of invalid) {
      expect(
        isLandingContent({
          ...content,
          page: { ...content.page, blocks: [hero, bad] },
        }),
      ).toBe(false)
    }
  })

  it('екранує текст із CMS і показує розклад у семантичному списку', () => {
    const html = renderAudiences({
      ...audiences,
      scenarios: [
        {
          ...audiences.scenarios[0],
          title: '<img src=x onerror=alert(1)>',
        },
      ],
    })
    expect(html).toContain('id="audiences"')
    expect(html).toContain('<article class="audience-card">')
    expect(html).toContain('<ul class="audience-schedule">')
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).toContain('Повторити &amp; запам’ятати')
    expect(html).not.toContain('<img')
  })

  it('прибирає службові Payload id, зокрема зі вкладеного розкладу', () => {
    const page = {
      id: 1,
      slug: 'home',
      title: 'OnTime',
      description: 'Лендінг',
      createdAt: '2026-10-26T00:00:00Z',
      updatedAt: '2026-10-26T00:00:00Z',
      blocks: [
        { ...hero, id: 'hero-id', highlights: [{ text: 'Календар', id: 'highlight-id' }] },
        {
          ...audiences,
          id: 'audiences-id',
          scenarios: audiences.scenarios.map((scenario) => ({
            ...scenario,
            id: 'scenario-id',
            schedule: scenario.schedule.map((item) => ({ ...item, id: 'schedule-id' })),
          })),
        },
      ],
    } as unknown as Page
    const site = { id: 1, ...content.site } as SiteSetting
    const actual = toLandingContent(page, site)
    expect(actual.page.blocks[1]).toEqual(audiences)
    expect(JSON.stringify(actual)).not.toContain('scenario-id')
    expect(JSON.stringify(actual)).not.toContain('schedule-id')
    expect(isLandingContent(actual)).toBe(true)
  })
})
