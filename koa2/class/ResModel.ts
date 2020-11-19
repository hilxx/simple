export class Model {
    error: number
    data: any
    msg: string

    constructor({ error, data, msg }: { error: number, data: any, msg }) {
        this.data = data
        this.error = error
        this.msg = msg
    }
}

export class SuccessModel extends Model {
    constructor(data: any, msg = 'success') {
        super({ data, msg, error: 0 })
    }
}

export class ErrorModel extends Model {
    constructor(data: any, msg = 'error') {
        super({ data, msg, error: -1 })
    }
}