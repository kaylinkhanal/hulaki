'use client'
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'

const page = () => {
    const {userDetails } = useSelector(state=>state.user)
    const categoryFetch = async () => {
        const res = await fetch(`http://localhost:4000/orders/${userDetails._id}`)
        const data = await res.json()
      }
    
    
      useEffect(() => {
        categoryFetch()
      }, [])
  return (
    <div>page</div>
  )
}

export default page