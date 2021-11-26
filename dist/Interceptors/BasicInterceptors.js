"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectInterceptors = void 0;
const onResponseError401 = (error, handlerFunction) => {
    const { status } = error;
    if (401 === status) {
        handlerFunction(error);
    }
    return Promise.reject(error);
};
const onResponseError500 = (error, handlerFunction) => {
    const { status } = error;
    if (500 === status) {
        handlerFunction(error);
    }
    return Promise.reject(error);
};
const onResponse = (response, handlerFunction) => {
    handlerFunction(response);
    return Promise.reject(response);
};
const onResponseError422 = (error, handlerFunction) => {
    const { status } = error;
    if (422 === status) {
        handlerFunction(error);
    }
    return Promise.reject(error);
};
const objectInterceptors = { onResponseError401, onResponseError422, onResponseError500, onResponse };
exports.objectInterceptors = objectInterceptors;
