import {Card, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogList = ({blogs, title, handleDelete}) => {
    return (
        <Container>
            <h1>{title}</h1>
            {blogs.map((blog) => (
                <Card key={blog.id} className="my-3">
                    <Link to={`/blog/${blog.id}`} className='text-decoration-none'>
                        <Card.Body>
                            <Card.Title>{blog.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Written by {blog.author}</Card.Subtitle>
                            <Card.Text className="text-dark">{blog.body}</Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
            ))}
        </Container>
    );
}

export default BlogList;