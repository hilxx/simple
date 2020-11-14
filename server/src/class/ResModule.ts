export class BaseModule {
    data?: any
    message: string
    constructor(data: any, message: string) {
        this.message = message
        this.data = data
    }
}

export class SuccessModule extends BaseModule {
    errno: number
    constructor(data: any, message = 'success') {
        super(data, message)
        this.errno = 0
    }
}

export class ErrorModule extends BaseModule {
    error: number
    constructor(data: any, message = 'error') {
        super(data, message)
        this.error = -1
    }
}

