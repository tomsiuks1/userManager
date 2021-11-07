import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { Button, Icon, Table } from "semantic-ui-react";
import AddUserForm from "./forms/AddUserForm"; 
import { useStore } from "./stores/store";


export default observer(function ListData() {
    const { userStore, modalStore } = useStore();
    const history = useHistory();

    const routeChange = (id: number) => {
        let path = `/users/details/${id}`;
        history.push(path);
    }

    return (
        <>
            <Table compact selectable>
                <Table.Header>
                    <Table.Row >
                        <Table.HeaderCell />
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>User Id</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Body</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {userStore.users.map(user =>
                        <Table.Row key={user.id} onClick={() => { routeChange(user.id) }}>
                            <Table.Cell collapsing />
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.userId}</Table.Cell>
                            <Table.Cell>{user.title}</Table.Cell>
                            <Table.Cell>{user.body}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <Button onClick={() => modalStore.openModal(<AddUserForm />)}
                                floated='left'
                                icon
                                labelPosition='left'
                                primary
                                size='small'>
                                <Icon name='user' /> Add User
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    )
})