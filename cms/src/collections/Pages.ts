import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { Hero } from '../blocks/Hero'
import { Features } from '../blocks/Features'
import { HowItWorks } from '../blocks/HowItWorks'
import { Audiences } from '../blocks/Audiences'
import { FAQ } from '../blocks/FAQ'
import { CallToAction } from '../blocks/CallToAction'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Сторінка', plural: 'Сторінки' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'Ідентифікатор',
      required: true,
      unique: true,
      defaultValue: 'home',
      admin: { description: 'Для головної сторінки використовуйте home.' },
    },
    { name: 'title', type: 'text', label: 'SEO-заголовок', required: true },
    { name: 'description', type: 'textarea', label: 'SEO-опис', required: true },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Блоки сторінки',
      blocks: [Hero, Features, HowItWorks, Audiences, FAQ, CallToAction],
      required: true,
      minRows: 1,
      maxRows: 6,
      validate: (value) => {
        if (!Array.isArray(value) || value.length < 1 || value.length > 6) {
          return 'Додайте головний екран і, за бажанням, наступні секції.'
        }
        const allowedBlockTypes = ['hero', 'features', 'how-it-works', 'audiences', 'faq', 'cta']
        const blockTypes = value.map((block) => block.blockType)

        if (blockTypes[0] !== 'hero') {
          return 'Головний екран повинен бути першим блоком.'
        }
        if (blockTypes.some((type) => !allowedBlockTypes.includes(type))) {
          return 'Сторінка містить невідомий тип блока.'
        }
        if (new Set(blockTypes).size !== blockTypes.length) {
          return 'Блоки на сторінці не повинні повторюватися.'
        }
        return true
      },
      admin: {
        description:
          'Головний екран завжди перший. Інші секції можна розміщувати в будь-якому порядку без повторень.',
      },
    },
  ],
}
