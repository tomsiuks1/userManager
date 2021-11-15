import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface Props{
    id: string;
}

export default observer(function ConfirmForm({id}: Props){
    const {userStore, modalStore} = useStore();
    const {deleteUser} = userStore;
    const history = useHistory();
    
    function handleDelete(){
        if(id){
            deleteUser(id);
        }
        let path = '/users';
        history.push(path);
    }

    return(
        <Segment textAlign='center' basic>
        <Form onSubmit={handleDelete}>
            <Header>Are you sure you want to delete this User?</Header>
            <Form.Field>
                <Button content='No' basic onClick={() => modalStore.closeModal()} />
                <Button content='Yes' color='blue' type='submit' />
            </Form.Field>
        </Form>
        </Segment>
    )
})