import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IOptionsInterceptors } from '../@types/OptionsInterceptors';
import { RegisterInterceptors } from '../Helpers/RegisterInterceptor';
import { Requests } from '../Requests/Requests';

class Axios extends RegisterInterceptors {
	AxiosInstaceApi: AxiosInstance;
    private Request;

    /**
     * @name constructor
     * @description Instanciar a classe com a config do axios, podendo passar todos os interceptors que ira ser registrados
     * @param config @type AxiosRequestConfig
     * @param optionsInterceptors @type IOptionsInterceptors
     */
	constructor(config: AxiosRequestConfig, optionsInterceptors?:IOptionsInterceptors ) {
        let axiosInstance = axios.create(config);
		super(axiosInstance);
        this.AxiosInstaceApi = axiosInstance;
        if((optionsInterceptors?.noRegister) === false) {
            this.initRegisterInterceptors(optionsInterceptors);
        }
        this.Request = new Requests(this.AxiosInstaceApi);
    }    


    /**
     * @name getRequest
     * @description Retorna um objeto contendo dois mesmotos SendFile e CancelRequest
     * @returns 
     */
    getRequest() { return this.Request }



}

export { Axios };
