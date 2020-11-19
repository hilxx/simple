import React, { createContext, useEffect, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

export const UserContext = createContext({})

const LoginWrap: React.FC = (props) => {
    const history = useHistory()
    const [userData, setUserData] = useState(Object.prototype)

    useEffect(() => {
        Axios('/api/user/check_login').then((res: any) => {
            if (res.data.data) {

                setUserData(res.data.data)
            } else history.replace('/login')
        })
    }, [history])


    return (
        <UserContext.Provider value={userData}>
            {props.children}
        </UserContext.Provider >
    )
}

export default LoginWrap