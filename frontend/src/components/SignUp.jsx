
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import GoogleIcon from '@mui/icons-material/Google';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getGoogleUser } from '@/redux/UserSlice';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,loading} = useSelector((state)=>state.user);  
    console.log("user",user);
    const { register, handleSubmit, formState: { errors } } = useForm();

    
  
    const handleGoogleLogin = async ()=>{
        try {
            window.open("http://localhost:3000/auth/google","_self"); 
        } catch (error) {
            console.log("google authentication error",error);
            
        }
    }

    const onSubmit = async (data) => {
        const userinfo = {
            name:data.name,
            email:data.email,
            password:data.password,
            businessname:data.businessname
        }


         try {
            const response = await axios.post("http://localhost:3000/user/signup",userinfo,{withCredentials:true});
            if(response &&response.data){
                toast.success(response.data.message || "Signup successful");
                navigate("/login");
            }
            

         } catch (error) {
            // console.log("signup error",error.response.data.message);
            toast.error(error.response.data.message || "Error");
         } 
      };

      useEffect(()=>{
        dispatch(getGoogleUser());
      },[dispatch])

      useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
      },[user,navigate])

  return (
    <div className=' py-8 sm:p-10 '>
    <div className='text-left font-[600] text-2xl sm:text-[2rem] sm:p-2 '> 
        BIZBOT
    </div>
    <div className='flex justify-center items-center mt-12 px-5 '>
    <div className='flex flex-col gap-4  p-2 '>
              <div className='flex flex-col gap-4   '>
              <div className='flex flex-col gap-4  p-2 '>
               <p className='text-3xl sm:text-[2.5rem] font-bold  text-blue-950 '>Sign up for free/sign in</p>
                <span className='text-gray-500 text-base font-[400]'>Signup to get 100 free AI conversations.</span>
            </div>
            <div className=''>
                <Button type="button" onClick={handleGoogleLogin} className='w-full items-center  sm:h-[50px] '><GoogleIcon className='mr-2' />Sign up with Google</Button>
            </div>
            <div className=' flex justify-center items-center  gap-2'>
                <p className='w-8 md:w-[30%] h-[1px] bg-[#414141]'></p>
                <p className='text-gray-500 text-base font-[400]'>OR</p>
                <p className='w-8 md:w-[30%] h-[1px] bg-[#414141]'></p>
               </div>

              </div>
              
               <form onSubmit={handleSubmit(onSubmit)} className=' w-full justify-center flex gap-8 flex-col max-w-[700px] p-5 sm:p-10 '>
           
            <div className='flex flex-col gap-2 '>
                <label className='text-gray-500 text-base font-[400]'>Name</label>
                <input type="text" className='h-[50px] w-full border p-2 rounded-md mt-2' placeholder='Enter your name' {...register("name", { required: true })} />
                {errors.name && <div className="text-red-500">This field is required</div>}
                <label className='text-gray-500 text-base font-[400]'>Email</label>
                <input type="text" className='h-[50px] w-full border p-2 rounded-md mt-2' placeholder='Enter your email address' {...register("email", { required: true })} />
                {errors.email && <div className="text-red-500">This field is required</div>}
                <label className='text-gray-500 text-base font-[400]'>Password</label>
                <input type="password" className='h-[50px] w-full border p-2 rounded-md mt-2' placeholder='Enter your password' {...register("password", { required: true })} />
                {errors.password && <div className="text-red-500">This field is required</div>}
                <label className='text-gray-500 text-base font-[400]'>Business Name</label>
                <input type="text" className='h-[50px] w-full border p-2 rounded-md mt-2' placeholder='Enter your business name'{...register("businessname", { required: true })} />

                {errors.businessname && <div className="text-red-500">This field is required</div>}
                <div className='flex mt-2 justify-between'>
                    <p className='text-gray-500'>Already have a account ?</p>
                    <NavLink to="/login">Login</NavLink>
                </div>
                <Button type="submit" className='w-full mt-4 items-center  sm:h-[50px] '>
                    Signup </Button>
            </div>

        </form>

               </div>
               
    

         
    </div>
  
</div>
  )
}

export default SignUp
