import type { LandingPage } from '../../../shared/landing'

// Початковий контент. Наступний етап — отримання блоків із Payload API.
export const landingPage: LandingPage = {
  blocks: [{
    blockType: 'hero',
    eyebrow: 'Твій день, у якому є місце для всього',
    title: 'Плани стають яснішими.',
    accent: 'Життя — спокійнішим.',
    description: 'Збери події, завдання й дедлайни в Dayflow. Знайди час для важливого завдяки автоплануванню — і рухайся у власному ритмі.',
    primaryLabel: 'Створити свій простір',
    secondaryLabel: 'Увійти в Dayflow',
    highlights: ['Календар і завдання разом', 'Автопланування', 'Нагадування в застосунку'],
  }],
}
