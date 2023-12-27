'use client'
import React, {useState, useEffect} from "react";
import Table from '../../../components/Table/page';
import {  message } from 'antd';
import { Modal, Upload } from 'antd';
import {Formik, Field} from 'formik';
import Nav from "@/components/NavBar/page";
import Footer from "@/components/Footer/page";

const App=()=>{
  const [messageApi, contextHolder] = message.useMessage();
    const [orderList, setorderList] = useState([])
    const [ open , setOpen] = useState(false)
    const [editFields, setEditFields ] = useState({})
    const orderFetch = async () => {
        const res = await fetch('http://localhost:4000/orders')
        const data = await res.json()
        if(data.orderList){
         const refactoredList = data.orderList.map((item)=>{
            return {...item, orderId: item._id, ...item.senderDetails, ...item.receiverLocDetails}
        })
        setorderList(refactoredList)
        }
       
      }    
     
      const adminStatus=async(e,orderId)=>{
        debugger;
           const updatedOrder = {status:e.target.value};
  
        const res = await fetch('http://localhost:4000/orders/'+orderId ,{
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


    return(
         <>
         <Nav/>
         <div style={{minHeight:'84.5vh',maxHeight:'maxContent'}}>
            <Table
             admin={true}
             adminStatus={adminStatus}
            list={orderList}
            title={['categoryName','productName','productWeight', 'receiverPhoneNumber','fullName', 'phoneNumber']} endpoint="/orders" />
        </div>
        <Footer/>
         </>
  
    )
}
export default App