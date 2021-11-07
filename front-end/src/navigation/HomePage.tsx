import { Container, Header, Segment } from "semantic-ui-react";


export default function HomePage(){
    return(
        <Segment inverted textAlign='center' vertical>
            <Container text>
                <Header as='h1' inverted>
                    Users Manager
                </Header>
            </Container>
        </Segment>
    )
}