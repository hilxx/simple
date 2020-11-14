import exec from '.'
import { User } from './types'


export type UserLogin = (username: string, password: string) => Promise<User | undefined>

export const
    login: UserLogin = (username, password) => exec(
        `select username, realname from users 
        where username='${username}' and password=${password}`
    ).then(list => list[0])
