interface IInterceptorsRegisterIDs {
    keyInterceptorName: string,
    id: number,
    type?: 'response' | 'request',
}


interface IEjectInterceptor {
    id: number,
    type: 'response' | 'request',
}

export {IInterceptorsRegisterIDs, IEjectInterceptor}