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
            return {...item, ...item.senderDetails, ...item.receiverLocDetails}
        })
        setorderList(refactoredList)
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
            actions = "acceptReject"
            list={orderList}
            title={['categoryName','productName','productWeight', 'receiverPhoneNumber','fullName', 'phoneNumber','status']} endpoint="/orders" />
        </div>
        <Footer/>
         </>
  
    )
}
export default App