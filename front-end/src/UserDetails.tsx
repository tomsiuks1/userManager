import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import ConfirmForm from "./confirmation/ConfirmForm";
import UpdateUserForm from "./forms/UpdateUserForm";
import NavBar from "./navigation/NavBar";
import { useStore } from "./stores/store"


export default observer(function UserDetails() {
    const {id} = useParams<{id: string}>();
    const {userStore, modalStore} = useStore();
    const {loadUser, user} = userStore;

    useEffect(() => {
        if(id){
            loadUser(id);
        }
    }, [id, loadUser])

    return(
        <>
        <NavBar />
        <Table compact style={{marginTop: 20}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>User Id</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Body</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing>
                        </Table.Cell>
                        <Table.Cell>{user?.id}</Table.Cell>
                        <Table.Cell>{user?.userId}</Table.Cell>
                        <Table.Cell>{user?.title}</Table.Cell>
                        <Table.Cell>{user?.body}</Table.Cell>
                    </Table.Row>
                
            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='4'>
                        <Button as={Link} to='/users'
                            floated='left'
                            size='small'
                            color='blue'
                        > Back to list
                        </Button>
                        <Button
                            onClick={() => modalStore.openModal(<UpdateUserForm id={id}/>)}
                            floated='left'
                            size='small'
                            color='grey'
                        > Update User
                        </Button>
                        <Button
                            floated='left'
                            size='small'
                            color='red' onClick={() => modalStore.openModal(<ConfirmForm id={id}/>)}
                        > Delete User
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        </>
    )
})