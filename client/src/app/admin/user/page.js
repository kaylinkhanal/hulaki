'use client'
import React, { useState, useEffect } from "react";
import Table from '../../../components/Table/page';
import { Formik, Form, Field } from 'formik';
import { message, Modal } from 'antd';
import styles from '@/styles/Form.module.css';
import Nav from "@/components/NavBar/page";
import Footer from "@/components/Footer/page";

const App = () => {
  const [userList, setUserList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false)
  const [editFields, setEditFields] = useState({})


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

  const editUser = async (values) => {
    setEditFields(values)
    setOpen(true)

  };


  const submitEditUser = async (values) => {
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
      userFetch()
      setOpen(false)
    }

  }

  return (
    <>
   <Nav/>
   <div style={{minHeight:'84.5vh',maxHeight:'maxContent'}}>
   <h3 style={{fontSize:'30px',textAlign:'center',fontWeight:'bold'}}>Users list</h3>
      {contextHolder}
      <Modal title="Edit User" open={open} footer={null} onCancel={() => { setOpen(false); setEditFields({}) }}>
        <Formik
          initialValues={{ fullName: '', ...editFields }}
          enableReinitialize
          // validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            submitEditUser(values)
            resetForm()
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.editForm}>
              <div>
                <label>Full Name name:</label>
                <Field name="fullName" id="fullName" placeholder="Full Name:" />
              </div>
              <div>
                <label>Email: </label>
                <Field name="email" placeholder="Email:" />
              </div>
              <div>
                <label> Address: </label>
                <Field name="address" placeholder="Address" />
              </div>
              <div>
                <label>Phone Number:</label>
                <Field name="phoneNumber" placeholder="Phone Number" />
              </div>

              <button className={styles.submitBtn} type="submit">Save</button>
            </Form>
          )}
        </Formik>
      </Modal>

      <Table
        onDelete={deleteUser}
        onEdit={editUser}
        action={true}
        list={userList} title={['fullName', 'email', 'address', 'phoneNumber', 'role']} endpoint="/users" />
    </div>
   <Footer/>
    </>

  )
}
export default App