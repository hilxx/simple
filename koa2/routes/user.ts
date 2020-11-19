import KoaRouter from 'koa-router'
import * as User from '../db/mysql/user'
import { SuccessModel, ErrorModel } from '../class/ResModel'

const router = new KoaRouter({
    prefix: '/api/user'
})

enum Constant {
    'USER'
}

/**
 * 从session得到用户信息
 */
export const getUserFromSession = (ctx: any) => ctx.session && ctx.session[Constant[0]]

export const checkLogin = async (ctx, next) => {
    if (getUserFromSession(ctx))
        return next()
    return ctx.body = new ErrorModel(null, '未登录')
}

router.get('/check_login', async (ctx, next) => {
    const isLogin = getUserFromSession(ctx)
    ctx.body =
        isLogin
            ? new SuccessModel((ctx as any).session[Constant[0]])
            : new ErrorModel(null, '未登录')
})

router.post('/login', async (ctx, next) => {
    const { password, username }: User.LoginParameter = ctx.request.body
    const data = await User.login({ password, username })
    if (!data) ctx.body = new ErrorModel(null, '用户名或密码错误')
    else {
        (ctx as any).session[Constant[0]] = data
        ctx.body = new SuccessModel(data)
    }
})

export default router