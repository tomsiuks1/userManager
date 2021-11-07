import { createContext, useContext } from "react";
import ModalStore from "./modalStore";
import UserStore from "./userStore";


interface Store{
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}