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
    { name: 'title', type: 'text', label: 'Назва сторінки / SEO-заголовок', required: true },
    {
      name: 'slug',
      type: 'text',
      label: 'Ідентифікатор',
      required: true,
      unique: true,
      defaultValue: 'home',
    },
    { name: 'description', type: 'textarea', label: 'SEO-опис', required: true },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Блоки сторінки',
      blocks: [Hero, Features, Audiences, HowItWorks, FAQ, CallToAction],
      required: true,
      minRows: 1,
      validate: (value) => {
        if (!Array.isArray(value) || value.length < 1) {
          return 'Додайте хоча б один блок.'
        }
        const allowedBlockTypes = ['hero', 'features', 'how-it-works', 'audiences', 'faq', 'cta']
        const blockTypes = value.map((block) => block.blockType)

        if (blockTypes.some((type) => !allowedBlockTypes.includes(type))) {
          return 'Сторінка містить невідомий тип блока.'
        }
        return true
      },
    },
  ],
}
