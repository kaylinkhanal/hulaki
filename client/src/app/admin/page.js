'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import HelpIcon from '@mui/icons-material/Help';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CategoryIcon from '@mui/icons-material/Category';
import { UserOutlined } from '@ant-design/icons';

import {  message } from 'antd';
const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

 const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogin = async(values) => {
    const res = await fetch('http://localhost:4000/login', {
        method:'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
        messageApi.open({
          type: res.status == 200 ? 'success': 'error',
          content: data.msg,
        });
      console.log(res)
    }
  
  return(
    <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Admin Portal</h1>
         </div>
      <div class="flex flex-wrap -m-4">
     
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <UserOutlined />
            </div>
          
            <Link href="/admin/user">
              <h2 class="text-lg text-gray-900 font-medium title-font mb-2">User Management</h2>
           </Link>
            <p class="leading-relaxed text-base">Manage,update,delete user and roles from here.</p>
          
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
            <Link href="/admin/order">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Order Management</h2>
            </Link>
            <p class="leading-relaxed text-base">Check pending orders,refunds and change status.</p>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <CategoryIcon/>
            </div>
            <Link href="/admin/categories">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Categories Management</h2>
            </Link>
            <p class="leading-relaxed text-base">Manage,add,update delete valid categories for customer</p>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
             <AutoGraphIcon/>
            </div>
            <Link href="/admin/Analytics">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Analytics</h2>
            </Link>
            <p class="leading-relaxed text-base">Reports, insights and track overall progress for given time.</p>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <HelpIcon />
            </div>
            <Link href="/admin/help">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Complaint and supports</h2>
            </Link>
            <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
          </div>
        </div>
            </div>
      </div>
  </section>  
)}

export default Home