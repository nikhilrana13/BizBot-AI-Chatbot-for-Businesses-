import React, { useState } from 'react'
import { Button } from './ui/button'
import GoogleIcon from '@mui/icons-material/Google';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector, useDispatch, } from 'react-redux';
import { SetUser,getGoogleUser } from '../redux/UserSlice';
import { useEffect } from 'react';


const Login = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    // console.log("user",user);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    
    const onSubmit = async(data)=>{
         try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/user/login",data,{withCredentials:true});
            if(response.data){
                console.log("response",response.data.user);
                toast.success(response.data.message || "Login successful");
                dispatch(SetUser(response.data.user));
                navigate("/dashboard/train");
            }
            
         } catch (error) {
            toast.error(error.response.data.message || "failed to login");
            
         } finally{
            setTimeout(()=>{
                setLoading(false);
            },1000)
           
         }
    }
  
    const handleGoogleLogin = async ()=>{
        try {
            window.location.href="http://localhost:3000/auth/google"
            
        } catch (error) {
            console.log("google authentication error",error);
            
        }
    }

    // when google login complete then user will be fetched
       useEffect(()=>{
            dispatch(getGoogleUser());
          },[dispatch,user])

        //   when user is fetched then navigate to dashboard
          useEffect(()=>{
            if(user){
                navigate("/dashboard/train")
            }
          },[user,navigate])
  return (
    <div className=' py-8 sm:p-10 '>
        <div className='text-left font-[600] text-2xl sm:text-[2rem] sm:p-2 '>
            BIZBOT
        </div>
        <div className='flex justify-center items-center mt-12 px-5 '>

                   <div className='flex flex-col gap-4 '>
                   <div className='flex flex-col gap-4 '>
              <div className='flex flex-col gap-4  p-2 '>
               <p className='text-3xl sm:text-[2.5rem] font-bold  text-blue-950 '>Sign up for free/sign in</p>
                <span className='text-gray-500 text-base font-[400]'>Signup to get 100 free AI conversations.</span>
            </div>
            <div className=''>
                <Button type="button" onClick={handleGoogleLogin} className='w-full items-center  sm:h-[50px] '><GoogleIcon className='mr-2' />Sign in with Google</Button>
            </div>
            <div className=' flex justify-center items-center  gap-2'>
                <p className='w-8 md:w-[30%] h-[1px] bg-[#414141]'></p>
                <p className='text-gray-500 text-base font-[400]'>OR</p>
                <p className='w-8 md:w-[30%] h-[1px] bg-[#414141]'></p>
               </div>

              </div>
                <form onSubmit={handleSubmit(onSubmit)} className=' w-full justify-center flex gap-8 flex-col max-w-[700px] p-5 sm:p-10 '>
                <div className='flex flex-col gap-2 '>
                    <label className='text-gray-500 text-base font-[400]'>Email</label>
                    <input type="text" className='h-[50px] w-full border p-2 rounded-md mt-2' placeholder='Enter your email address' {...register("email", { required: true })} />
                    {errors.email && <span className="text-red-500">Email is required</span>}
                    <label className='text-gray-500 text-base font-[400]'>Password</label>
                    <input type="password" className='h-[50px] w-full border p-2 rounded-md mt-2' placeholder='Enter your password' {...register("password", { required: true })} />
                    {errors.password && <span className="text-red-500">Password is required</span>}
             
                    <div className='flex mt-2 justify-between'>
                        <p className='text-gray-500'>Don,t have an account ?</p>
                        <NavLink to="/signup">Signup</NavLink>
                    </div>
                    <Button type="submit" className='w-full mt-4 items-center  sm:h-[50px] '>
                        {loading ? <Loader2 className='mr-2 w-4 h-4 animate-spin' /> : "Login"} 
                        </Button>
                </div>

            </form>
                   </div>
                
            </div>
          

             
        </div>
      
    
  )
}

export default Login
