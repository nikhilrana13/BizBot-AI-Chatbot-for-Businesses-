import { getGoogleUser } from '@/redux/UserSlice'
import { Loader2 } from 'lucide-react'
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
    const {user,loading} = useSelector((state)=>state.user)


    // when page is load then google user will be fetched in redux store
    useEffect(()=>{
          const fetchUser = async()=>{
            if(!user){
              await dispatch(getGoogleUser());
            }
            setTimeout(()=>{
              setIsFetching(false);
            },1500)
          }
          fetchUser();
    },[dispatch])

    // show loader until google user is fetched
    if(loading || isFetching ){
      return(
        <div className="flex justify-center items-center h-screen">
          <div className='flex gap-5'>
          <Loader2 className="animate-spin w-10 h-10" />
           <p className='text-2xl text-gray-500 font-[700] '>Dashboard is loading...</p>
          </div>
        
      </div>
      )
    }

    if(!user ){
      return <Navigate to="/login" replace  />
    }

  return  children
}

export default ProtectedRoutes
