module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.bilibili.com/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com/'
                }
            },
            '/login': {
                target: 'http://passport.bilibili.com/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/login': ''
                },
                cookieDomainRewrite: "localhost",

            },
            '/vc': {
                target: 'https://api.vc.bilibili.com/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/vc': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com/'
                }
            },
            '/live': {
                target: 'https://api.live.bilibili.com/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/live': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com/'
                }
            },
            '/manga': {
                target: 'https://manga.bilibili.com/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/manga': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com'
                }
            },
            '/bili': {
                target: 'https://www.bilibili.com/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/bili': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com'
                },
                cookieDomainRewrite: "localhost",
            },
            '/search': {
                target: 'https://s.search.bilibili.com/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/search': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com'
                }
            },
            '/hw': {
                target: 'http://upos-sz-mirrorhw.bilivideo.com', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/hw': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com'
                }
            },
            '/cos': {
                target: 'http://upos-sz-mirrorcos.bilivideo.com', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/cos': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com'
                }
            },
            '/acg': {
                target: 'http://upos-hz-mirrorks3u.acgvideo.com', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                secure: false,
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/acg': ''
                },
                headers: {//header设置
                    referer: 'https://www.bilibili.com/',//referer
                    origin: 'https://www.bilibili.com'
                }
            },


        }
    },
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            config.set('externals', {
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                axios: 'axios',
            })
        })

        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.js')
        })
    }

}