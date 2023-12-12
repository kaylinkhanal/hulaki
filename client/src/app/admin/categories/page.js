'use client'

import React,{useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {  message ,Button, Modal, Card} from 'antd';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const SignupSchema = Yup.object().shape({

  productName: Yup.string().required('Required'),
  Description:Yup.string().
  required('Required'),
  Brand:Yup.string(),
  price:Yup.string(),
  Image:Yup.string(),
  Category:Yup.string()
});

export const index = () => {
  const [categoryList, setCategoryList] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const categoryFetch = async()=> {
    const res = await fetch(`http://localhost:4000/categories`)
    const data = await res.json()
    setCategoryList(data.categoryList) 
  }
 

  useEffect(()=>{
    categoryFetch()
  },[])
  const [messageApi, contextHolder] = message.useMessage();
  const registerValidCateogries = async(values) => {
    const res = await fetch('http://localhost:4000/categories', {
        method:'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
        messageApi.open({
          type: res.status === 200 ? 'success': 'error',
          content: data.msg,
        });
      console.log(res)

      if(res.status === 200 ){
        categoryFetch()
      }
    } 

    const deleteCat=async(id) => {
      const res = await fetch('http://localhost:4000/categories', {
          method:'DELETE', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id})
        })
       
      } 
  
  
  return(
  <div className='form'>

    
    Add new category:
    <Formik
      initialValues={{
       
        categoryName : '',
        maxWeight: ''
        
      }}
      // validationSchema={SignupSchema}
      onSubmit={values => {
        
        registerValidCateogries(values)
      }}
    >
      {({ errors, touched }) => (
        <Form >
         {contextHolder}
          <Field name="categoryName" type="text" placeholder="Enter your  categoryName" />
          {errors.categoryName && touched.categoryName ? <div>{errors.categoryName}</div> : null}
          <br />
          <Field name="maxWeight" type="text" placeholder="Enter your maxWeight" />
          {errors.maxWeight && touched.maxWeight ? <div>{errors.maxWeight}</div> : null}
          <br />
          <button type="submit">Submit</button>
          <br />
          
        </Form>
      )}
    </Formik>


    <Card title="Valid Cateories List">
    {categoryList.length> 0 && categoryList.map((item,id)=>{
      return     <Card.Grid style={gridStyle}>
      {id+1}.  {item.categoryName}
        <p onClick={()=> deleteCat(item._id)}>Del </p>
        <p onClick={showModal}>Edit</p>
        
      </Card.Grid>
    })}

   
  </Card>
   
  <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  </div>
)};
export default index 