'use client'
import React, {useState, useEffect} from "react";
import Table from '../../../components/Table/page'
const App=()=>{
    const [userList, setUserList] = useState([])
    const userFetch = async () => {
        const res = await fetch(`http://localhost:4000/user`)
        const data = await res.json()
        setUserList(data.list)
      }
    
    
      useEffect(() => {
        userFetch()
      }, [])
      
    return(
        <div>
            <Table list={userList} title={['fullName','email','address', 'phoneNumber', 'role']} endpoint="/users" />
        </div>
    )
}
export default App