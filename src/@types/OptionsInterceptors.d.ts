import { AxiosResponse, AxiosRequestConfig } from "axios";

interface IOptionsInterceptors extends IHandlers, IBasicInterceptors {
    noRegister: boolean,
    useBasicHandlers: boolean,
}

interface IHandlers {
    handlers?: IHandlerInterceptors
}

interface IHandlerInterceptors {
    request?: {
        use: Array<IRequestHandler>
    },
    response?: {
        use: Array<IResponseHandler>
    }
}


interface IBasicInterceptors {
    basicInterceptors?: {
        onResponseError401?: Function,
        onResponseError500?: Function,
        onResponse?: Function,
        onResponseError422?: Function,
    }
}

interface IResponseHandler {
    handleInterceptor: (param: AxiosResponse) => void,
}

interface IRequestHandler {
    handleInterceptor: (param: AxiosRequestConfig) => void,
}

export { IOptionsInterceptors }