"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterInterceptors = void 0;
const BasicInterceptors_1 = require("../Interceptors/BasicInterceptors");
class RegisterInterceptors {
    constructor(Axios) {
        this.defultConfig = {
            noRegister: true,
            useBasicHandlers: false,
        };
        this.basicInterceptors = BasicInterceptors_1.objectInterceptors;
        this.InterceptorsRegisterIDs = [];
        this.registerResponseInterceptor = (keyInterceptor) => {
            this.InterceptorsRegisterIDs.push({
                keyInterceptorName: keyInterceptor,
                id: this.Axios.interceptors.response.use((param => this.basicInterceptors[keyInterceptor](param, this.getProperty(this.defultConfig.basicInterceptors, keyInterceptor))))
            });
        };
        this.registerRequestInterceptor = (keyInterceptor) => {
            this.InterceptorsRegisterIDs.push({
                keyInterceptorName: keyInterceptor,
                id: this.Axios.interceptors.request.use((param => this.basicInterceptors[keyInterceptor](param, this.getProperty(this.defultConfig.basicInterceptors, keyInterceptor))))
            });
        };
        this.Axios = Axios;
    }
    getProperty(object, find) {
        if (typeof object === "undefined")
            return;
        const basicInterceptorsKeys = Object.keys(Object.assign({}, object));
        let indexof = basicInterceptorsKeys.indexOf(find);
        if (indexof === -1)
            return "";
        return Object.values(Object.assign({}, object))[indexof];
    }
    registerInterceptor() {
        if (this.defultConfig.noRegister)
            return;
        if (this.defultConfig.useBasicHandlers === true)
            return this.registerBasicInterceptors();
        return this.registerArrayInterceptors();
    }
    registerBasicInterceptors() {
        const keysBasicInterceptos = Object.keys(Object.assign({}, this.defultConfig.basicInterceptors));
        if (!keysBasicInterceptos.length)
            return;
        keysBasicInterceptos.forEach((keyInterceptor) => {
            if (keyInterceptor.indexOf("onResponse") !== -1) {
                this.registerResponseInterceptor(keyInterceptor);
            }
            else if (keyInterceptor.indexOf("onRequest") !== -1) {
                this.registerRequestInterceptor(keyInterceptor);
            }
        });
    }
    registerArrayInterceptors() {
        var _a, _b;
        if (this.defultConfig.handlers) {
            (_a = this.defultConfig.handlers.response) === null || _a === void 0 ? void 0 : _a.use.forEach((interceptor) => {
                this.InterceptorsRegisterIDs.push({
                    keyInterceptorName: "reponse interceptor",
                    id: this.Axios.interceptors.response.use(param => interceptor.handleInterceptor(param)),
                    type: 'response',
                });
            });
            (_b = this.defultConfig.handlers.request) === null || _b === void 0 ? void 0 : _b.use.forEach((interceptor) => {
                this.InterceptorsRegisterIDs.push({
                    keyInterceptorName: "reqquest interceptor",
                    id: this.Axios.interceptors.request.use(param => interceptor.handleInterceptor(param)),
                    type: 'request',
                });
            });
            // window.registerModule() = this.InterceptorsRegisterIDs;
            return this.InterceptorsRegisterIDs;
        }
        return { error: "Não foi especificado nenhum handler" };
    }
    /**
     * @name ejectInterceptor
     * @description Funcao para ejetar interceptors do axios, requer um array com os ids que vão ser ejetados
     * @param Ejects Array
     * @returns void
     */
    ejectInterceptor(Ejects) {
        if (Ejects.length) {
            Ejects.forEach(eject => {
                if (eject.type === "request") {
                    this.Axios.interceptors.request.eject(eject.id);
                }
                else {
                    this.Axios.interceptors.response.eject(eject.id);
                }
            });
        }
    }
    /**
     * @name initRegisterInterceptors
     * @description Inicializa os interceptors do axios, fique atento ao objeto de config
     * @param config IOptionsInterceptors
     * @returns void | IInterceptorsRegisterIDs[] | object
     */
    initRegisterInterceptors(config) {
        this.defultConfig = config;
        return this.registerInterceptor();
    }
}
exports.RegisterInterceptors = RegisterInterceptors;
