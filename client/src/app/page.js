import React from 'react'
import Home from './home/page'
import NavBar from '../components/NavBar/page'
function page() {
  
  //HOC: higher order components
  return (
    <div>
      <NavBar />
          <Home/>
    </div>
  )
}

export default page