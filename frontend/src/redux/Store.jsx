import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import sessionStorage from "redux-persist/es/storage/session"
import { combineReducers } from "redux"
import AuthReducer from "../redux/UserSlice"

const userPersistConfig={
    key:"user",
    storage:sessionStorage,
}


const persisteduserreducer = persistReducer(userPersistConfig,AuthReducer)

const rootReducer = combineReducers({user:persisteduserreducer})
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false
    })

})

export const persistor = persistStore(store)