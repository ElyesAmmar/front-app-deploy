import React, { useState,useEffect } from 'react';
import { Button, Table} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../JS/actions/products'
import {SaveOrder, sendMailOrder } from '../../JS/actions/order'
import AddOrderForm from './AddOrderForm';
import { useNavigate } from "react-router-dom";
import { addProductsOrder} from '../../JS/actions/order'

function MakeOrder() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const product = useSelector((state)=> state.productReducer.product)
  const products = useSelector((state)=> state.orderReducer.products)
  const client = useSelector((state)=> state.orderReducer.client)
  const user = useSelector((state)=> state.userReducer.user)

  const currentOrder = products.map(item => ({ ...item }));
  const reducedTab = currentOrder.reduce((accumulator,current)=>{
    const existingItem = accumulator.find((item)=> item.Name === current.Name);
    if(existingItem){
      existingItem.Quantity+= current.Quantity
      existingItem.TotalPrice += current.TotalPrice
    }else{
      accumulator.push(current);
    }
    return accumulator;
  },[])
  
  const productsOrder = reducedTab.map((prod)=> {return {Name: prod.Name , Quantity: prod.Quantity ,TotalCost:prod.TotalCost, 
                                                        Cost: prod.Cost, Price: prod.Price , TotalPrice: prod.TotalPrice  }})
  
  

  //method 1 for totalPrice
  const TotalPrice = () => {
    return products.reduce((total, product) => {
      return total + (product.Price * product.Quantity);
    }, 0);
  };
  //method 2 for totalPrice
 const TotalCost=()=>{
  let T = 0
  products.map((prod)=>
  T=T+prod.TotalCost
  )
  return T
}
// add data to order
  const saveOrder =() =>{
    dispatch(SaveOrder(user.UserID,{user,order:{OrderClient: client, Products: productsOrder, TotalCost:TotalCost(), TotalPrice: TotalPrice()}}));
  }
// update Stock 
const updateStockProduct = () =>{
      products.map((prod)=>dispatch(updateProduct(prod.mongoId, {Stock: prod.Stock-prod.Quantity})))
  
}

const handleOrder = () =>{
  if(Object.keys(client).length === 0){
    alert('client is required')
  }else if(products.length === 0){
    alert('products are required')
  }else{
    updateStockProduct();
    saveOrder();
    navigate("/dashboard/Orders")
  }
}

return (
  <div style={{marginTop:'30px'}}>
    <div style={{textAlign:'center'}}>
    <AddOrderForm />
    </div>
    <div className='client' style={{paddingLeft:'300px'}}>
          <h2>Customer</h2><br/>
          <p> Name : {client.Name} <br/>
             Company : {client.Company} <br/> 
             Address : {client.Address} <br/>
             Phone : {client.Phone} </p>
    </div>
    <div>
    <Button 
    variant="primary" 
    style={{width:'200px', marginLeft:'800px'} }
    onClick={handleOrder}>
            Save Order
      </Button>
    </div>
    
    <div className='ordertable' >
      
      <div> 
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>U.P</th>
          <th>Total</th>
        </tr>
      </thead>
  
      <tbody>
      {reducedTab.map((prod)=>
        <tr key={prod.Id} >
          <td>P-{prod.Id}</td>
          <td>{prod.Name}</td>
          {/* <td style={{width:'60px'}}><Form.Control type='number' onChange={(e)=>totalPriceProduct( e.target.value)} ></Form.Control></td> */}
          <td>
            {/* <Form.Control style={{width:'60px'}} 
          type='number' 
          onChange={(e)=> {setreducedTab([...products,{...prod, Quantity: e.target.value}])} }>

          </Form.Control> */}
          
            {prod.Quantity}</td>
          <td>{prod.Price}</td>
          <td>{prod.Price * prod.Quantity }</td>
          {/* <CloseButton onClick={()=> setProducts(products.splice(2,1))} /> */}
          </tr>
        )}
        <tr>
          <td colSpan={4} style={{fontWeight:'bold'}}>Total</td>
          <td>{TotalPrice()} TND</td>
        </tr>
      </tbody>
    </Table>
      </div>

    </div>
    </div>
  );
}

export default MakeOrder;


