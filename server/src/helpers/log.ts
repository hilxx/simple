import fs, { WriteStream } from 'fs'
import path from 'path'
import readline from 'readline'

const constant = {
    logPath: path.resolve(__dirname, '../../logs')
}

/* 创建目录 */
fs.mkdir(constant.logPath, err => err && console.log(`fs.mkdir(logs)`, err))

const
    createWriteStream = (filename: string) =>
        fs.createWriteStream(`${constant.logPath}/${filename}`, {
            flags: 'a'
        })
    ,
    createReadStream = (filename: string) =>
        fs.createReadStream(`${constant.logPath}/${filename}`)

const writeLog = (writeStream: WriteStream, log: string) => {
    writeStream.write(`${log} \n`)
}

/* access */
const
    accessWriteStream = createWriteStream('access.log')


export const accessLog = (log: string) => {
    writeLog(accessWriteStream, log)
}


/**
 * @returns [chorm请求，总共请求]
 */
export const readAccessLog = (() => {


    return (): Promise<[number, number]> => {
        return new Promise(resolve => {
            let num = 0
            let chrome = 0
            const accessReadStream = readline.createInterface({
                input: createReadStream('access.log')
            })
            accessReadStream.on('line', data => {
                if (data.includes('Chrome')) chrome++
                num++
            })
            accessReadStream.on('close', () => {
                resolve([chrome, num])
            })
        })

    }
})()





