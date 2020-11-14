import { ConnectionConfig } from 'mysql'
const { NODE_ENV: env } = process.env



const devConfig = {
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'myblog',
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
    }
}

const prodConfig = {
    mysql: {
        host: '127.0.0.1',
        port: 6379,
    },
    redis: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '07626683.',
        database: 'myblog',
    }
}

export default env === 'dev' ? devConfig : prodConfig