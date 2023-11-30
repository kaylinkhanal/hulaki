'use client'

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {  message } from 'antd';
import Link from 'next/link'

const SignupSchema = Yup.object().shape({
    orderCateogry: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    productWeight: Yup.number()
    .min(0.2, 'Too low!')
    .max(20, 'Too big!')
    .required('Required'),
    description: Yup.string()
    .min(5, 'Too short!')
    .max(250, 'Too long!')
    .required('Required'),
});

 const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleOrder = async(values) => {
    const res = await fetch('http://localhost:4000/order', {
        method:'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
        messageApi.open({
          type: res.status == 200 ? 'success': 'error',
          content: data.msg,
        });
      console.log(res)
    }

    const [formStep, setFormStep]= useState(1)
  

  const FormDisplay = ({errors,touched})=> {
    if(formStep==1){
      return (
      <div>
          <h1>Product Detail form</h1>
            <p> Category:</p>
          <Field name="orderCateogry"  placeholder="orderCateogry" /> 
            {errors.orderCateogry && touched.orderCateogry ? (
              <div>{errors.orderCateogry}</div>
            ) : null}
            <br/>
            <hr />
            <p>Weight:</p>
            <Field name="productWeight" type="number" placeholder="Enter your  productWeight" />
            {errors.productWeight && touched.productWeight ? (
              <div>{errors.productWeight}</div>
            ) : null}
            <br/> <hr />
            <p>About your Product:</p>
            <Field  as="textarea" name="content" type="string" placeholder="Describe about your product" />
            {errors.content && touched.content ? (
              <div>{errors.content}</div>
            ) : null}
     
            <br/> <hr />
            <button onClick={()=>setFormStep(2)}>Next</button>
      </div>

      )
    }else{
      return (
        <div>
            <h1>Reciever Details:</h1>
              <p> Reciever Full Name:</p>
            <Field name="fullName"  placeholder="fullName" /> 
              {errors.fullName && touched.fullName ? (
                <div>{errors.fullName}</div>
              ) : null}
              <br/>
              <hr />
              <p>phoneNumber:</p>
              <Field name="phoneNumber" placeholder="Enter your  phoneNumber" />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}
              <br/> <hr />
              <button onClick={()=>setFormStep(1)}>Back</button>
        </div>
  
        )
    }

  }


  return(
  <div>
  <Formik
      initialValues={{
        orderCateogry: '',
        productWeight: '',
        content:'',
        packagingType:'',
        hazardousMaterial:'',
        senderReferenceNumber:''
      }}
      // validationSchema={SignupSchema}
      onSubmit={values => {
    
        handleOrder(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className='form1'>
              {contextHolder}
          <FormDisplay errors={errors} touched={touched}/>
          {formStep==2 && <button type="submit">Submit</button> } 
        </Form>
      )}
    </Formik>
  </div>
)}

export default Home