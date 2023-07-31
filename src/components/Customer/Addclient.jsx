import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import {postClient } from '../../JS/actions/clients';

function AddClient() {
  const user = useSelector((state)=> state.userReducer.user)
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const [client, setClient] = useState({Name:'',Email:'',Address:'',Company:'',Phone:''})
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const Add =()=>{
    dispatch(postClient(user.UserID,client));
  }
  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        Add Customer
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
        <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=> setClient({...client,Name:e.target.value})}/>
                </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter Email" onChange={(e)=> setClient({...client,Email:e.target.value})} />
                </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter Address" onChange={(e)=> setClient({...client,Address:e.target.value})} />
                </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Company</Form.Label>
        <Form.Control type="text" placeholder="Enter Company" onChange={(e)=> setClient({...client,Company:e.target.value})} />
                </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Enter Phone" onChange={(e)=> setClient({...client,Phone:e.target.value})} />
                </Form.Group>
            </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{Add();handleClose()}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddClient;