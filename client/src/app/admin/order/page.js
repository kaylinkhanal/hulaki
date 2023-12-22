'use client'
import React, {useState, useEffect} from "react";
import Table from '../../../components/Table/page'
const App=()=>{
    const [userList, setUserList] = useState([])
    const userFetch = async () => {
        const res = await fetch(`http://localhost:4000/orders`)
        const data = await res.json()
        setUserList(data.orderList)
      }
    
    
      useEffect(() => {
        userFetch()
      }, [])
    return(
        <div>
            <Table
            action={false}
            list={userList} title={['productWeight', 'receiverPhoneNumber']} endpoint="/orders" />
        </div>
    )
}
export default App