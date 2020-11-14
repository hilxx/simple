import redis from 'redis'
import config from '../../../config/db'

const
    { port, host } = config.redis,
    redisClient = redis.createClient(port, host)

redisClient.on('error', err => {
    console.log(`redisClient.onError()`, err);
})

export const getRedis = (key: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if (err) return reject(err)
            if (!data) return resolve(data)
            try {
                data = JSON.parse(data)
            } catch {
                data = data
            }
            resolve(data)
        })
    })
}

export const setRedis = (key: string, value: any): void => {
    if (value && typeof value === 'object')
        value = JSON.stringify(value)
    redisClient.set(key, value)
}

export const removeRedis = (key: string): boolean => {
    return redisClient.del(key)
}