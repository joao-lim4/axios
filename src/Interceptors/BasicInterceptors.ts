import { AxiosResponse } from 'axios';

const onResponseError401 = (error: AxiosResponse, handlerFunction: (error: AxiosResponse) => any): Promise<any> => {
    const { status } = error;
    
    if (401 === status) {
        handlerFunction(error);
    }

    return Promise.reject(error);
}

const onResponseError500 = (error: AxiosResponse, handlerFunction: (error: AxiosResponse) => any): Promise<any> => {
    const { status } = error;
    
    if (500 === status) {
        handlerFunction(error);
    }

    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse, handlerFunction: (error: AxiosResponse) => any): Promise<any> => {
    handlerFunction(response);
    return Promise.reject(response);
}

const onResponseError422 = (error: AxiosResponse, handlerFunction: (error: AxiosResponse) => any): Promise<any> => {
    const { status } = error;
    
    if (422 === status) {
        handlerFunction(error);
    }

    return Promise.reject(error);
}

type IInterceptorsOptions = {
    [key: string]: Function
}

const objectInterceptors:IInterceptorsOptions = { onResponseError401 , onResponseError422 , onResponseError500 , onResponse  };

export { objectInterceptors };