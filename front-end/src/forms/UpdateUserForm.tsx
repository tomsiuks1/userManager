import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { User } from "../data/user";
import { useStore } from "../stores/store";

interface Props{
  id: string;
}

export default observer(function UpdateUserForm({id}:Props) {
    const {userStore} = useStore();
    const history = useHistory();
    
    let idnum: number = +id;
    const temp = userStore.users.find(user => user.id === idnum);
    const [user, setUser] = useState<User>({
        id: idnum,
        userId: temp ? temp.userId : NaN,
        title: temp ? temp.title : '',
        body: temp ? temp.body : ''
    });

    function handleClick(){
        let newUser = {
            ...user
        };
        userStore.updateUser(newUser);
        let path = `/users`;
        history.push(path);
    }

    function handleCancel(){
      let path = `/users/details/${id}`
      history.push(path);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setUser({...user, [name]: value})
    };

    return(
        <Form onSubmit={handleClick}>
        <Form.Field>
          <label>User Id</label>
          <Form.Input required type='number' placeholder='User Id' name='userId' value={user.userId} onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Title</label>
          <Form.Input required type='text' placeholder='Title' name='title' value={user.title} onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <Form.Input required type='text' placeholder='Body' name='body' value={user.body} onChange={handleInputChange} />
        </Form.Field>
        <Button color='blue' type='submit'>Submit</Button>
        <Button onClick={handleCancel} floated='left' type='button' basic>Cancel</Button>
      </Form>
    )
})