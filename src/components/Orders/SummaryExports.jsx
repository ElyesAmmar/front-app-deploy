import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

function SummaryExports() {
  const [show, setShow] = useState(false);
  const orders = useSelector((state)=> state.orderReducer.ordersMonth)
  const [products, setProducts] = useState([])
  const [reducedProducts, setReducedProducts] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showProducts, setShowProducts] = useState(false);
  console.log(orders)
 //method 2 for totalPrice
 const TotalOrders=()=>{
  let T = 0
  orders.map((ord)=>
  T=T+ord.TotalPrice
  )
  return T
}

//method 2 for totalCost
const TotalCost=()=>{
  let T = 0
  orders.map((ord)=>
  T=T+ord.TotalCost
  )
  return T
}

const getProducts = ()=>{
    orders.map((ord)=> ord.Products.map((prod)=>
        setProducts((prevProd)=>[...prevProd, prod ])
    ))
    console.log(products)
}

useEffect(()=>{
  const reducedTab = products.reduce((accumulator,current)=>{
    const existingItem = accumulator.find((item)=> item.Name === current.Name);
    if(existingItem){
      existingItem.Quantity+= current.Quantity
      existingItem.TotalPrice += current.TotalPrice
    }else{
      accumulator.push(current);
    }
    return accumulator;
  },[])
  setReducedProducts(reducedTab)
},[products])

  return (
    <>
      <Button variant="light" style={{marginLeft:'20px'}} onClick={handleShow}>
        Summary Export 
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
          <Button variant="secondary" style={{marginLeft:'20px'}} onClick={()=>{setShowProducts(true);getProducts()}}>
        Export Products
      </Button>
        </Modal.Header>
        <Modal.Body>
        {showProducts && 
      <Table striped bordered hover>
      <thead>
        <tr>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Cost</th>
        <th>Total Cost</th>
        <th>Price</th>
        <th>Total Price</th>
        <th>Income</th>
        <th>Income %</th>
      </tr>
      </thead>
      <tbody>
      {reducedProducts.map((p)=>
      <tr>
        <td>{p.Name}</td>
        <td>{p.Quantity}</td>
        <td>{p.Cost}</td>
        <td>{p.Cost*p.Quantity}</td>
        <td>{p.Price}</td>
        <td>{p.TotalPrice}</td>
        <td>{p.TotalPrice-(p.Quantity*p.Cost)}</td>
        <td>{(((p.Cost*p.Quantity)/p.TotalPrice)*100).toFixed(3)} %</td>
      </tr>
      )}
        </tbody>
   </Table>
    }
        <Table striped bordered hover>
      <thead>
        <tr>
        <th style={{width:'150px'}}>Invoice Number</th>
          <th>Customer</th>
          <th>Company</th>
          <th>Total Cost (TND)</th>
          <th>Total Price (TND)</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((ord)=>
      <tr key={ord._id} >
          <td>N°{ord.OrderNum}</td>
          <td>{ord.OrderClient.Name}</td>
          <td>{ord.OrderClient.Company}</td>
          <td>{ord.TotalCost}</td>
          <td>{ord.TotalPrice}</td>
          <td>{`${ord.OrderDate.Day}-${ord.OrderDate.Month}-${ord.OrderDate.Year}`}</td>
        </tr>
        )}
        <tr>
          <th colSpan={3} style={{textAlign:'center'}}>Total:</th>
          <td style={{textAlign:'center'}}>{TotalCost()}  TND</td>
          <td style={{textAlign:'center'}}>{TotalOrders()}  TND</td>
        </tr>
        <tr>
          <th colSpan={3} style={{textAlign:'center'}}>Income:</th>
          <td colSpan={2} style={{textAlign:'center'}}>{TotalOrders()-TotalCost()}  TND</td>
        </tr>
      </tbody>
    </Table>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SummaryExports;