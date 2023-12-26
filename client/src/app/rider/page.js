'use client';
import React from 'react';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import HelpIcon from '@mui/icons-material/Help';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CategoryIcon from '@mui/icons-material/Category';
import Nav from '@/components/NavBar/page';
import Footer from '@/components/Footer/page';

function page() {
  return (
    <>
    <Nav/>
    <section class="text-gray-600 body-font" style={{height:'84.5vh'}}>
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Rider Portal</h1>
         </div>
      <div class="flex flex-wrap -m-4">
     
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <UserOutlined />
            </div>
          
            <Link href="/rider/allorder">
              <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Available orders</h2>
           </Link>
            <p class="leading-relaxed text-base">Check incoming orders from here, change status of the order.</p>
          
          </div>
        </div>
      
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <Link href="/rider/deliveries">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Order history</h2>
            </Link>
            <p class="leading-relaxed text-base">View successful deliveries or completed orders.</p>
          </div>
        </div>
            </div>
      </div>
  </section> 
  <Footer/>
  </> 
  )
}

export default page