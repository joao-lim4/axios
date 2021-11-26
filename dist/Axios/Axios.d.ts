import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IOptionsInterceptors } from '../Interfaces/OptionsInterceptors';
import { RegisterInterceptors } from '../Helpers/RegisterInterceptor';
import { Requests } from '../Requests/Requests';
declare class Axios extends RegisterInterceptors {
    AxiosInstaceApi: AxiosInstance;
    private Request;
    /**
     * @name constructor
     * @description Instanciar a classe com a config do axios, podendo passar todos os interceptors que ira ser registrados
     * @param config @type AxiosRequestConfig
     * @param optionsInterceptors @type IOptionsInterceptors
     */
    constructor(config: AxiosRequestConfig, optionsInterceptors?: IOptionsInterceptors);
    /**
     * @name getRequest
     * @description Retorna um objeto contendo dois mesmotos SendFile e CancelRequest
     * @returns
     */
    getRequest(): Requests;
}
export { Axios };
