import React, { Fragment, useEffect } from 'react';
import './App.css';
import { Route  } from "react-router-dom";
import { useStore } from './stores/store';
import ListData from './ListData';
import AddUserForm from './forms/AddUserForm';
import UserDetails from './UserDetails';
import UpdateUserForm from './forms/UpdateUserForm';
import NavBar from './navigation/NavBar';
import ModalContainer from './forms/ModalContainer';
import HomePage from './navigation/HomePage';


function App() {
  const {userStore} = useStore();

  useEffect(() => {
    userStore.loadUsers();
    console.log('render');
  }, [userStore, userStore.users])

  return (
    <Fragment>
      <NavBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/users' component={ListData} />
      <Route exact path='/users/add' component={AddUserForm} /> 
      <Route exact path='/users/details/:id' component={UserDetails} />
      <Route exact path='/users/update/:id' component={UpdateUserForm} />
      {/* <Route exact path='/'>
        <Redirect to='/users' />
      </Route> */}
    </Fragment>
  );
}

export default App;
