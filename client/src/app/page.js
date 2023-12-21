'use client'
import React, {useEffect} from 'react'
import Home from './home/page'
import NavBar from '../components/NavBar/page'
import { io } from 'socket.io-client';
const URL =  'http://localhost:4000';
const socket = io(URL);
function page() {
  useEffect(()=>{
    socket.on('connection');
   
  },[])
  return (
    <div>
      <button onClick={()=> socket.emit('msg','hello')}>
        click
        </button>
      <NavBar />
          <Home/>
    </div>
  )
}

export default page