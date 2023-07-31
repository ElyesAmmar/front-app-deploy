import { GET_PRODUCT_LOAD, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, GET_ONEPRODUCT_SUCCESS, POST_PRODUCT_FAIL,
        GET_ONEPRODUCT_FAIL, POST_PRODUCT_SUCCESS, 
        GET_PRODUCT_BY_BARCODE, SEARCH_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, FILTER_PRODUCT_CATEGORY} from "../constant/actionsTypes";
import axios from "axios"
import { toast } from 'react-toastify';
import { addProductsOrder } from "../../JS/actions/order";

const reactToastSucess = (msg)=>{
    toast.success(msg, {
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

export const getProducts =(userid)=> async (dispatch)=> {
    
    dispatch({type:GET_PRODUCT_LOAD})
    try {
        let result = await axios.get(`/api/products/${userid}`)
        
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: result.data.response
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
}

export const postProduct =(userid,newproduct)=> async (dispatch)=> {
    
    try {
            let result = await axios.post(`/api/products/addproduct/${userid}`, newproduct )
           
        dispatch({
            type: POST_PRODUCT_SUCCESS,
            payload: result.data.msg
        })
        reactToastSucess(result.data.msg)
    } catch (error) {
        // console.log(error)
        // console.log(error.response.data.msg)
        dispatch({
            type: POST_PRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }
    dispatch(getProducts(userid))
}

export const getProductById =(id)=> async(dispatch)=>{
    
    console.log(id)
    try {
        let result = await axios.get(`/api/products/product/${id.id}`)
        
        dispatch({
            type: GET_ONEPRODUCT_SUCCESS,
            payload: result.data.response
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_ONEPRODUCT_FAIL,
            payload: error.response.data.msg
        })
    }

}

export const findProductByBarcode = (userid,barcode,quantity)=> async(dispatch)=>{
    try {
        let result = await axios.get(`/api/products/products/${userid}`, {params : {Barcode:barcode}})
        let product = result.data.response[0]
        console.log('actions', product,barcode,quantity)
        dispatch(addProductsOrder({mongoId: product._id, Id:product.ProductId,Quantity:Number(quantity),
            Stock:product.Stock, Cost: product.Cost, Name: product.Name, Price:product.Price, TotalPrice: product.Price*Number(quantity), TotalCost:product.Cost*Number(quantity)}))
        dispatch({
            type : GET_PRODUCT_BY_BARCODE,
            payload : result.data.response
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct= (userid,id,update) => async(dispatch)=>{
    try {
        
       let result =  await axios.put(`/api/products/edit/${id}`, update )
        dispatch({
            type: UPDATE_PRODUCT,
            payload: result.data.msg
        })
        reactToastSucess(result.data.msg)
    } catch (error) {
     console.log(error)
        
    }
    dispatch(getProducts(userid))
}

export const deleteProduct = (userid,id) => async(dispatch)=>{
    try {
        let result = await axios.delete(`/api/products/delete/${id}`)
        dispatch({
            type: DELETE_PRODUCT,
            payload: result.data.msg
        })
        reactToastSucess(result.data.msg)
      } catch (error) {
        console.log(error)
      }
      dispatch(getProducts(userid))
}

export const searchP =(input)=>{
    return {
        type : SEARCH_PRODUCT,
        payload: input
    }
}
export const FilterByCategorie =(input)=>{
    console.log(input)
    return {
        type : FILTER_PRODUCT_CATEGORY,
        payload: input
    }
}




