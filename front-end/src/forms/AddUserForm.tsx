import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import { User } from "../data/user";
import { useStore } from "../stores/store";


export default observer(function AddUserForm() {
    const {userStore} = useStore();
    const {users} = userStore;
    const history = useHistory();
    
    const [user, setUser] = useState<User>({
        id: users.length + 1, 
        userId: NaN,
        title: '',
        body: ''
    });

    function handleClick(){
        let newUser = {
            ...user
        };
        if(users.find( x => x.id === newUser.id)){
          
        }else {
          userStore.addUser(newUser);
        }
        let path = `/users`;
        history.push(path);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setUser({...user, [name]: value})
    };

    return(
      <Segment clearing basic>
        <Form onSubmit={handleClick}>
        <Form.Field>
          <label>User Id</label>
          <Form.Input required type='number' placeholder='User Id' name='userId' value={user.userId || ''} onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Title</label>
          <Form.Input required type='text' placeholder='Title' name='title' onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <Form.Input required type='text' placeholder='Body' name='body' onChange={handleInputChange} />
        </Form.Field>
        <Button color='blue' type='submit' floated='right'>Submit</Button>
      </Form>
      </Segment>
    )
})