import { Req } from '../types/index'
import { getList, getDetail, postRemoveBlog, postNewBlog, postUpdateBlog } from '../db/mysql/blog'
import { SuccessModule, ErrorModule } from '../class/ResModule'
import { BaseModule } from '../class/ResModule'
import { Blog } from '../db/mysql/types'
import { Operater } from '../types'

const
    _checkGet: any = {
        '/api/blog/list'({ author, keyword }: { author?: string, keyword?: string }): Promise<BaseModule> {
            return getList(author, keyword).then(list => {
                return new SuccessModule(list)
            })
        },
        '/api/blog/detail'({ id }: { id: number }): Promise<BaseModule> {
            return getDetail(id).then(data => {
                return new SuccessModule(data)
            }).catch(err => new ErrorModule(err))
        }
    },
    _checkPost: any = {
        '/api/blog/new'(blog: Blog): Promise<BaseModule> {
            return postNewBlog(blog)
                .then((id: number) => new SuccessModule(id))
                .catch(err => new ErrorModule(err))
        },
        '/api/blog/update'(blog: Blog): Promise<BaseModule> {
            return postUpdateBlog(blog)
                .then(bool => new SuccessModule(bool))
                .catch(err => new ErrorModule(err))
        },
        '/api/blog/remove'({ id }: { id: number }): Promise<BaseModule> {
            return postRemoveBlog(id)
                .then(bool => new SuccessModule(bool))
                .catch(err => new ErrorModule(err))
        }
    },
    _check: any = {
        GET: _checkGet,
        POST: _checkPost,
    }

export default (req: Req, operator: Operater): any => {
    const
        { method, path, query } = req,
        handle = _check[method!] ? _check[method!][path!] : null
    if (handle) return handle(query)
}