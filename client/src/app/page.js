'use client'
import React, {useEffect} from 'react'
import Home from './home/page'
import Admin from './admin/page'
import { useSelector } from 'react-redux'

import NavBar from '../components/NavBar/page'
function page() {
  const {userDetails} = useSelector(state=>state.user)
  return (
    <div>
          <NavBar />
          {userDetails.role === 'admin' ?<Admin/>: <Home/>}
    </div>
  )
}

export default page


// import NavBar from '../components/NavBar/page'
// import { io } from 'socket.io-client';
// const URL =  'http://localhost:4000';
// const socket = io(URL);
// function page() {
//   useEffect(()=>{
//     socket.on('connection');
   
//   },[])