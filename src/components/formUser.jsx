import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from 'react-redux';
import { userRegister } from '../JS/actions/user';



function UserRegiser() {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({FirstName: "", LastName: "", Email: "", Password:""});

const dispatch = useDispatch()

const SaveUser=()=>{
  dispatch(userRegister(user))
}


  return (

    <div  style={{width:'120px'}} >
    <Button variant="secondary" onClick={handleShow} style={{ width:'120px'}}>
        Sign up
      </Button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ragister</Modal.Title>
      </Modal.Header>

      <Modal.Body>
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="Enter First Name" onChange={(e)=> setUser({...user, FirstName:e.target.value}) }  />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Enter Last Name" onChange={(e)=> setUser({...user, LastName:e.target.value}) } />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" onChange={(e)=> setUser({...user, Email:e.target.value}) } />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=> setUser({...user, Password:e.target.value}) }  />
      </Form.Group>

    </Form>
    </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{SaveUser();handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserRegiser;