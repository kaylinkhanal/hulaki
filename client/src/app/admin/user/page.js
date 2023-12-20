'use client'
import React, { useState, useEffect } from "react";
import Table from '../../../components/Table/page';
import { message } from 'antd';
const App = () => {
  const [userList, setUserList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();


  const userFetch = async () => {
    const res = await fetch(`http://localhost:4000/users`)
    const data = await res.json()
    setUserList(data.list)
  }


  useEffect(() => {
    userFetch()
  }, [])

  const deleteUser = async (id) => {
    const res = await fetch('http://localhost:4000/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
    console.log(res)
    if (res.status === 200) {
      userFetch()
    }
  };

  const editUser = async (values, resetForm) => {
    const res = await fetch('http://localhost:4000/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
    if (res.status === 200) {
      userFetch();
      resetForm()
    }
  };


  return (
    <div>
      {contextHolder}

      <Table 
      //  <Modal title="Edit category" open={isModalOpen1} onCancel={handleCancel} footer={null}>
        
      // </Modal>
      // <Modal title="Delete category" open={isModalOpen2} onCancel={handleCancel} onOk={() => deleteCat(selectedEditCat._id)}>
      //   <p>Are you sure you want to delete this category ?</p>
      // </Modal>
      onDelete={deleteUser}
      onEdit={editUser}
      list={userList} title={['fullName', 'email', 'address', 'phoneNumber', 'role']} endpoint="/users" />
    </div>
  )
}
export default App