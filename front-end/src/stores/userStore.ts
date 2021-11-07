import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User } from "../data/user";



export default class UserStore{
    users: User[] = [];
    user: User | undefined;

    constructor(){
        makeAutoObservable(this);
    }

    loadUsers = async () => {
        try{
            const response = await agent.Users.GetUsers();
            
            runInAction(() => {
                response.forEach(user => {
                    this.users.push(user);
                })
            })
        } catch(error) {
            console.log(error);
        }
    }

    loadUser = async (id: string) => {
        var idnum: number = +id;
        let user = this.getUser(idnum);
        if (user) {
            this.user = user;
            return user;
        } else {
            try {
                user = await agent.Users.GetUser(idnum);
                runInAction(() => {
                    this.user = user;
                })
                return user;
            } catch (error) {
                console.log(error);
            }
        }
    }

    private getUser = (id: number) => {
        var idnum: number = +id;
        return this.users.find(user => user.id === idnum);
    }

    addUser = async (user: User) => {
        try{
            await agent.Users.AddUser(user);
            runInAction(() => {
                this.users.push(user);
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteUser = async (id: string) => {
        try{
            
            await agent.Users.DeleteUser(+id);
            
            runInAction(() => {
                let idnum: number = +id;
                this.users = this.users.filter(user => user.id !== idnum);
            })
        } catch(error){
            console.log(error);
        }
    }

    updateUser = async (user: User) => {
        try{
            await agent.Users.UpdateUser(user);
            runInAction(() => {
                const ind = this.users.map(function(e) {return e.id}).indexOf(user.id);
                this.users[ind] = user;
            })   
        } catch (error){
            console.log(error);
        }
    }
}