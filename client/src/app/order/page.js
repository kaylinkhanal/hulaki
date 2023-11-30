'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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
    content: Yup.string()
    .min(5, 'Too short!')
    .max(250, 'Too long!')
    .required('Required'),
    packagingType: Yup.string()
    .min(5, 'Too short!')
    .max(20, 'Too long!')
    .required('Required'),
    hazardousMaterial: Yup.string()
    .min(5, 'Too short!')
    .max(20, 'Too long!')
    .required('Required'),
    senderReferenceNumber: Yup.string()
    .min(5, 'Too short!')
    .max(20, 'Too long!')
    .required('Required'),
});

 const Home = () => {
  
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
      validationSchema={SignupSchema}
      onSubmit={values => {
        handleOrder(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className='form1'>
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
          <br /> <hr />
          <p>Packing Type:</p>
          <Field name="packagingType" type="string" placeholder="Enter your  packagingType" />
          {errors.packagingType && touched.packagingType ? (
            <div>{errors.packagingType}</div>
          ) : null}
          <br/> <hr />
           <p>Enter if it is hazardousMaterial</p>
          <Field name="hazardousMaterial" type="string" placeholder="if it is hazardousMaterial" />
          {errors.hazardousMaterial && touched.hazardousMaterial ? (
            <div>{errors.hazardousMaterial}</div>
          ) : null}
          <br/> <hr />
          <p>Enter sender Refrence Number</p>
          <Field name="senderReferenceNumber" type="string" placeholder=" enter senderReferenceNumber" />
          {errors.senderReferenceNumber && touched.senderReferenceNumber ? (
            <div>{errors.senderReferenceNumber}</div>
          ) : null}
          <br/> <hr />
          <Link href="/reciever"> <button type="submit">Submit</button> </Link> 
        </Form>
      )}
    </Formik>
  </div>
)}

export default Home