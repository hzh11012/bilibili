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
                }
            },


        }
    }

}