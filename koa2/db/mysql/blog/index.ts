import exec, { escapeWrap, xssWrap } from '..'
import { BlogListItem, BlogDetail } from './@types'
export * from './@types'

const
    SELECT = `select * from blogs where 1=1 `,
    INSERT = `insert into blogs `,
    DELETE = `delete from blogs where `,
    UPDATE = `update blogs set `

export type GetListParamerter = { author?: string, keywords?: string }
export type GetDatailParamerter = { id: number }
export type CreateArticleParamerter = { title: string, content: string, author: string }
export type RemoveArticleParamerter = { id: number }
export type UpdateArticleParamerter = { id: number, content: string, title: string }

export const
    getList = ({ author, keywords }: GetListParamerter)
        : Promise<Array<BlogListItem>> => {
        let query = SELECT
            ;[author, keywords] = escapeWrap(author, keywords)

        if (author) query = query + `and author=${author} `
        if (keywords) query = query + `and title like ${keywords} `
        query = query + 'order by createtime desc'
        return exec(query)
    },
    getDetail = ({ id }: GetDatailParamerter): Promise<Array<BlogDetail>> => {
        const query = SELECT + `and id=${id}`
        return exec(query).then(data => data[0])
    }

export const
    createArticle = ({ title, content, author }: CreateArticleParamerter) => {
        [title, content, author] = escapeWrap(...xssWrap(title, content, author))
        return exec(
            `${INSERT}(title, content, author, createtime) `
            + `values(${title}, ${content}, ${author}, ${Date.now()})`
        ).then(insertdata => insertdata.affectedRows > 0)
    }

export const
    removeArticle = ({ id }: RemoveArticleParamerter) => {
        return exec(
            `${DELETE} id=${id}`
        ).then(deleteData => deleteData.affectedRows > 0)
    }

export const
    updateArticle = ({ id, content, title }: UpdateArticleParamerter) => {
        [content, title] = escapeWrap(...xssWrap(content, title))
        return exec(UPDATE
            + `content=${content}, title=${title} where id=${id}`
        ).then(updateData => updateData.affectedRows > 0)
    }