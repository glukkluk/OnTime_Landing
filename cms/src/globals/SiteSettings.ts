import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Налаштування сайту',
  access: { read: () => true, update: authenticated },
  fields: [
    { name: 'siteName', type: 'text', label: 'Назва сайту', required: true },
    { name: 'tagline', type: 'text', label: 'Підпис у шапці', required: true },
    { name: 'loginLabel', type: 'text', label: 'Посилання входу', required: true },
    { name: 'startLabel', type: 'text', label: 'Кнопка реєстрації', required: true },
    { name: 'footerText', type: 'text', label: 'Текст у футері', required: true },
    { name: 'backToTopLabel', type: 'text', label: 'Посилання на початок', required: true },
  ],
}
