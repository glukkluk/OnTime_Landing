import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { Hero } from '../blocks/Hero'
import { Features } from '../blocks/Features'
import { HowItWorks } from '../blocks/HowItWorks'
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
      blocks: [Hero, Features, HowItWorks, FAQ, CallToAction],
      required: true,
      minRows: 1,
      maxRows: 5,
      validate: (value) => {
        if (!Array.isArray(value) || value.length < 1 || value.length > 5) {
          return 'Додайте головний екран і, за бажанням, наступні секції.'
        }
        const order = ['hero', 'features', 'how-it-works', 'faq', 'cta']
        const positions = value.map((block) => order.indexOf(block.blockType))
        return (
          (positions[0] === 0 &&
            positions.every((position, index) => index === 0 || position > positions[index - 1])) ||
          'Порядок: головний екран → можливості → як це працює → FAQ → заклик до дії. Блоки не повинні повторюватися.'
        )
      },
      admin: {
        description: 'Головний екран, потім необов’язкові секції «Можливості», «Як це працює», FAQ та «Заклик до дії».',
      },
    },
  ],
}
