import { enhanceMethod } from './index'
import { Req, Res } from '../types'
import { ErrorModule } from '../class/ResModule'
import { computeCookie, ComputeCookieOptions } from './cookie'

export enum Constants {
    cookeyUserName = 'uusnmm'
}

/** 
 * 随机生成cookie
 * */
export const createUserCookie = (): [string, ComputeCookieOptions] => {
    const options: ComputeCookieOptions = {
        key: Constants['cookeyUserName'],
        value: `${Date.now()}_${Math.random()}`,
        path: '/',
        maxAge: 10,
        maxAgeUnit: 'day',
    }
    return [computeCookie(options), options]
}

/**
    @returns true已经登录
*/
const checkLogin = <T extends object>(cookieObj?: T): boolean => {
    if (!cookieObj) return false
    if (Reflect.has(cookieObj, Constants['cookeyUserName']))
        return true
    return false
}

export const checkLoginChain = <T extends object>(obj: T) => {
    const enhancer = enhanceMethod<T>(obj)
    return (key: keyof T) => {
        enhancer(key, (...rest: [Req, Res, ...any[]]) => {
            const old = rest.pop() as Function
            if (checkLogin(rest[0].cookie)) {
                return old.apply(obj, rest)
            } else {
                return new ErrorModule(null, '未登录')
            }
        })
    }
}