import { makeAutoObservable, runInAction } from "mobx";
import { history } from "..";
import agent from "../api/agent";
import { AccountRegisterLogin, AccountSendBack } from "../data/accountUser";
import { store } from "./store";



export default class AccountStore{
    account: AccountSendBack | null = null;

    constructor(){
        makeAutoObservable(this);
    }


    login = async (creds: AccountRegisterLogin) => {
        try {
            const user = await agent.Account.login(creds);
            store.serverStore.setToken(user.token);

            runInAction(() => 
            {
                this.account = user
            }
            );
            
            history.push('/users')
            store.modalStore.closeModal();
        } catch (error) {
            console.log(error)
        }
    }


    logout = () => {
        store.serverStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.account = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.account = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: AccountRegisterLogin) => {
        const user = await agent.Account.register(creds);
        store.serverStore.setToken(user.token);
        
        runInAction(() => this.account = user);
        history.push('/users');
        store.modalStore.closeModal();
    }
}