'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image'
import { message } from 'antd';
import Link from 'next/link';
import NavBar from '../../components/NavBar/page'
const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
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
  role: Yup.string()
    .required('Required'),
  role: Yup.string()
    .required('Required')
});



const handleregister = (formField) => {
  fetch('http://localhost:4000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formField)
  })
}
const index = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleRegister = async (values) => {
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
    console.log(res)
  }


  return (
    <div>
      <NavBar name={props.name} />
      <Image
        src="/hulakilogo.png"
        width={60}
        height={60}
        alt="Logo"
      />
      <h1>Sign up</h1>
      <Formik
        initialValues={{
          fullName: '',
          phoneNumber: '',
          password: '',
          email: '',
          address: '',
          role: ''
        }}
        // validationSchema={SignupSchema}
        onSubmit={values => {
          handleRegister(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className='authForm'>
            {contextHolder}
            <Field name="fullName" placeholder="full name " />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div className='errors'>{errors.phoneNumber}</div>
            ) : null}
            <br />
            <Field name="phoneNumber" placeholder="phoneNumber" />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div className='errors'>{errors.phoneNumber}</div>
            ) : null}
            <br />
            <Field name="email" placeholder="email" />
            {errors.email && touched.email ? (
              <div className='errors'>{errors.email}</div>
            ) : null}
            <br />


            <Field name="address" type="address" placeholder="address" />
            {errors.address && touched.address ? (
              <div className='errors'>{errors.address}</div>
            ) : null}
            <br />
            <Field component='select' name='role' id='roles' placeholder='Choose your role'>
              <option value='null' >Choose your role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
            {errors.role && touched.role ? (
              <div className='errors'>{errors.role}</div>
            ) : null}
            <br />
            <Field name="password" type="password" placeholder="password" />
            {errors.password && touched.password ? (
              <div className='errors'>{errors.password}</div>
            ) : null}
            <br />
            <span className='formFooter'>Already registered ?<Link href="/">Login</Link>&nbsp; instead</span>
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default index