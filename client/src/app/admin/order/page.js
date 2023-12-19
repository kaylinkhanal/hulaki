'use client'
import React, {useState, useEffect} from "react";
import Table from '../../../components/Table/page'
const App=()=>{
    const [orderList, setorderList] = useState([])
    const orderFetch = async () => {
        const res = await fetch('http://localhost:4000/order')
        const data = await res.json()
        setorderList(data.orderList)
      }    
     useEffect(() => {
        orderFetch()
      }, [])
    return(
        <div>
            <Table list={orderList} title={['categoryName','productName','productWeight', 'receiverPhoneNumber']} endpoint="/orders" />
        </div>
    )
}
export default App