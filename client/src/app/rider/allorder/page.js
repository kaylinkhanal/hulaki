'use client';
import React,{useEffect, useState} from 'react';
import Table from '../../../components/Table/page';
import NavBar from '@/components/NavBar/page';
import {  message } from 'antd';


const page = () => {

    const [orderList, setorderList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const orderFetch = async () => {
        const res = await fetch('http://localhost:4000/orders')
        const data = await res.json()
        setorderList(data.orderList)
      }
      
    const handleStatus=async(e,item)=>{
       const updatedOrder = {...item,status:e.target.value};

    const res = await fetch('http://localhost:4000/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedOrder)
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: "Changed the status of the order successfully",
    });
    if (res.status === 200) {
      orderFetch();
    }
      
    } 
      
    useEffect(() => {
        orderFetch()
      }, [])  

  return (
    <>
    <NavBar/>
    <div style={{marginTop:'20px'}}>
    {contextHolder}
      <h2 style={{fontWeight:'bold',textAlign:'center',fontSize:'30px'}}>Available orders</h2>
     <Table
            rider={true}
            handleStatus={handleStatus}
            list={orderList}
            title={['productName','categoryName', 'productWeight', 'receiverName', 'receiverPhoneNumber']} endpoint="/orders" />
    </div> 
    </>
   
  )
}

export default page