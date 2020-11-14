import { Req, Res, ReturnParameters } from '../types'

export * from './post'

export const
    decidePostMethod = (method: string): boolean => method.toUpperCase() === 'POST'

export const
    enhanceMethod = <T extends object>(obj: T) => {
        const fn = (key: keyof T, cb: (...rest: any[]) => any) => {
            const old = obj[key]
            if (typeof old === 'function') {
                (obj[key] as any) = (...rest: any[]): void => {
                    return cb(...rest, old)
                }
            }
            return fn
        }
        return fn
    }
