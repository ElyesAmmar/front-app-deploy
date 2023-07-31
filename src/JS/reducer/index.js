import {combineReducers} from "redux"
import { productReducer} from "./productReducer"
import {clientReducer } from "./clientReducer"
import {orderReducer} from "./orderReducer"
import { userReducer } from "./userReducer"




const rootReducer = combineReducers({productReducer, clientReducer,orderReducer, userReducer});


export default rootReducer;