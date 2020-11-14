import { IncomingMessage, ServerResponse } from 'http'

export { ServerResponse as Res }


export interface Operater {
    setCookie(val: string): void
}

export interface Req extends IncomingMessage {
    path?: string
    /** get查询参数*/
    query?: any
    /** post携带data */
    body?: any
    cookie?:  {
        [name:string]: any
    }
}



export type ReturnParameters<T> = T extends (...rest: infer P) => any 
    ? P : any