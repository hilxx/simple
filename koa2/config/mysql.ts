import { ConnectionConfig } from 'mysql'
const { NODE_ENV: env } = process.env

const devConfig: ConnectionConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'myblog',
}

const prodConfig: ConnectionConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '07626683.',
    database: 'myblog',
}

export default env === 'dev' ? devConfig : prodConfig