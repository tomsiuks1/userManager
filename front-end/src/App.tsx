import React, { Fragment, useEffect } from 'react';
import './App.css';
import { Route  } from "react-router-dom";
import { useStore } from './stores/store';
import ListData from './ListData';
import AddUserForm from './forms/AddUserForm';
import UserDetails from './UserDetails';
import UpdateUserForm from './forms/UpdateUserForm';
import ModalContainer from './forms/ModalContainer';
import HomePage from './navigation/HomePage';
import LoginForm from './account/LoginForm';
import RegisterForm from './account/RegisterForm';
import { observer } from 'mobx-react-lite';
import { history } from '.';


function App() {
  const { accountStore, serverStore} = useStore();

  useEffect(() => {
    if(serverStore.token){
      accountStore.getUser();
    } else {
      history.push('/');
    }

  }, [serverStore, accountStore])

  return (
    <Fragment>
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/users' component={ListData} />
      <Route exact path='/users/add' component={AddUserForm} /> 
      <Route exact path='/users/details/:id' component={UserDetails} />
      <Route exact path='/users/update/:id' component={UpdateUserForm} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/register' component={RegisterForm} />
      {/* <Route exact path='/'>
        <Redirect to='/' />
      </Route> */}
    </Fragment>
  );
}

export default observer(App);
