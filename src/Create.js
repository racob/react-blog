import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Card, Container, Form, Button } from 'react-bootstrap';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isPending, setIsPending] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const navStack = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handling submit');
        setIsPending(true);
        const newBlog = {title, body, author};
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBlog)
        }).then(() => {
            setSubmit(true);
            setTimeout(() => {navStack.push('/')}, 2000);
        })
    };

    return (
        <Container className='my-3'>
            { submitted && <Alert variant='success' className='mt-5'>The new blog is successfuly posted! Returning to home page...</Alert> }
            <h1>Create a new blog</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={!isPending ? handleSubmit : null}>
                        <Form.Group>
                            <Form.Label>New blog title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a new title for your blog..." 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isPending}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Choose author</Form.Label>
                            <Form.Control 
                                as="select"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                                disabled={isPending}
                            >
                                <option>Mario</option>
                                <option>Luigi</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Blog body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={12}
                                placeholder="Write your blog here..."
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                disabled={isPending}
                                required
                            />
                        </Form.Group>
                        <Button 
                            variant="primary"
                            type="submit"
                            className='float-right'
                            disabled={isPending}
                        >
                            {isPending ? 'Posting...' : 'Post blog'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Create;