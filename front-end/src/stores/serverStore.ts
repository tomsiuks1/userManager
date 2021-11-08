import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../data/ServerError";

export default class ServerStore {
    token: string | null = window.localStorage.getItem('jwt');
    error: ServerError | null = null;
    appLoaded = false;


    constructor(){
        makeAutoObservable(this);


        reaction(
            () => this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoadded = () => {
        this.appLoaded = true;
    }

    
}