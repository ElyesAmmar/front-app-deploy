import {USER_LOGIN, USER_LOGOUT, USER_REGISTER, LOAD_USER, AUTH_ERRORS, GET_AUTH_USER} from '../constant/actionsTypes'

const initialeState = {
    isLoading : false,
    user:{},
    isAuth: false,
    msg: ''
}


export const userReducer = (state= initialeState, {type, payload})=>{
    
    switch (type) {
        case USER_REGISTER:
            localStorage.setItem("token", payload.token)
            return {... state, isLoading:false, isAuth:true, user: payload.user, msg:payload.msg}
        case USER_LOGIN:
            localStorage.setItem("token", payload.token)
           return {... state, isLoading:false, isAuth:true, user: payload.user, msg:payload.msg}
        case GET_AUTH_USER:
            return {...state, isLoading:false, isAuth: true, user: payload.user}  
        case LOAD_USER:
            return {...state, isLoading:true}
        case USER_LOGOUT:
            localStorage.removeItem("token")
            return {...state, isLoading:false, isAuth: false, user: {}, msg:""}
        default:
            return state;
    }
}

