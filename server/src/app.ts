import querystring from 'querystring'
import { Req, Res, Operater } from './types'
import www from '../config/www'
import routers from './routers'
import { getRequestBody, decidePostMethod } from './helpers'
import { transformCookie, setCookie } from './helpers/cookie'

const app = async (req: Req, res: Res): Promise<void> => {
    await handleReq(req, res)

    let promise: any
    const operater = createOperator(res)
    for (const router of routers) {
        promise = router(req, operater)
        if (promise) break
    }
    const data = await promise
    handleRes(data, res)
}

async function handleReq(req: Req, res: Res): Promise<void> {
    [req.path, req.query = ''] = req.url!.split('?')
    req.query = decidePostMethod(req.method!) ? await getRequestBody(req) : querystring.parse(req.query)
    req.cookie = transformCookie(req.headers.cookie || '')
}

function handleRes(data: any, res: Res): void {
    res.setHeader('content-type', 'application/json')
    if (data) res.end(JSON.stringify(data))
    else {
        res.writeHead(404, { 'Content-Type': "text/plain" })
        res.write('404 Not Found')
        res.end()
    }
}

function createOperator(res: Res): Operater {
    return {
        setCookie(val) {
            setCookie(res, val)
        }
    }
}

/* 启动 */
www(app)