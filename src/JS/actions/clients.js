import {GET_CLIENTS_LOAD, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL, POST_CLIENT_SUCCESS, POST_CLIENT_FAIL,GET_ONECLIENT,UPDATE_CLIENT, DELETE_CLIENT, SEARCH_CLIENT} from '../constant/actionsTypes'
import axios from 'axios'
import { toast } from 'react-toastify';

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

export const getClients=(userid)=> async(dispatch)=>{
    dispatch({
        type:GET_CLIENTS_LOAD
    })
    try {
        const result = await axios.get(`/api/clients/${userid}`)
        dispatch({
            type:GET_CLIENTS_SUCCESS,
            payload:result.data.response
        })
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_CLIENTS_FAIL,
            payload: error
        })
    }

}

export const postClient =(userid,client)=> async(dispatch)=>{
    try {
        let result = await axios.post(`/api/clients/addclient/${userid}`, client)

        dispatch({
            type: POST_CLIENT_SUCCESS,
            payload: result.data.msg
        })
        reactToastSucess(result.data.msg)
    } catch (error) {
        console.log(error)
        dispatch({
            type: POST_CLIENT_FAIL,
            payload: error
        })
        
        
    }
    dispatch(getClients(userid))
}

export const getOneClient =(id) => async (dispatch)=>{
    try {
        let client = await axios.get(`/api/clients/cleint${id}`)
        dispatch({
            type: GET_ONECLIENT,
            payload: client.data.response
        })
    } catch (error) {
        console.log(error)    
    }
}

export const updateClient = (userid,id, client)=> async(dispatch)=>{
    try {
        let result = await axios.put(`/api/clients/edit/${id}`, client)
        dispatch({
            type: UPDATE_CLIENT,
            payload: result.data.msg
        })
        reactToastSucess(result.data.msg)
        dispatch(getClients(userid))
    } catch (error) {
        console.log(error)
        
    }

}

export const deleteClient= (userid,id)=> async(dispatch)=>{
    try {
        let result = await axios.delete(`/api/clients/delete/${id}`)
        dispatch({
            type: DELETE_CLIENT,
            payload: result.data.msg
        })
        reactToastSucess(result.data.msg)
        dispatch(getClients(userid))
    } catch (error) {
        console.log(error)
    }
    
}

export const searchClient = (input) => {
    return {
        type: SEARCH_CLIENT,
        payload: input

    }
}