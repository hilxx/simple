import KoaRouter from 'koa-router'
import * as Blog from '../db/mysql/blog'
import { SuccessModel, ErrorModel } from '../class/ResModel'
import { checkLogin, getUserFromSession } from './user'

const router = new KoaRouter({
    prefix: '/api/blog'
})

router.get('/list', async (ctx, next) => {
    const { author, keywords }: Blog.GetListParamerter = ctx.query
    const data = await Blog.getList({ author, keywords })
    ctx.body = data ? new SuccessModel(data) : new ErrorModel(null)
})

router.get('/detail', async (ctx, next) => {
    const { id }: Blog.BlogDetail = ctx.query
    const data = await Blog.getDetail({ id })
    ctx.body = data ? new SuccessModel(data) : new ErrorModel(null)
})

router.get('/remove', checkLogin, async (ctx, next) => {
    const { id }: Blog.RemoveArticleParamerter = ctx.query
    const data = await Blog.removeArticle({ id })
    ctx.body = data ? new SuccessModel(data) : new ErrorModel(null)
})

router.post('/create', checkLogin, async (ctx, next) => {
    const { title, content }: Blog.CreateArticleParamerter = ctx.request.body
    const author = getUserFromSession(ctx).username
    const data = await Blog.createArticle({ title, content, author })
    ctx.body = data ? new SuccessModel(data) : new ErrorModel(data, '创建失败')
})

router.post('/update', checkLogin, async (ctx, next) => {
    const { id, content, title }: Blog.UpdateArticleParamerter = ctx.request.body
    const data = await Blog.updateArticle({ id, content, title })
    ctx.body = data ? new SuccessModel(data) : new ErrorModel(data)
})

export default router