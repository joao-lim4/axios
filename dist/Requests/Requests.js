"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requests = void 0;
const axios_1 = require("axios");
class Requests {
    constructor(Axios) {
        this.HeadersSendFile = {
            'Content-Type': 'multipart/form-data'
        };
        this.Axios = Axios;
    }
    requestTry(requestFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield requestFunction();
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * @name SendFile
     * @description Request pronta para enviar arquivos, utilizando somente como 'Content-Type': 'multipart/form-data'
     * @param url string
     * @param formData formData
     * @param axiosConfig AxiosRequestConfig
     * @returns
     */
    SendFile(url, formData, axiosConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.requestTry(() => this.Axios.post(url, formData, Object.assign(Object.assign({}, axiosConfig), { headers: Object.assign(Object.assign({}, axiosConfig.headers), this.HeadersSendFile) })));
        });
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
    CancelRequest(method, url, axiosConfig = {}, data) {
        const sourceToken = axios_1.default.CancelToken.source();
        if (["GET", "PUT", "DELELTE"].includes(method.toUpperCase())) {
            return {
                req: this.Axios[method](url, Object.assign(Object.assign({}, axiosConfig), { cancelToken: sourceToken.token })),
                cancel: sourceToken.cancel
            };
        }
        return {
            req: this.Axios[method](url, data, Object.assign(Object.assign({}, axiosConfig), { cancelToken: sourceToken.token })),
            cancel: sourceToken.cancel,
        };
    }
}
exports.Requests = Requests;
