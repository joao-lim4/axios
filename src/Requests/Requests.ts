import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

interface ICancelObject {
    req: any,
    cancel: Function
}

class Requests {

    private Axios;
    private HeadersSendFile:object = {
        'Content-Type': 'multipart/form-data'
    }

    constructor(Axios:AxiosInstance){
        this.Axios = Axios;
    }

    private async requestTry(requestFunction: Function):Promise<any> {
        try {
            await requestFunction();
        } catch (error) {   
            return error;
        }
    }

    /**
     * @name SendFile
     * @description Request pronta para enviar arquivos, utilizando somente como 'Content-Type': 'multipart/form-data'
     * @param url string
     * @param formData formData
     * @param axiosConfig AxiosRequestConfig
     * @returns 
     */
    async SendFile(url: string, formData: any, axiosConfig: AxiosRequestConfig){
        return await this.requestTry(
            () => this.Axios.post(
                url, 
                formData, 
                {...axiosConfig, headers: {...axiosConfig.headers, ...this.HeadersSendFile}}
            )
        )
    }

    /**
     * @name CancelRequest
     * @description Possibilita cancelar uma promisse que ainda não foi finalizada, utilizando o cancel token do axios.
     * 
     * @param method string
     * @param url string
     * @param axiosConfig AxiosRequestConfig 
     * @param data any
     * @returns {ICancelObject}
     */
    CancelRequest(method: "get" | "post" | "put" | "delete" | "options",url:string, axiosConfig: AxiosRequestConfig = {}, data?:any): ICancelObject {
        const sourceToken = axios.CancelToken.source();
        if(["GET", "PUT", "DELELTE"].includes(method.toUpperCase())) {
            return {
                req: this.Axios[method](url,{
                    ...axiosConfig,
                    cancelToken: sourceToken.token
                }),
                cancel: sourceToken.cancel
            } 
        }

        return {
            req: this.Axios[method](url, data, {...axiosConfig, cancelToken: sourceToken.token}),
            cancel: sourceToken.cancel,
        }
    }
    
}


export { Requests }