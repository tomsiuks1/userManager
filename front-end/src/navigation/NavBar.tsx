import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Segment, Image, Dropdown } from "semantic-ui-react";
import LoginForm from "../account/LoginForm";
import AddUserForm from "../forms/AddUserForm";
import { useStore } from "../stores/store";


export default observer(function NavBar() {
  const { accountStore: { account, logout } } = useStore()
  const [state, setState] = useState("home");
  const { modalStore } = useStore();
  const history = useHistory();

  // useEffect(() => {
  //   if (!account?.token) {
  //     modalStore.openModal(<LoginForm />)
  //   }
  // }, [account, modalStore])

  function handleLogout(){
    logout();
    history.push('/');
  }

  function handleMenu(name: string) {
    switch (name) {
      case 'home':
        setState('home')
        history.push('/');
        break;
      case 'Feed':
        setState('Feed')
        history.push('/users');
        break;
      case 'Create New':
        setState('')
        modalStore.openModal(<AddUserForm />)
        // history.push('/users/add');
        break;
      // case 'Login':
      //   setState('')
      //   modalStore.openModal(<LoginForm />)
      //   // history.push('/login');
      //   break;
      // case 'Sign In':
      //   setState('')
      //   modalStore.openModal(<RegisterForm />)
      //   // history.push('/register');
      //   break;
    }
  }
  return (
    <Segment>

      <Menu inverted size='large' fixed='top'>
        {account?.token &&
          <>
            <Menu.Item
              name='home'
              active={state === 'home'}
              onClick={() => { handleMenu('home') }}
              style={{ marginLeft: 10 }}
            />
            <Menu.Item
              name='Feed'
              active={state === 'Feed'}
              onClick={() => { handleMenu('Feed') }}
            />
            <Menu.Item
              name='Create New'
              active={state === 'Create New'}
              onClick={() => { handleMenu('Create New') }}>
              {/* <Button positive as={Link} to='/users/add'>Create New</Button> */}
            </Menu.Item>

            <Menu.Item position='right'>
              <Image src={'/assets/user.png'} avatar spaced='right' />
              <Dropdown pointing='top right' text={account?.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={'/users'} text='Feed' icon='user' />
                  <Dropdown.Item onClick={handleLogout} text='Logout' icon='power' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </>
        }

        {/* {!account &&
          <>
            <Menu.Item
              position='right'
              name='Login'
              active={state === 'Login'}
              onClick={() => { handleMenu('Login') }}
            />
            <Menu.Item
              name='Sign In'
              active={state === 'Sign In'}
              onClick={() => { handleMenu('Sign In') }}
            />
          </>
        } */}

      </Menu>
    </Segment>
  )
})
