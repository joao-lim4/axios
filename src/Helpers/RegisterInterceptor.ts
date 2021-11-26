import { AxiosInstance } from 'axios';
import { IEjectInterceptor, IInterceptorsRegisterIDs } from '../Interfaces/Interceptors';
import { IOptionsInterceptors } from '../Interfaces/OptionsInterceptors';
import { objectInterceptors } from '../Interceptors/BasicInterceptors';

class RegisterInterceptors {

    private Axios;
    private defultConfig: IOptionsInterceptors = {
        noRegister: true,
        useBasicHandlers: false,
    }
    private basicInterceptors = objectInterceptors;
    private InterceptorsRegisterIDs:Array<IInterceptorsRegisterIDs> = [];

    constructor(Axios: AxiosInstance) {
        this.Axios = Axios;
    }

    private getProperty(object:object|undefined, find:string):any {
        if(typeof object === "undefined") return;
        const basicInterceptorsKeys = Object.keys({...object});
        let indexof = basicInterceptorsKeys.indexOf(find);
        if(indexof === -1) return "";
        return Object.values({...object})[indexof];
    }

    private registerInterceptor():void | Array<IInterceptorsRegisterIDs> | object {
        if(this.defultConfig.noRegister) return;
        if(this.defultConfig.useBasicHandlers === true) return this.registerBasicInterceptors();
        return this.registerArrayInterceptors();
    }
    

    private registerResponseInterceptor = (keyInterceptor: string):void => {
        this.InterceptorsRegisterIDs.push(
            {
                keyInterceptorName: keyInterceptor,
                id: this.Axios.interceptors.response.use(
                    (param => 
                        this.basicInterceptors[keyInterceptor](
                            param, this.getProperty(this.defultConfig.basicInterceptors, keyInterceptor)
                        ) 
                    )
                )
            }
        )
    }

    private registerRequestInterceptor = (keyInterceptor: string):void => {
        this.InterceptorsRegisterIDs.push(
            {
                keyInterceptorName: keyInterceptor,
                id: this.Axios.interceptors.request.use(
                    (param => 
                        this.basicInterceptors[keyInterceptor](
                            param, this.getProperty(this.defultConfig.basicInterceptors, keyInterceptor)
                        ) 
                    )
                )
            }
        )
    }
    
    private registerBasicInterceptors() {
        const keysBasicInterceptos = Object.keys({...this.defultConfig.basicInterceptors});
        if(!keysBasicInterceptos.length) return;

        keysBasicInterceptos.forEach((keyInterceptor: string) => {
            if(keyInterceptor.indexOf("onResponse") !== -1) {
                this.registerResponseInterceptor(keyInterceptor);
            }else if (keyInterceptor.indexOf("onRequest") !== -1) {
                this.registerRequestInterceptor(keyInterceptor);
            }
        });
    }


    private registerArrayInterceptors(): Array<IInterceptorsRegisterIDs> | object {
        if(this.defultConfig.handlers) {
            this.defultConfig.handlers.response?.use.forEach((interceptor) => {
                this.InterceptorsRegisterIDs.push({
                    keyInterceptorName: "reponse interceptor",
                    id: this.Axios.interceptors.response.use(param => interceptor.handleInterceptor(param)),
                    type: 'response',
                });
            })

            this.defultConfig.handlers.request?.use.forEach((interceptor) => {
                this.InterceptorsRegisterIDs.push({
                    keyInterceptorName: "reqquest interceptor",
                    id: this.Axios.interceptors.request.use(param => interceptor.handleInterceptor(param)),
                    type: 'request',
                });
            });

            // window.registerModule() = this.InterceptorsRegisterIDs;
            return this.InterceptorsRegisterIDs;
        }

        return { error: "Não foi especificado nenhum handler" }
    }

    /**
     * @name ejectInterceptor
     * @description Funcao para ejetar interceptors do axios, requer um array com os ids que vão ser ejetados
     * @param Ejects Array
     * @returns void 
     */
    ejectInterceptor(Ejects: Array<IEjectInterceptor>): void  {
        if(Ejects.length){
            Ejects.forEach(eject => {
                if(eject.type === "request") {
                    this.Axios.interceptors.request.eject(eject.id);
                }else {
                    this.Axios.interceptors.response.eject(eject.id);
                }
            })
        }
    }
    
    /**
     * @name initRegisterInterceptors
     * @description Inicializa os interceptors do axios, fique atento ao objeto de config
     * @param config IOptionsInterceptors
     * @returns void | IInterceptorsRegisterIDs[] | object
     */
    initRegisterInterceptors(config:IOptionsInterceptors): void | Array<IInterceptorsRegisterIDs> | object {
        this.defultConfig = config;
        return this.registerInterceptor();
    }
}


export { RegisterInterceptors };