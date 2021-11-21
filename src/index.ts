// import { Axios } from "./Axios/Axios";  


// const ApiConfig = new Axios({
//     baseURL: "http://localhost:8800"
// });

// // const ids = ApiConfig.initRegisterInterceptors({
// //     noRegister: false,
// //     useBasicHandlers: false,
// //     handlers: {
// //         response: {
// //             use: [{handleInterceptor: () => {
// //                 console.log("response")
// //             }}, {handleInterceptor: () => {
// //                 console.log("response 2")
// //             }}]
// //         }
// //     }
// // });

// // console.log(ids);

// // const Api = ApiConfig.AxiosInstaceApi;

// // const get = async () => {
// //     try {
// //         console.log(await (await Api.get("https://jsonplaceholder.typicode.com/todos/1")).data);
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }

// const requests = ApiConfig.getRequest();
// const calcelRequest = requests.CancelRequest("get", "https://jsonplaceholder.typicode.com/todos/1");

// const getCancel = async () => {
//     try {
//         console.log(await calcelRequest.req)
//     } catch (error) {
//         console.log(error);
//     }
// }

// getCancel()

// calcelRequest.cancel("Cancelado porra")


// // get()