export interface AccountSendBack{
    username: string;
    displayName: string;
    token: string;
}

export interface AccountRegisterLogin{
    displayName?: string;
    email: string;
    password: string;
    username?: string;
}