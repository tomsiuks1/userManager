import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import TextInput from "../forms/inputs/TextInput";
import { store, useStore } from "../stores/store";
import RegisterForm from "./RegisterForm";


export default observer(function LoginForm() {
    const {modalStore} = useStore();

    return(
        <Formik initialValues={{email: '', password: '', error: null}}
        onSubmit={values => store.accountStore.login(values).catch(error => console.log(error))}>
            {({handleSubmit}) => ( 
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='false'>
                    <Header as='h1' content='Login' textAlign='center'/>
                    <TextInput name='email' placeholder='Email'/>
                    <TextInput name='password' placeholder='Password' type='password'/>
                    <Button positive content='login' type='submit' fluid/>
                    <Button style={{marginTop: 10}} fluid basic content='Sign In' 
                    onClick={() => modalStore.openModal(<RegisterForm />)}/>
                </Form>
            )}
        </Formik> 
    )
})