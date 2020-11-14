import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import styles from './index.module.css'
import { UserContext } from '../../layout/login'


const Home = (): React.ReactElement => {
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        Axios.get('/api/blog/list').then(data => {
            setList(data.data.data)
        })
    }, [])



    return (
        <>
            <NewFormData
                onSubmit={(data: any) => {
                    Axios.post('/api/blog/new', data).then(data => Axios.get('/api/blog/list').then(data => {
                        setList(data.data.data)
                    }))
                }}
            />
            <ol className={styles.wrap}>
                {
                    list.map(item => (
                        <section key={item.id}>
                            <h2>{item.title}</h2>
                            <p>作者：{item.author}</p>
                            <article>{item.content}</article>
                        </section>
                    ))
                }
            </ol>
        </>
    )
}


const NewFormData: React.FC<{ onSubmit: any }> = ({ onSubmit }) => {
    const userData = useContext<any>(UserContext)
    const username = userData.username
    const submitHandle = (e: React.FormEvent) => {
        e.preventDefault()
        const { title, content } = e.target as any
        onSubmit({
            title: title.value,
            content: content.value,
            author: username
        })

    }

    return (
        <form onSubmit={submitHandle}>
            <input name='title' />
            <input name='content' />
            <button type='submit'>发布</button>
        </form>
    )
}

export default Home