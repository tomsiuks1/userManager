import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import AddUserForm from "../forms/AddUserForm";
import { useStore } from "../stores/store";


export default function NavBar() {
    const [state, setState] = useState("home");
    const {modalStore} = useStore();
    const history = useHistory();

    function handleMenu(name:string){
        switch(name){
            case 'home':
                setState('home')
                history.push('/users');
                break;
            case 'Feed':
                setState('Feed')
                history.push('/');
                break;
            case 'Create New':
                setState('')
                modalStore.openModal(<AddUserForm />)
                // history.push('/users/add');
                break;
            case 'Login':
                setState('Login')
                history.push('/');
                break;
            case 'Sign In':
                setState('Sign In')
                history.push('/');
                break;
        }
    }
    return (
        <Segment>
        <Menu inverted size='large' fixed='top'>
          <Menu.Item
            name='home'
            active = {state === 'home'}
            onClick={() => {handleMenu('home')}}
            style={{marginLeft: 10}}
          />
          <Menu.Item
            name='Feed'
            active = {state === 'Feed'}
            onClick={() => {handleMenu('Feed')}}
          />
          <Menu.Item
            name='Create New'
            active = {state === 'Create New'}
            onClick={() => {handleMenu('Create New')}}>
                {/* <Button positive as={Link} to='/users/add'>Create New</Button> */}
            </Menu.Item>

          <Menu.Item
            position='right'
            name='Login'
            active = {state === 'Login'}
            onClick={() => {handleMenu('Login')}}
          />
          <Menu.Item
            name='Sign In'
            active = {state === 'Sign In'}
            onClick={() => {handleMenu('Sign In')}}
          />
        </Menu>
        </Segment>
    )
}
