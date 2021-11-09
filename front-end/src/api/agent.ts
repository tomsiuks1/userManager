import axios, { AxiosResponse } from "axios";
import { AccountRegisterLogin, AccountSendBack } from "../data/accountUser";
import { User } from "../data/user";
import { store } from "../stores/store";

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.serverStore.token;

    if(token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    return response;


// (error: AxiosError) => {
//     const {data, status, config} = error.response!;
//     switch (status){
//         case 400:
//             if(config.method === 'GET' && data.errors.hasOwnProperty('id')) {
//                 history.push()
//             }
//     }
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
    update: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody)
};

const Users = {
    GetUsers: () => requests.get<User[]>('/user'),
    GetUser: (id: number) => requests.get<User>(`/user/${id}`),
    AddUser: (user: User) => requests.post('/user', user),
    DeleteUser: (id: number) => requests.delete(`/user/${id}`),
    UpdateUser: (user: User) => requests.update(`/user`, user)
};

const Account = {
    current: () => requests.get<AccountSendBack>('/account'),
    login: (user: AccountRegisterLogin) => requests.post<AccountSendBack>('/account/login', user),
    register: (user: AccountRegisterLogin) => requests.post<AccountSendBack>('/account/register', user)
}

const agent = {
    Users,
    Account
};

export default agent;