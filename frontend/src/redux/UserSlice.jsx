import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { persistReducer } from "redux-persist"
import sessionStorage from "redux-persist/lib/storage/session"



export const getGoogleUser = createAsyncThunk("user/getGoogleUser",async()=>{
    const response = await axios.get("http://localhost:3000/auth/user",{withCredentials:true});
    return response.data;
})

 const AuthSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        loading:false,
        error:null
    },

    reducers:{
        SetUser:(state,action)=>{
            state.user = action.payload
        },
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getGoogleUser.pending,(state)=>{
            state.loading = true;
        })

        builder.addCase(getGoogleUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(getGoogleUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

    }
})

export const {SetUser,Setgoogleuser} = AuthSlice.actions
 const persistConfig = {
    key:"user",
    storage:sessionStorage
}
 const persistedReducer = persistReducer(persistConfig,AuthSlice.reducer)
 export default persistedReducer;