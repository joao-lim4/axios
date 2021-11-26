import { AxiosInstance } from 'axios';
import { IEjectInterceptor, IInterceptorsRegisterIDs } from '../Interfaces/Interceptors';
import { IOptionsInterceptors } from '../Interfaces/OptionsInterceptors';
declare class RegisterInterceptors {
    private Axios;
    private defultConfig;
    private basicInterceptors;
    private InterceptorsRegisterIDs;
    constructor(Axios: AxiosInstance);
    private getProperty;
    private registerInterceptor;
    private registerResponseInterceptor;
    private registerRequestInterceptor;
    private registerBasicInterceptors;
    private registerArrayInterceptors;
    /**
     * @name ejectInterceptor
     * @description Funcao para ejetar interceptors do axios, requer um array com os ids que vão ser ejetados
     * @param Ejects Array
     * @returns void
     */
    ejectInterceptor(Ejects: Array<IEjectInterceptor>): void;
    /**
     * @name initRegisterInterceptors
     * @description Inicializa os interceptors do axios, fique atento ao objeto de config
     * @param config IOptionsInterceptors
     * @returns void | IInterceptorsRegisterIDs[] | object
     */
    initRegisterInterceptors(config: IOptionsInterceptors): void | Array<IInterceptorsRegisterIDs> | object;
}
export { RegisterInterceptors };
