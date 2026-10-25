const appUrl = new URL(import.meta.env.VITE_APP_URL || 'http://localhost:8000')

if (!['http:', 'https:'].includes(appUrl.protocol)) {
  throw new Error('VITE_APP_URL має бути HTTP або HTTPS адресою Dayflow')
}

export const appLinks = {
  login: new URL('/login/', appUrl).href,
  register: new URL('/register/', appUrl).href,
}
