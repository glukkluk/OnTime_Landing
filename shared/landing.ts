/** Публічний контент лендінгу; не містить даних користувачів планувальника. */
export interface HeroBlock {
  blockType: 'hero'
  eyebrow: string
  title: string
  accent: string
  description: string
  primaryLabel: string
  secondaryLabel: string
  highlights: string[]
}

export interface LandingPage {
  blocks: HeroBlock[]
}
