import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server'
import { renderToString } from 'vue/server-renderer'
import { createApp } from '../src/main'

export async function render() {
  const { app } = await createApp()

  const appHtml = await renderToString(app)

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MagWishlist</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`
}
