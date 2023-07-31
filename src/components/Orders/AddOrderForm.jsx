import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import { Form, Button, Row, Col, Table} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { findProductByBarcode } from '../../JS/actions/products';
import { useSelector } from 'react-redux';

function AddOrderForm() {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.userReducer.user)
  const [ProductName, setProductName] = useState('')
  const [Barcode, setBarcode] = useState('')
  const product = useSelector((state)=> state.productReducer.product)
  const [pro , setPro] = useState({})
  const [clientName, setClientName] = useState('')
  const [Quantity, setQuantity] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  const getproduct =(event)=>{
    console.log("event((((")
    event.preventDefault();
      dispatch(findProductByBarcode(user.UserID,Barcode,Quantity))
      handleClose()
  }

// useEffect(()=>{
//   setPro({...pro,...product})
//   dispatch(addProductsOrder({...pro,TotalPrice: pro.Price*pro.Quantity,TotalCost:pro.Cost*pro.Quantity}))
// },[product])

// useEffect(()=>{
//   setPro({...pro,Quantity:Quantity})
// },[Quantity])

// console.log(pro)

// const addingProduct = () =>{
//   dispatch(addProductsOrder({...pro,TotalPrice: pro.Price*pro.Quantity,TotalCost:pro.Cost*pro.Quantity}))
// }

  return (
    <>
      <Button variant="secondary" style={{width:'300px'}} onClick={handleShow}>
        Add An Order
      </Button>

      <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='order-form'>

{/* <div >
  <Form.Label>Add Customer</Form.Label><br/>
  <Form.Control 
  style={{width:'450px'}} 
  onChange={(e)=>setClientName(e.target.value)} 
  />
</div> */}
  <div style={{width:'450px', marginTop:'10px'}}>
  <Form onSubmit={getproduct}>
    <Row>
    <Col>
      <Form.Label>Product Barcode</Form.Label><br/>
      <Form.Control style={{width:'350px'}}  onChange={(e)=>setBarcode(Number(e.target.value))} />   
      {/* <input type='submit'  value='submit'></input> */}
    </Col>
    <Col>
      <Form.Label>Quantity</Form.Label><br/>
      <Form.Control type='number'  style={{width:'70px'}} onChange={(e)=>setQuantity(Number(e.target.value))} />
    </Col>
    </Row>
    <Col>
      <Form.Control type='submit' value="submit"  style={{width:'70px'}}  />
    </Col>
    </Form>
    </div>
 </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Save Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  
  );
}

export default AddOrderForm;
