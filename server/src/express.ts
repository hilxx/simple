import { createServer } from 'http'
import { Req, Res } from './types'

class Express {
    private GET: Tree
    private POST: Tree

    constructor() {
        this.GET = new Tree()
        this.POST = new Tree()
    }

    listener(port = 7890) {
        const server = createServer(this.serverHandle)
        server.listen(port, () =>
            `server is running http//:localhost:${port}`)
    }

    use(...rest: AnyFunction[]) {
        const { GET, POST } = this
        GET.append(rest)
        POST.append(rest)
    }

    get(...rest: AnyFunction[]) {
        this.GET.append(rest)
    }

    post(...rest: AnyFunction[]) {
        this.POST.append(rest)
    }

    private iterator(req: Req, res: Res) {
        const method = req.method?.toUpperCase() as 'POST' | 'GET'
        const cbs = this[method].filterCallback(req.url!)
        const next = () => {
            cbs[i] && cbs[i](req, res, next)
        }

        let i = 0
        next()
    }

    private serverHandle(req: Req, res: Res) {
        res.json = (data) => {
            res.end(JSON.stringify(data))
        }
        [req.path, req.query = ''] = req.url!.split('?')
        this.iterator(req, res)
    }
}

type AnyFunction = (...rest: any[]) => any

class Tree {
    list: Array<{
        f: AnyFunction
        path: string
    }>

    constructor() {
        this.list = []
    }

    append(rest: Array<string | AnyFunction>) {
        let path = (typeof rest[0] === 'function' ? '/' : rest.shift()) as string
        for (const f of rest as AnyFunction[]) {
            this.list.push({
                path,
                f,
            })
        }
    }

    filterCallback(path: string): AnyFunction[] {
        return this.list
            .filter(item => item.path.includes(path))
            .map(item => item.f)
    }
}


export default () => {
    return new Express
}

