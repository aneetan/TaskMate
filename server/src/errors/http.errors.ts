export class HttpError extends Error{
    constructor(public statusCode: number, message: string){
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends HttpError{
    constructor(message: string){
        super(400, message);
    }
}