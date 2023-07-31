import { ADD_PRODUCTS_ORDER , ADD_CLIENT_ORDER,SEND_MAIL_ORDER, SAVE_ORDER, GET_ORDERS_LOAD,GET_ORDERS_BY_MONTH, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL, GENERATE_INVOICE } from "../constant/actionsTypes";
import axios from 'axios'
import { toast } from 'react-toastify';



const reactToastSucess = (msg)=>{
    toast.info(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}

export const addProductsOrder = (product)=>{
    let msg = 'product added to order'
    console.log(product)
    reactToastSucess(msg)
    return{
        type:ADD_PRODUCTS_ORDER,
        payload: product    
        
    }
    
}

export const addClientOrder = (client)=>{
    let msg = 'client added to order'
    reactToastSucess(msg)
    return{
        type:ADD_CLIENT_ORDER,
        payload: client
    }     
}

export const SaveOrder = (userid,{user,order}) => async(dispatch)=>{
    try {
        let result = await axios.post(`/api/orders/addorder/${userid}`, order)
        dispatch(sendMailOrder({user, order:result.data.response}))
        dispatch({
            type:SAVE_ORDER,
            payload: result.data.response
        })
        
    } catch (error) {
        console.log(error)
    }
    dispatch(getOrders(userid))
}

export const getOrders = (userid) => async(dispatch)=>{
    dispatch({
        type: GET_ORDERS_LOAD
    })
    try {
        let result = await axios.get(`/api/orders/${userid}`)
        
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: result.data.response
        })
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_ORDERS_FAIL,
            payload: error.response.data.msg
        })
        
    }
}

export const generateInvoice= (id)=> async(dispatch)=>{
    try {
        let result = await axios.get(`/api/orders/invoice/${id}`,{
            responseType: 'blob', // Required to receive a binary response
          });
        console.log(result)
        // Create a URL object from the received binary data
        const pdfUrl = URL.createObjectURL(result.data);

        // Open the PDF in a new tab
        window.open(pdfUrl, '_blank');
        dispatch({
            type: GENERATE_INVOICE,
            payload: result.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const FindOrdersByMonth =(userid,month)=> async(dispatch) =>{
    try {
        const orders = await axios.get(`/api/orders/findorders/${userid}`, {params :{Month:month}})
        dispatch({
            type:GET_ORDERS_BY_MONTH,
            payload: orders.data.response
        })
    } catch (error) {
        console.log(error)
    }
}
export const sendMailOrder =(data) => async(dispatch)=>{
    try {
       let result =  await axios.post('/api/orders/mail', data)
       dispatch({
        type : SEND_MAIL_ORDER,
        payload : result.data
       })
    } catch (error) {
        console.log(error)
    }
}