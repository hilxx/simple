import React from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

const Login: React.FC = () => {
    const history = useHistory()

    const submitHandle = (e: React.FormEvent) => {
        e.preventDefault()
        const { username, password } = e.target as any
        Axios('/api/user/login',{
            method: 'POST',
            data: {
                username: username.value,
                password: password.value
            }
        }).then((res: any) => {
            const {data} = res
            if (data.error === -1) {
                alert(data.message)
            } else 
                history.replace('/')
        })
    }

    return (
        <form onSubmit={submitHandle}>
            <input type="text" name='username' />
            <input type='password' name='password' />
            <button type='submit'>登录</button>
        </form>
    )
}

export default Login