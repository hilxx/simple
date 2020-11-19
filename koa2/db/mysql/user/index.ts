import exec, { escapeWrap } from '..'

const
    SELECT = `select * from users where `
    
export type LoginParameter = {
    username: string,
    password: string
}

export const
    login = ({ username, password }: LoginParameter) => {
        [username, password] = escapeWrap(username, password)
        return exec(SELECT + `username=${username} and password=${password}`)
            .then(selectData => selectData[0])
    }    