import { login } from '../db/mysql/user'
import { SuccessModule, ErrorModule, BaseModule } from '../class/ResModule'
import { createUserCookie, Constants } from '../helpers/user'
import { Operater, Req } from '../types'
import { getRedis, setRedis, removeRedis } from '../db/redis'

const
    _getCheck: any = {
        async '/api/user/is_login'(_: any, __: any, req: Req) {
            const userCookie = req.cookie && req.cookie[Constants['cookeyUserName']]
            if (!userCookie) return new ErrorModule(null, '未登录')
            const data = await getRedis(userCookie)
            return new SuccessModule(data, '已登录')
        }
    },
    _postCheck: any = {
        async '/api/user/login'(
            { username, password }: { username: string, password: string },
            operator: Operater,
            req: Req
        ): Promise<BaseModule> {
            if (username && password)
              return  await login(username, password)
                    .then(data => {
                        if (!data) return new ErrorModule(data, '密码错误')
                        console.log(data);
                        const newCookie = loginSucessHandleCookie(req.cookie, data)
                        operator.setCookie(newCookie)
                        return new SuccessModule(data, '登录成功')
                    })
            return new ErrorModule(null, '账号密码错误')
        },
    },
    _check: any = {
        GET: _getCheck,
        POST: _postCheck
    }

export default (req: Req, operator: Operater): any => {
    const
        { method, path } = req,
        handle = _check[method!] ? _check[method!][path!] : null
    if (handle) return handle(req.query, operator, req)
}


function loginSucessHandleCookie
    (cookie: any, userData: any): string {
    if (!cookie) return ''
    const oldCookieValue = cookie[Constants['cookeyUserName']]
    const [newCookieValue, cookieOptions] = createUserCookie()
    oldCookieValue && removeRedis(oldCookieValue)
    setRedis(cookieOptions.value, userData)
    return newCookieValue
}

