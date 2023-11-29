import React from 'react'
import Image from 'next/image'

import Link from 'next/link'

function page() {
  return (
    <div>
      
      <div className="top">
        <ul>
            <li><Image
      src="/hulakilogo.png"
      width={60}
      height={60}
      alt="Logo"
    /> </li>
             <li> <input
      placeholder="Enter Your Traking Order"
      enterButton="Search"
      size="large"
    
     
    /></li>
       <li><button><Link href="/register">Sign Up</Link></button></li>
       <li><button><Link href="/login">Sign In</Link></button></li>
        </ul>
      </div>
    </div>
  )
}

export default page
