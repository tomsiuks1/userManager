import { Form, Formik } from "formik";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import TextInput from "../forms/inputs/TextInput";
import { useStore } from "../stores/store";
import * as Yup from 'yup';


export default function RegisterForm(){
    const {modalStore, accountStore} = useStore();
    return(
        <Formik initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
        onSubmit={values => accountStore.register(values).catch(error => console.log(error))}
        validationSchema={Yup.object({
            displayName: Yup.string().required('Display Name is required'),
            username: Yup.string().required('Username is required'),
            email: Yup.string().required('Email is required').email('Not valid email address'),
            password: Yup.string().required(),
        })}>
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h1' content='Account registration' textAlign='center'/>
                    <TextInput name='displayName' placeholder='Display Name' />
                    <TextInput name='username' placeholder='Username' />
                    <TextInput name='email' placeholder='Email' />
                    <TextInput name='password' type='password' placeholder='Password' />
                    {/* <ValidationErrors errors={errors} /> */}

                    <Button disabled={!isValid || !dirty || isSubmitting} type='submit' positive content='Submit!'/>
                    <Button onClick={modalStore.closeModal} basic content='Cancel'/>
                </Form>
            )}
        </Formik>
    )
}