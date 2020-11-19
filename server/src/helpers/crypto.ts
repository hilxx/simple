import crypto from 'crypto'

/* 密匙 */
const SELECT_KEY = 'whxydwq!#'
const md5 = crypto.createHash('md5')

const md5Encipher = (content: string) => {
    md5.update(content).digest('hex')
}

export const encipherPassword = (passwrod: string) => md5Encipher(
    SELECT_KEY + passwrod
)