'use client'
import React from 'react'
import { useSelector } from 'react-redux'
function page() {
    const {userDetails} = useSelector(state=>state.user)

  return (
    <div>
        {JSON.stringify(userDetails)}
        this is profile
    </div>
  )
}

export default page