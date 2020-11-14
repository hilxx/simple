import { Req } from '../types'

export const
    getRequestBody = (req: Req): Promise<any> => new Promise((resolve, reject) => {
        const contentType = req.headers['content-type'] || ''

        let result = ''
        req.on('data', chunk => result += chunk)
        req.on('end', () => {
            if (contentType.includes('x-www-form-urlencoded')) {
                resolve(extractObject(result))
            } else if (contentType !== 'application/json')
                resolve(JSON.parse(result))
            resolve({})
        })
    })

function extractObject(str: string): object {
    const res: { [key: string]: any } = {}
    for (const keyVal of str.split('&')) {
        const [key, value] = keyVal.split('=')
        res[key] = value
    }
    return res
}