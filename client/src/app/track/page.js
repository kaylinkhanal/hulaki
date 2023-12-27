'use client'
import React, {useState, useEffect} from "react";

import {  useSelector}  from "react-redux"
import Nav from "@/components/NavBar/page";
import Footer from "@/components/Footer/page";
import Table from "../../components/Table/page";

const App=()=>{
  
    const {userDetails} = useSelector(state=>state.user)
    const [orderList, setorderList] = useState([])
    const orderFetch = async () => {
        const res = await fetch(`http://localhost:4000/orders/${userDetails._id}`)
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
            actions = {false}
            list={orderList}
            title={['categoryName','productName','productWeight', 'receiverPhoneNumber','fullName', 'phoneNumber','status']} endpoint="/orders" />
        </div>
        <Footer/>
         </>
  
    )
}
export default App
