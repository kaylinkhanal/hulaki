'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image'
import Link from 'next/link';
const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});


 const index = () => {
    const handleRegister = (values) => {
      fetch('http://localhost:4000/register', {
        method:'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
    }
  return(
  <div>
      <Image
      src="/hulakilogo.png"
      width={60}
      height={60}
      alt="Logo"
    />
    <h1>Sign up</h1>
    <Formik
      initialValues={{
        phoneNumber: '',
        password: '',
        email: '',
        address: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        handleRegister(values)
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="phoneNumber"  placeholder="phoneNumber" /> 
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <br/>
          <Field name="email"  placeholder="email" /> 
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br/>

        
          <Field name="address" type="address" placeholder="address" />
          {errors.address && touched.address ? (
            <div>{errors.address}</div>
          ) : null}
          <br/>
          <Field name="password" type="password"  placeholder="password" /> 
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
          Already registered ? <Link href="/">Login</Link> instead
          <br/>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)};

export default index