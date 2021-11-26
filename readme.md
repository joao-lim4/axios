<p align="center">
    <a href="https://github.com/joao-lim4">
        <img src="https://i.ibb.co/k00WVgN/logo.png" alt="Logo" width="150">
    </a>
    <br/>
    <h3 align="center">Axios requests</h3>
    <br/>
    <p align="center">
        console.log('☕☕');
        <br />
        <a href="https://github.com/joao-lim4/builder"><strong> << View Doc >></strong></a>
    </p>
</p>


### Instalação
```sh
npm i axios-service-lm | yarn add axios-service-lm
```
### Uso básico

```js
    import Axios from "axios-service-lm";  

    /**
     * Aqui pode ser feito toda a sua configuração do axios
     * assim como você faria ao utilizar diretamente o axios
     */
    const ApiConfig = new Axios({
        baseURL: "sua url base"
    });

    const Api = ApiConfig.AxiosInstaceApi;

    export { Api };
```

### Realizando requisições 

```js

    import { Api } from "Caminho para Api";  

    const get = async () => {
        try {
            /**
             * Aqui pode ser feito uma requisição do axio normalmente
             */
            console.log(await Api.get("https://jsonplaceholder.typicode.com/todos/1"));
        } catch (error) {
            console.log(error);
        }
    }

    get();
```

### Interceptors
Tem duas formas de usar interceptos ao utilizar o pacote ```sh axios-service-lm``` um deles é utilizando os interceptadores básicos e a outra forma é registrando os seus interceptors;

#### Objeto de configuração

```js
    noRegister: boolean, -> // se noRegister for passado como false, nenhum interceptor será registrado.
    useBasicHandlers: boolean, -> //se useBasicHandlers for passado com true, interceptadores básicos serão registrados.
    basicInterceptors?: { // basicInterceptors {opcional}, se useBasicHandlers for true, você pode escolher qual interceptor vai registrar
        onResponseError401?: Function,
        onResponseError500?: Function,
        onResponse?: Function,
        onResponseError422?: Function,
    },
    handlers?: { // handlers {opcional}, se noRegister for falso e useBasicHandlers for false a propriedade handlers deve ser passada para que algum interceptor seja registrado.
        request?: { // request {opcional}
            use: [
                {
                    handleInterceptor: (config: AxiosRequestConfig) => void, // handleInterceptor é a função que vai ser registrada no seu interceptor
                }
            ]
        },
        response?: { // response {opcional}
            use: [
                {
                    handleInterceptor: (param: AxiosResponse) => void, // handleInterceptor é a função que vai ser registrada no seu interceptor
                }
            ]
        }
    }

    /**
     * 
     * Se quiser registrar interceptors do tipo request passe na propriedade use um array com todos os seus interceptos
     * Se quiser registrar interceptors do tipo response passe na propriedade use um array com todos os seus interceptos
     */

```

#### Configurando interceptadores básicos
```js
    /**
     *  Todos os seus interceptors básicos serão registrados e os IDs de cada um serão devolvidos para que no futuro você possa ejetá-los.
     */

    const Ids = ApiConfig.initRegisterInterceptors({
        noRegister: false,
        useBasicHandlers: true,
        basicInterceptors: {
            onResponse: (response) => console.log(`Houve um response -> response: ${response}`),
            onResponseError401: (response) => console.log(`Houve um erro 401 -> response: ${response}`),
            onResponseError422: (response) => console.log(`Houve um erro 422 -> response: ${response}`),
            onResponseError500: (response) => console.log(`Houve um erro 500 -> response: ${response}`),
        }
    });

```

#### Configurando meus interceptors
```js
    const ids = ApiConfig.initRegisterInterceptors({
        noRegister: false,
        useBasicHandlers: false,
        handlers: {
            response: {
                use: [
                    {
                        handleInterceptor: (response) => {
                            console.log("houve um response");
                            return Promise.reject(response);
                        }
                    }, 
                ]
            },
            request: {
                use: [
                    {
                        handleInterceptor: (config) => {
                            console.log("houve um request");
                            return config;
                        }
                    }
                ]
            }
        }
    });

```

### Aproveitando requests prontos 

```js
    /**
     * A função getRequest vai te retornar um objeto contendo duas propriedades
     * SendFile e CancelRequest
     * SendFile já é uma requisição para mandar arquivos -> method "POST"
     * CancelRequest é uma requisição que pode ser cancelada antes dela ser concluída.
     */
    const { SendFile, CancelRequest } = ApiConfig.getRequest();
```


### SendFile

```js

    const { SendFile } = ApiConfig.getRequest();

    /**
     * O método SendFile precisa de 3 parâmetros para funcionar
     * @param url {string}
     * @param formData {formData}
     * @param axiosConfig {AxiosRequestConfig}
     *
     * O parâmetro formData é literalmente o formData que a sua imagem está
     */
    
    const formData = new FormData();
    formData.append("meu arquivo", new File());
        
    try {
        await SendFile("minha url", formData);
    } catch (error) {
        console.log(error);
    }

```


### SendFile

```js

    const { CancelRequest } = ApiConfig.getRequest();

    /**
     * O método CancelRequest precisa de 4 parâmetros para funcionar
     * @param method { "get" | "post" | "put" | "delete" | "options" }
     * @param url {string}
     * @param axiosConfig {AxiosRequestConfig}
     * @param data? -> não obrigatório {data}
     *
     * O parâmetro formData é literalmente o formData que a sua imagem está
     */

    const calcelRequest = requests.CancelRequest("get", "https://jsonplaceholder.typicode.com/todos/1");
    // A variável cancelRequest vai ter um objeto do tipo { req: any, cancel: Function }
    // onde req é a sua requisição montada e cancel é a sua função para cancelar essa req


    //Fazendo a requisição
    const getCancel = async () => {
        try {
            console.log(await calcelRequest.req)
        } catch (error) {
            console.log(error);
        }
    }
    getCancel()

    //Cancelando a requisição

    calcelRequest.cancel("request cancelado");


```


## Obteve algum erro?
Entre em contato comigo me falando do erro, que resolverei assim que possível.

## Contato
[INSTAGRAM](https://www.instagram.com/joao_lim4/)
<br/>
[WHATSAPP](https://api.whatsapp.com/send/?phone=%2B5531989013076&text=Ola%20vim%20pelo%20seu%20primeiro%20projeto%20react&app_absent=0&lang=pt_br)
<br/>
limas.devs@gmail.com

# License
MIT - see LICENSE

