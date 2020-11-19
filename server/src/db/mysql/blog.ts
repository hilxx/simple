import { Blog } from './types'
import exec, { escapeWrap } from '.'

export type GetList = (author?: string, keyword?: string) => Promise<Array<Blog>>
export type GetDetail = (id: number) => Promise<Blog>
export type PostNewBlog = (blog: Blog) => Promise<number>
export type PostRemoveBlog = (id: number) => Promise<boolean>
export type PostUpdateBlog = (blog: Blog) => Promise<boolean>


export const
    getList: GetList = (author, keyword) => {
        [author, keyword] = escapeWrap(author, keyword)
        let sql = `select * from blogs  where 1=1 `
        if (author) sql += `and author=${author} `
        if (keyword) sql += `and title like '%${keyword}%'; `
        return exec(sql + 'order by createtime desc')
    },
    getDetail: GetDetail = id => exec(`select * from blogs where id=${id}`).then(data => data[0])


export const
    postNewBlog: PostNewBlog = blog => {
        let { title, content, author } = blog;
        [title, content, author] = escapeWrap(title, content, author)

        return exec(`insert into blogs (title, content,author, createtime)
         values(${title}, ${content}, ${author}, ${Date.now()})`).then(insertDate => {
            return insertDate.affectedRows ? insertDate.insertId : -1
        })

    },
    postRemoveBlog: PostRemoveBlog = id => {
        return exec(`delete from blogs where id=${escapeWrap(id)}`).then(deleteData => {
            return deleteData.affectedRows > 0
        })
    },
    postUpdateBlog: PostUpdateBlog = (blog) => {
        const { content, title, id } = blog
        return exec(`update blogs set content='${content}', title='${title}' where id=${id} `)
            .then(updateDate => updateDate.affectedRows > 0)
    }

