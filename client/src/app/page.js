'use client'
import React, {useEffect} from 'react'
import Home from './home/page'
import Admin from './admin/page'
import Rider from './rider/page'

import { useSelector } from 'react-redux'
import NavBar from '../components/NavBar/page'
import Footer from '@/components/Footer/page'

function page() {
  const {userDetails} = useSelector(state=>state.user)
  const ConditionalRoute = () => {
    if(userDetails?.role === 'admin') return <Admin/>
    else if(userDetails?.role === 'user') return <Home/>
    else return <Rider/>
  }
  return (
    <div>
          <NavBar />
          {userDetails?.role === 'admin' ?<Admin/>: <Home/>}
          <Footer/>
    </div>
  )
}

export default page

