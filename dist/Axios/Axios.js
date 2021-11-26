"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axios = void 0;
const axios_1 = require("axios");
const RegisterInterceptor_1 = require("../Helpers/RegisterInterceptor");
const Requests_1 = require("../Requests/Requests");
class Axios extends RegisterInterceptor_1.RegisterInterceptors {
    /**
     * @name constructor
     * @description Instanciar a classe com a config do axios, podendo passar todos os interceptors que ira ser registrados
     * @param config @type AxiosRequestConfig
     * @param optionsInterceptors @type IOptionsInterceptors
     */
    constructor(config, optionsInterceptors) {
        let axiosInstance = axios_1.default.create(config);
        super(axiosInstance);
        this.AxiosInstaceApi = axiosInstance;
        if ((optionsInterceptors === null || optionsInterceptors === void 0 ? void 0 : optionsInterceptors.noRegister) === false) {
            this.initRegisterInterceptors(optionsInterceptors);
        }
        this.Request = new Requests_1.Requests(this.AxiosInstaceApi);
    }
    /**
     * @name getRequest
     * @description Retorna um objeto contendo dois mesmotos SendFile e CancelRequest
     * @returns
     */
    getRequest() { return this.Request; }
}
exports.Axios = Axios;
