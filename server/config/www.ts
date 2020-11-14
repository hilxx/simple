import http, { IncomingMessage, ServerResponse } from 'http'

const PORT = 7890
export default (cb: (req: IncomingMessage, res: ServerResponse) => void) => {
    const server = http.createServer(cb)
    server.listen(PORT, () => {
        console.log(`server run on http://localhost:${PORT}`)
    })
}
