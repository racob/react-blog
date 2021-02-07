import { Alert, Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const navStack = useHistory();
    const goBack = () => {
        navStack.push('/');
    };
    return (
        <Container className='my-5'>
            <Alert variant='danger'>
                Sorry, the page you're looking for doesn't exist.
                <Alert.Link onClick={goBack}> Click here to go back to the homepage.</Alert.Link>
            </Alert>
        </Container>
    );
};

export default NotFound;