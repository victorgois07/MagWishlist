import { renderToString } from 'vue/server-renderer'
import { createApp } from './main.js'

export async function render(url: string) {
  const { app } = await createApp()

  const appHtml = await renderToString(app)

  return {
    appHtml,
  }
}
