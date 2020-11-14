import { Res } from '../types/index'

export type ComputeCookieOptions = {
    key: string
    value: string
    httpOnly?: boolean
    maxAge?: number
    path?: string
    maxAgeUnit?: TimeUnit
}

type TimeUnit = 'day' | 'hour' | 'min' | 'second'


export const setCookie = (res: Res, val: string) => {
    res.setHeader('Set-Cookie', val)
}

export const computeCookie = (option: ComputeCookieOptions): string => {
    const { key, value, path, httpOnly, maxAge, maxAgeUnit = 'second' } = option
    const
        httpOnlyString = httpOnly ? 'HttpOnly' : '',
        expireString = maxAge
            ? `Max-Age=${computeMaxAge(maxAge, maxAgeUnit)
            } Expires=Web, ${computeExpires(maxAge, 'second')}`
            : ''

    return `${key}=${value}; path=${path}; ${expireString}; ${httpOnlyString}`
}

/** 将字符串cookie变为对象 */
export function transformCookie(cookie: string): object {
    if (!cookie) return {}
    const res: any = {}, reg1 = /\s*;\s*/
    for (const keyVal of cookie.split(reg1)) {
        const [key, val] = keyVal.split('=')
        res[key] = val
    }
    return res
}

function computeMaxAge(val: number, type: TimeUnit): number {
    let base = 1    /* 1 second */

    switch (type) {
        case 'day':
            val = base * val
            base = 24
        case 'hour':
            val *= base
            base = 60

        case 'min':
            val *= base
            base = 60

        case 'second':
            val *= base
    }

    return val
}

function computeExpires(val: number, type: TimeUnit): string {
    const now = Date.now()
    let rangeMs = 1000

    switch (type) {
        case 'day':
            rangeMs *= val
            val = 24

        case 'hour':
            rangeMs = rangeMs * val
            val = 60

        case 'min':
            rangeMs = rangeMs * val
            val = 60

        case 'second':
            rangeMs *= val
    }

    return new Date(now + rangeMs).toUTCString()
}