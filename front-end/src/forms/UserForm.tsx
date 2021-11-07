import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { User } from '../data/user';
import { useStore } from '../stores/store';
import NumberInput from './inputs/NumberInput';
import TextInput from './inputs/TextInput';



export default function UserForm() {
    const { userStore } = useStore();
    const { addUser, updateUser } = userStore;
    const [user] = useState<User>({
        id: 0,
        userId: NaN,
        title: '',
        body: ''
    });

    const ValidateUser = Yup.object({
        userId: Yup.number().required('User Id is required!'),
        title: Yup.string().required('Title is required!'),
        body: Yup.string().required('Body is required!'),
    }) 

    function handleFormSubmit(user: User) {
        // user.id ? updateUser(user) : addUser(user);
        if(user.id > 0){
            updateUser(user);
        } else{
            user.id = userStore.users.length + 1;
            addUser(user);
        }
    }

    return (
        <Segment clearing>
            <Header content='User Details' sub color='teal' />
            <Formik enableReinitialize initialValues={user} validationSchema={ValidateUser}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit}>
                        <NumberInput name='userId' placeholder='User Id' />
                        <TextInput name='title' placeholder='Title' />
                        <TextInput name='body' placeholder='Body' />

                        <Button disabled={isSubmitting || !dirty || !isValid} 
                        floated='right' postivie type='submit' content='Submit'/>
                        <Button as={Link} to='/users' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

