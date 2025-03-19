import React from 'react'
import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import aiimg from "../assets/aiimg.png"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.jpg"
import Footer from '@/components/Footer'
const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: 2,
    backgroundColor:"transparent",
    boxShadow: 'none',

  }));

  return (
    <div>
        <Navbar />
      <div className='container mt-12 flex flex-col gap-10 '>
      <div className=' flex flex-col  gap-10  justify-center p-10 my-10 bg-cover sm:bg-center rounded-lg  bg-no-repeat '>
            <div className=' w-full  sm:max-w-[800px] items-center mx-auto px-5 py-1  flex flex-col gap-2 sm:gap-0 space-y-5 '>
                <p className='font-[700] text-center text-[1.5rem] text-black leading-8 sm:leading-[3rem] sm:text-[2.5rem]'>Don't leave your customers helpless, frustrated, and angry</p>
                <p className='font-[500] text-center leading-5 text-sm sm:text-[1rem] text-gray-600'>
                Give short, accurate and helpful AI answers that learn from you and improve over time.
                </p>
                <div className='flex gap-4'>
                <NavLink to="/dashboard">
                <Button  className="mt-2  bg-blue-700 w-full sm:max-w-[200px] hover:bg-blue-400 rounded-md px-5 py-6 text-[1rem] font-[500] text-white">
                Start free trial</Button>
                </NavLink>
                <NavLink to="/">
                <Button  className="mt-2  bg-white w-full  sm:max-w-[200px] hover:text-white hover:bg-blue-700 rounded-md px-5 py-6 text-[1rem] font-[500] border-[1px] border-blue-500 text-blue-500">
                Book a demo</Button>
                </NavLink>

                </div>
               
              
            </div>
            <div className='w-full mt-[12]'>
              <img src={aiimg} alt="aiimg" className='w-full rounded-md ' />
            </div>
        </div>
        <div className=''>
           <div className=''>
           <Box  sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Item>
            <img src={img1} alt="" className='w-full h-auto rounded-md' />
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item><img src={img2} alt="" className='w-full h-auto rounded-md' /></Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item><img src={img3} alt="" className='w-full h-auto rounded-md' /></Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item><img src={img4} alt="" className='w-full h-auto rounded-md' /></Item>
        </Grid>
      </Grid>
    </Box>
           </div>
           
        </div>

      
      </div>
      <Footer />
    </div>
  )
}

export default Home
