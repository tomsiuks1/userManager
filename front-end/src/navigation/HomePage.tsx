import { Fragment } from "react";
import { Button, Container, Header, Item, Segment } from "semantic-ui-react";
import { history } from "..";
import LoginForm from "../account/LoginForm";
import RegisterForm from "../account/RegisterForm";
import { useStore } from "../stores/store";


export default function HomePage(){
    const {accountStore, modalStore} = useStore();
    return(
        <Segment inverted textAlign='center' vertical className='MainPage'>
            <Container text>
                <Header as='h1' inverted size="huge">
                    Users manager
                </Header>
                {!accountStore.account ? 
                (
                <Fragment>
                <Item>
                <Button content='Log In' onClick={() => modalStore.openModal(<LoginForm/>)}/>
                <Button positive content='Sign In' onClick={() => modalStore.openModal(<RegisterForm/>)}/>
                </Item>
                </Fragment>)
                :
                <Button onClick={() => {history.push('/users')}} content='Go to Feed'/>}
            </Container>
        </Segment>
    )
}