import { useState } from "react";
import { Container, Alert, Row, Col, Button, Modal} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import useFetch from './useFetch';

const BlogDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const { id } = useParams();
    const { data: blog, isPending, error} = useFetch('http://localhost:8000/blogs/' + id);
    const navStack = useHistory();
    
    
    const toggleModal = () => {
        setShowModal(!showModal);
        console.log(showModal);
    };

    const deletePost = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            setDeleted(true);
            toggleModal();
            setTimeout(() => {
                navStack.push('/');
            },2000);
            
        })
    };

    return(
        <Container className='my-5'>
            { deleted && <Alert variant='success' className='mt-5'>The blog has been deleted successfuly!</Alert> }
            { error && <Alert variant='danger' className='mt-5'>{error}</Alert> }
            { isPending && <h3 className='text-muted' >Loading...</h3> }
            {blog && (
                <Container>
                    <Row>
                        <Col>
                            <h1>{blog.title}</h1>
                            <h5 className="text-muted mb-4">Written by {blog.author}</h5>
                        </Col>
                        <Col>
                            <Button
                                className='float-right'
                                variant='outline-danger'
                                onClick={toggleModal}
                            >Delete post</Button>
                        </Col>
                    </Row>
                    <p>{blog.body}</p>
                </Container>
            )}
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>Delete post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure? The post cannot be recovered once it is deleted.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={toggleModal}>Cancel</Button>
                    <Button variant="outline-danger" onClick={deletePost}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BlogDetails;