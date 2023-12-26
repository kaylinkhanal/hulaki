'use client';
import React,{useEffect, useState} from 'react';
import Table from '../../../components/Table/page';
import NavBar from '@/components/NavBar/page';
import Footer from '@/components/Footer/page';
import {  message } from 'antd';
import { Button, Modal } from 'antd';
import Location from '../../location/page'
import {useDispatch} from 'react-redux'
import {setSenderLocDetails, setReceiverLocDetails } from '../../../redux/reducerSlices/orderSlice'
const containerStyle = {
  width: 'auto',
  height: '50vh',
  display: 'flex'
};
const page = () => {
    const dispatch = useDispatch()
    const [orderList, setorderList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const orderFetch = async () => {
        const res = await fetch('http://localhost:4000/orders')
        const data = await res.json()
        setorderList(data.orderList)
      }

      const handleMapView = (item)=>{
        dispatch(setSenderLocDetails(item.senderLocDetails))
        dispatch(setReceiverLocDetails(item.receiverLocDetails))
        showModal()
      }
      
    const handleStatus=async(e,item)=>{
      debugger;
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
    <div style={{marginTop:'20px',minHeight:'81.7vh'}}>
    {contextHolder}
    <Modal title="Order location" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Location containerStyle={containerStyle} userType="rider"/>
      </Modal>
      <h2 style={{fontWeight:'bold',textAlign:'center',fontSize:'30px'}}>Available orders</h2>
     <Table
            rider={true}
            handleStatus={handleStatus}
            list={orderList}
            handleMapView={handleMapView}
            title={['productName','categoryName', 'productWeight', 'receiverName', 'receiverPhoneNumber']} endpoint="/orders" />
    </div> 
    <Footer/>
    </>
   
  )
}

export default page