'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Link from 'next/link'

const SignupSchema = Yup.object().shape({
    phoneNumber: Yup.number()
    .min(2, 'Too Short!')
    .max(11, 'Too Long!')
    .required('Required'),
    address: Yup.string()
    .min(5, 'Too low!')
    .max(50, 'Too big!')
    .required('Required')
   
});

 const Home = () => {
  
  const handleReciever = async(values) => {
    const res = await fetch('http://localhost:4000/reciever', {
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
       phoneNumber:'',
       address:''
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        handleReciever(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className='form1'>
        <h1>Reciever Information</h1>
        <p>phoneNumber</p>
          <Field name="phoneNumber"  placeholder="Enter reciever" /> 
          {errors.phoneNumber && touched.phoneNumber ? (
            <div>{errors.phoneNumber}</div>
          ) : null}
          <hr />
          
        <p>address</p>
        <Field name="address" type="string" placeholder="Enter your address" />
          {errors.address && touched.address ? (
            <div>{errors.address}</div>
          ) : null}
          <br/><br />
         
          <br/>
            <button type="submit">Submit</button> <br />
            <Link href="/order">Back</Link>
        </Form>
      )}
    </Formik>
  </div>
)}

export default Home