import type { Block } from 'payload'

export const Audiences: Block = {
  slug: 'audiences',
  labels: { singular: 'Для кого OnTime', plural: 'Для кого OnTime' },
  fields: [
    {
      name: 'eyebrow', type: 'text', label: 'Текст над заголовком', required: true,
      defaultValue: 'ДЛЯ КОЖНОГО РИТМУ',
    },
    {
      name: 'title', type: 'text', label: 'Заголовок секції', required: true,
      defaultValue: 'Твої плани. Твій спосіб жити.',
    },
    {
      name: 'description', type: 'textarea', label: 'Короткий вступ', required: true,
      defaultValue: 'В OnTime знайдеться місце і для великих цілей, і для маленьких щоденних справ.',
    },
    {
      name: 'scenarios', type: 'array', label: 'Приклади використання', required: true,
      minRows: 1, maxRows: 3,
      defaultValue: [
        {
          audience: 'Навчання',
          title: 'Навчайся без авралів',
          description: 'Заняття, підготовка до іспитів та дедлайни — в одному розкладі.',
          schedule: [
            { time: '09:00', activity: 'Заняття в університеті' },
            { time: '16:30', activity: 'Підготовка до заліку' },
            { time: '19:00', activity: 'Час для себе' },
          ],
        },
        {
          audience: 'Робота',
          title: 'Бач головне серед справ',
          description: 'Зустрічі в календарі, пріоритетні завдання й вільні вікна для зосередженої роботи.',
          schedule: [
            { time: '10:00', activity: 'Командна зустріч' },
            { time: '12:30', activity: 'Робота над проєктом' },
            { time: '16:00', activity: 'Підсумки дня' },
          ],
        },
        {
          audience: 'Особисте',
          title: 'Залишай час на життя',
          description: 'Особисті справи, регулярні події та відпочинок поруч із робочими планами.',
          schedule: [
            { time: '08:00', activity: 'Ранкова прогулянка' },
            { time: '17:00', activity: 'Покупки та справи' },
            { time: '20:00', activity: 'Вечір без поспіху' },
          ],
        },
      ],
      fields: [
        { name: 'audience', type: 'text', label: 'Категорія (наприклад, Навчання)', required: true },
        { name: 'title', type: 'text', label: 'Заголовок картки', required: true },
        { name: 'description', type: 'textarea', label: 'Опис', required: true },
        {
          name: 'schedule', type: 'array', label: 'Ілюстративний розклад', required: true,
          minRows: 2, maxRows: 4,
          admin: { description: 'Демонстраційні пункти, а не справжні події користувачів.' },
          fields: [
            { name: 'time', type: 'text', label: 'Час (наприклад, 09:00)', required: true },
            { name: 'activity', type: 'text', label: 'Подія або завдання', required: true },
          ],
        },
      ],
    },
  ],
}
