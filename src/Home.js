import { Alert, Container } from "react-bootstrap";
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
    const {data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');
    
    return(
        <Container className="my-3">
            { error && <Alert variant='danger' className='mt-5'>{error}</Alert> }
            { isPending && <h3 className='text-muted' >Loading...</h3> }
            {blogs && <BlogList blogs={blogs} title="All Blogs" /> /*conditional templating*/}
        </Container>
    );
}

export default Home;