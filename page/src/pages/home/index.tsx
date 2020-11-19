import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import styles from './index.module.css'

const Home = (): React.ReactElement => {
    const [list, setList] = useState<any[]>([])
    const [detail, setDetail] = useState<
        { id: number, content: string, title: string, author: string }
    >()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [submitState, setSubmitState] = useState<'create' | 'update'>('create')

    const
        requestList = () => {
            Axios.get('/api/blog/list').then(data => {
                setList(data.data.data)
            })
        },
        requestBlogDetail = (id: number) => {
            Axios.get('/api/blog/detail', {
                params: {
                    id
                }
            }).then(data => {
                setDetail(data.data.data)
            })
        },
        requestRemvoe = (id: number) => {
            Axios.get('/api/blog/remove', {
                params: {
                    id
                }
            }).then(data => {
                setDetail(undefined)
                requestList()
            })
        },
        requestSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            Axios.post(`/api/blog/${submitState}`, {
                title: title,
                content: content,
                id: detail?.id
            }).then(data => Axios.get('/api/blog/list').then(data => {
                setList(data.data.data)
                setDetail({ ...detail!, content, title })
                setSubmitState('create')
            }))
        }

    const updateHandle = () => {
        if (detail) {
            setContent(detail.content)
            setTitle(detail.title)
            setSubmitState('update')
        }
    }

    useEffect(() => {
        requestList()
    }, [])


    return (
        <div className={styles.wrap}>
            <section>
                {
                    list.map(item => (
                        <section
                            style={{ border: '1px solid rgba(0,0,0,.1)' }}
                            key={item.id}
                            onClick={() => requestBlogDetail(item.id)}
                        >
                            <h2>{item.title}</h2>
                            <p>作者：{item.author}</p>
                        </section>
                    ))
                }
            </section>

            <form onSubmit={requestSubmit}>
                <input name='title' value={title} onChange={e => setTitle(e.target.value)} />
                <input name='content' value={content} onChange={e => setContent(e.target.value)} />
                <button type='submit'>{submitState === 'create' ? '发布' : '更新'}</button>
            </form>

            <section>
                <h2>内容区</h2>
                {
                    !detail
                        ? null :
                        <>
                            <button onClick={() => detail && requestRemvoe(detail.id)}>删除</button>
                            <button onClick={updateHandle}>更新</button>
                            <h3>{detail.title} </h3>
                            <p>{detail.author}</p>
                            <p>{detail.content}</p>
                        </>

                }
            </section>

        </div>

    )
}


export default Home