import { AxiosInstance, AxiosRequestConfig } from 'axios';
interface ICancelObject {
    req: any;
    cancel: Function;
}
declare class Requests {
    private Axios;
    private HeadersSendFile;
    constructor(Axios: AxiosInstance);
    private requestTry;
    /**
     * @name SendFile
     * @description Request pronta para enviar arquivos, utilizando somente como 'Content-Type': 'multipart/form-data'
     * @param url string
     * @param formData formData
     * @param axiosConfig AxiosRequestConfig
     * @returns
     */
    SendFile(url: string, formData: any, axiosConfig: AxiosRequestConfig): Promise<any>;
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
    CancelRequest(method: "get" | "post" | "put" | "delete" | "options", url: string, axiosConfig?: AxiosRequestConfig, data?: any): ICancelObject;
}
export { Requests };
