import mysql from 'mysql'
import config from '../../../config/db'

const con = mysql.createConnection(config.mysql)

/* 连接 */
con.connect()

export default (sql: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
