import configApp from './ConfigApp'
import Routers from './routers'
import stores from './vuex'


const cfg = {
    stores: stores,
    router: {
        routes: [...Routers],
        beforeEach: [(to, from, next) => {
            next()
        }]
    },
    urlTables () {
        const tables = {
            'default': '/hmcp-hp'
        }
        return {
            ...tables
        }
    }
}
configApp(cfg)
