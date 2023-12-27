import React ,{useEffect} from 'react'
import { useSelector } from 'react-redux'


function page() {
    const {userDetails}=useSelector(state=>state.user)
    const orderFetch = async () => {
        const res = await fetch(`http://localhost:4000/order/${userDetails._id}`)
        const data = await res.json()
        setCategoryList(data.orderList)
      }
    
    
      useEffect(() => {
        categoryFetch()
      }, [])
  return (
    <div>page</div>
  )
}

export default page
