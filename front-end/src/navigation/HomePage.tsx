import { Fragment } from "react";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { history } from "..";
import LoginForm from "../account/LoginForm";
import { useStore } from "../stores/store";


export default function HomePage(){
    const {accountStore, modalStore} = useStore();
    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted size="huge">
                    Users manager
                </Header>
                {!accountStore.account ? 
                (
                <Fragment>
                <div>
                <Button content='Log In' onClick={() => modalStore.openModal(<LoginForm/>)}/>
                <Header inverted>Or</Header>    
                <Button content='Sign In'/>
                </div>
                </Fragment>)
                :
                <Button onClick={() => {history.push('/users')}} content='Go to Feed'/>}
            </Container>
        </Segment>
    )
}