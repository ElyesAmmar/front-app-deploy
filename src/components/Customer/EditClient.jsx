import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch,useSelector } from 'react-redux';
import { deleteClient, getClients, updateClient } from '../../JS/actions/clients';
import axios from 'axios';

function EditClient({id}) {
  const user = useSelector((state)=> state.userReducer.user)
  const [show, setShow] = useState(false);
  const dispatch= useDispatch()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [client, setClient] = useState({});
  const [update, setUpdate] = useState({})
   

const Open= async()=>{
    try {
      let result = await axios.get(`/api/clients/client/${id}`)
      setClient(result.data.response)
      
    } catch (error) {
      console.log(error)
    }
}
const handleChange=(e)=>{
    setUpdate({...update,[e.target.name]:e.target.value})
    console.log(update)
}
const Edit = () =>{
    console.log(id,update)
    dispatch(updateClient(user.UserID,id,update));
    
}
const Delete = () =>{
    dispatch(deleteClient(user.UserID,id))

}
  return (
    <>
      <Button variant="outline-secondary" style={{width:"90px"}} onClick={()=>{handleShow();Open()}}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
        <Form.Group className="mb-3" >
        <Form.Label>Name : {client.Name}</Form.Label>
        <Form.Control type="text"  name='Name' onChange={handleChange}/>
                </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Email : {client.Email} </Form.Label>
        <Form.Control type="text" name='Email' onChange={handleChange} />
                </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Address : {client.Address} </Form.Label>
        <Form.Control type="text" name='Address' onChange={handleChange} />
                </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Company : {client.Company} </Form.Label>
        <Form.Control type="text" name='Company' onChange={handleChange} />
                </Form.Group>

        <Form.Group className="mb-3" >
        <Form.Label>Phone : {client.Phone} </Form.Label>
        <Form.Control type="text" name='Phone' onChange={handleChange} />
                </Form.Group>
            </Form>


        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={()=>{Delete();handleClose()}}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={()=>{handleClose();Edit()}}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditClient ;