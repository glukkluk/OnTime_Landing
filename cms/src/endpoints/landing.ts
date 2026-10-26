import type { Endpoint } from 'payload'
import { toLandingContent } from '../lib/landing'

export const landingEndpoint: Endpoint = {
  path: '/landing',
  method: 'get',
  handler: async (req) => {
    const [pages, site] = await Promise.all([
      req.payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
        limit: 1,
        depth: 0,
        overrideAccess: false,
        req,
      }),
      req.payload.findGlobal({ slug: 'site-settings', depth: 0, overrideAccess: false, req }),
    ])
    const page = pages.docs[0]
    const headers = { 'Cache-Control': 'no-store' }

    if (!page) {
      return Response.json({ error: 'Головну сторінку ще не створено' }, { status: 404, headers })
    }

    return Response.json(toLandingContent(page, site), { headers })
  },
}
