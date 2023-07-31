import React, { useState } from "react";
import { getProducts } from "../../JS/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SearchProducts from "./SearchBarProduct";
import Table from 'react-bootstrap/Table';
import EditModal from './EditProduct';
import Button from 'react-bootstrap/Button';
import { addProductsOrder } from "../../JS/actions/order";
import Form from 'react-bootstrap/Form';


function Products() {
  const dispatch=useDispatch()
  const products= useSelector((state)=>state.productReducer.products)
  const inputS = useSelector((state)=>state.productReducer.productSearch)
  const inputFilter = useSelector((state)=> state.productReducer.filterInput)
  const user = useSelector((state)=> state.userReducer.user)
  const [Quantity, setQuantity] = useState('')
 
  useEffect(()=> {
    dispatch(getProducts(user.UserID))
},[])

    return(
        
<div className="datatable">
    <SearchProducts />
    <Table className='tableProduct' striped bordered hover size="sm">
      <thead>
        <tr>
        
          <th style={{width:'80px'}}>#</th>
          <th style={{width:'100px'}}>Image</th>
          <th style={{width:'250px'}}>Name</th>
          <th style={{width:'80px'}}>Stock</th>
          <th style={{width:'150px'}}>Price</th>
          <th>Category</th>
          <th style={{width:'120px'}}>Barcode</th>
          <th style={{width:'70px'}}>Edit</th>
          <th style={{width:'120px'}}>add to order</th>
        </tr>
      </thead>

        {products
        .filter((prod)=> prod.Name.toLowerCase().includes(inputS.toLowerCase()))
        .filter((prod)=> prod.Category.toLowerCase().includes(inputFilter.toLowerCase()))
        .map((prod)=> 
      
      <tbody key={prod.ProductId}>
        <tr>
          <td>P-{prod.ProductId}</td>
          <td><img alt="productImage" src={prod.Image} style={{height:'100px',width:'100px'}} /></td>
          <td>{prod.Name}</td>
          <td>{prod.Stock}</td>
          <td>{prod.Price} TND</td>
          <td>{prod.Category}</td>
          <td>{prod.Barcode}</td>
          <td><EditModal id={prod._id} /></td>
          <td>
            <div style={{display:'flex', justifyContent:'space-around'}}>
          <Form.Control style={{width:'60px'}} 
          type='number' 
          onChange={(e)=> {setQuantity(e.target.value);
          } }>

          </Form.Control>
          <Button variant="secondary" 
          onClick={
            ()=> {dispatch(addProductsOrder({mongoId: prod._id, Id:prod.ProductId, TotalPrice: prod.Price*Quantity,
                                            Stock:prod.Stock, Name: prod.Name, Price:prod.Price,
                                            Cost:prod.Cost, TotalCost:prod.Cost*Quantity, Quantity:Number(Quantity)}))}}
          >+</Button>
          
          </div>
          </td>
        </tr>
        
      </tbody>)
      }
    </Table>
        
</div>
    )

}

export default Products;