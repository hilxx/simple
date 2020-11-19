import { IncomingMessage, ServerResponse } from 'http'


export interface Operater {
    setCookie?(val: string): void
}

export interface Req extends IncomingMessage {
    path?: string
    /** get查询参数*/
    query?: any
    /** post携带data */
    body?: any
    cookie?: {
        [name: string]: any
    }
}


export interface Res extends ServerResponse {
    json?<T extends object>(data: T): void
}


export type ReturnParameters<T> = T extends (...rest: infer P) => any
    ? P : any