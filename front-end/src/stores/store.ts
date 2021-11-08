import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import ModalStore from "./modalStore";
import ServerStore from "./serverStore";
import UserStore from "./userStore";


interface Store{
    userStore: UserStore;
    modalStore: ModalStore;
    serverStore: ServerStore;
    accountStore: AccountStore;
}

export const store: Store = {
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    serverStore: new ServerStore(),
    accountStore: new AccountStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}