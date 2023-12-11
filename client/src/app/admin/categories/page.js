'use client'

import React,{useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {  message } from 'antd';


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
    try{
    const res = await fetch('http://localhost:4000/categories', {
        method:'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
        messageApi.open({
          type: res.status == 200 ? 'success': 'error',
          content: data.msg,
        });
        if(res.status===200){
          categoryFetch();
        }
      }catch(error){
        console.error('Error adding categoriry:',error);
      }
    };
  return(
  <div className='form'>

    
    <h3>Add new category:</h3>
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

    <h2>Valid Cateories List:</h2>

    
    {categoryList.length> 0 && categoryList.map((item)=>{
      return <p key={index}>{item.categoryName}</p>
    })}

  </div>
)};
export default index 