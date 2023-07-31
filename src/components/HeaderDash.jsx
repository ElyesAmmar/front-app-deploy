import React from 'react';
import { Link, Outlet } from 'react-router-dom';



function Dash() {
  
  return (
    <div className='dashboard'>
      <div className='header-dashboard'>
      <h1>Dashboard</h1> 
    <div>
      
      <ul className='navbar-dashboard'>
       <li><Link to='products'>Products</Link></li>
        <li><Link to='Customer'> Customers</Link></li>
        <li><Link to='currentOrder'>CurrentOrder</Link></li>
        <li><Link to='Orders'>Orders</Link></li>
      </ul>    
    
    </div>
    </div>
    <Outlet />
    </div>
  );
}

export default Dash;