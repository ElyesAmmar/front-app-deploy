import React, {useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersBar from "./SearchBarOrder";
import { generateInvoice, getOrders }  from "../../JS/actions/order";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Orders(){

const dispatch = useDispatch()
const user = useSelector((state)=> state.userReducer.user)
const orders = useSelector((state)=> state.orderReducer.orders)
const ordersMonth = useSelector((state)=> state.orderReducer.ordersMonth)

 //method 2 for totalPrice
 const TotalOrders=()=>{
  let T = 0
  ordersMonth.map((ord)=>
  T=T+ord.TotalPrice
  )
  return T
}

useEffect(()=>{
   dispatch(getOrders(user.UserID))
},[])

const PrintInvoice = (id) =>{
  dispatch(generateInvoice(id))
}

    return(
        <div className="datatable">
       <OrdersBar />
      
       <Table  striped>
      <thead>
        <tr>
          <th>#</th>
          <th style={{width:'150px'}}>Invoice Number</th>
          <th>Customer</th>
          <th>Company</th>
          <th>Total (TND)</th>
          <th>Date</th>
          <th style={{width:'200px'}}>Print Invoice</th>
        </tr>
      </thead>
      {ordersMonth.length === 0 && orders.slice().reverse().map((ord)=>
        <tbody key={ord._id}>
        <tr >
          <td><Form.Check /></td>
          <td>N°{ord.OrderNum}</td>
          <td>{ord.OrderClient.Name}</td>
          <td>{ord.OrderClient.Company}</td>
          <td>{ord.TotalPrice}</td>
          <td>{`${ord.OrderDate.Day}-${ord.OrderDate.Month}-${ord.OrderDate.Year}`}</td>
          <td><Button variant="secondary" onClick={()=>PrintInvoice(ord._id)  }>Print Invoice</Button></td>
        
        </tr>
         </tbody>
      )}
      
        <tbody >
        {ordersMonth.length > 0 && ordersMonth.slice().reverse().map((ord)=>
        <tr key={ord._id} >
          <td><Form.Check /></td>
          <td>N°{ord.OrderNum}</td>
          <td>{ord.OrderClient.Name}</td>
          <td>{ord.OrderClient.Company}</td>
          <td>{ord.TotalPrice}</td>
          <td>{`${ord.OrderDate.Day}-${ord.OrderDate.Month}-${ord.OrderDate.Year}`}</td>
          <td><Button variant="secondary" onClick={()=>PrintInvoice(ord._id)  }>Print Invoice</Button></td>
        </tr>
        )}
        {ordersMonth.length > 0 && <tr>
          <td colSpan={4} style={{fontWeight:'bold', textAlign:'center'}}>Total</td>
          <td>{TotalOrders()} TND</td>
        </tr>}
        
         </tbody>
    </Table>
        </div>
    )



}

export default Orders;