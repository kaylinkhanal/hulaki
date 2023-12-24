'use client'
import React, { useState, useEffect } from "react";
import Table from '../../../components/Table/page'
import { message } from 'antd';
import { Modal, Upload } from 'antd';
import { Formik, Form, Field } from 'formik';

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [orderList, setorderList] = useState([])
  const [open, setOpen] = useState(false)
  const [editFields, setEditFields] = useState('');

  const orderFetch = async () => {
    const res = await fetch('http://localhost:4000/orders')
    const data = await res.json()
    setorderList(data.orderList)
  }

  const deleteorder = async (id) => {
    const res = await fetch('http://localhost:4000/orders', {
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
      orderFetch();
    }
  };


  const showModal = async (item) => {
    setEditFields(item);
    setOpen(true);
  };
    
  const editOrder = async (values) => {
    console.log(values);
    const res = await fetch('http://localhost:4000/orders', {
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
      orderFetch();
    }
    setOpen(false);
  }


  useEffect(() => {
    orderFetch()
  }, [])
  return (
    <div>
      {contextHolder}
      <Modal title="Delete category" open={open} footer={null}  onCancel={() => setOpen(false)}>
        <Formik
          initialValues={editFields}
          enableReinitialize
          // validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
              editOrder(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className='editForm'>
              <div>
                <span>category name:</span>
                <Field name="categoryName" />
              </div>
              <div>
                <span>product name:</span>
                <Field name="productName" />
              </div>
              <div>
                <span>product weight:</span>
                <Field name="productWeight" />
              </div>
              <div>
                <span>receiver phone:</span>
                <Field name="receiverPhoneNumber" />
              </div>
              <button className="submitBtn" type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </Modal>

      <Table
        onDelete={deleteorder}
        onEdit={showModal}
        list={orderList}
        title={['categoryName', 'productName', 'productWeight', 'receiverPhoneNumber']} endpoint="/orders" />
    </div>
  )
}
export default App