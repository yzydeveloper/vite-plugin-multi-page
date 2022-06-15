import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import mpaPlugin from 'vite-plugin-multiple-page'

export default defineConfig(() => {
    const app = ['app1', 'app2']
    const rewrites = []
    const pages = app.reduce<Record<string, any>>((_pages, pageName) => {
        _pages[pageName] = {
            entry: `src/app/${pageName}/index.ts`,
            filename: `/pages/${pageName}.html`,
            template: `src/app/${pageName}/index.html`,
            inject: {
                data: {
                    title: 'mpa'
                }
            }
        }
        rewrites.push({
            from: `/${pageName}`,
            to: path.posix.join('/', `/pages/${pageName}.html`)
        })
        return _pages
    }, {})

    return {
        plugins: [
            vue(),
            mpaPlugin({
                pages,
                historyApiFallback: {
                    rewrites
                }
            }),
        ],
    }
})
