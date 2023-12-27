'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import {setLoginDetails} from '../../redux/reducerSlices/userSlice'
import Link from 'next/link';
import styles from '../../styles/login.module.css'
import {  message } from 'antd';
const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

 const Home = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogin = async(values) => {
    const res = await fetch('http://localhost:4000/login', {
        method:'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
        messageApi.open({
          type: res.status == 200 ? 'success': 'error',
          content: data.msg,
        });
      if(res.status==200){
        dispatch(setLoginDetails(data.userDetails))
        router.push('/')
      }
    }

  
  return(
  <div>
      <Image
      src="/hulakilogo.png"
      width={60}
      height={60}
      alt="Logo"
    />
    {contextHolder}
    <h1 className={styles.heading}>Login</h1>
    <Formik
      initialValues={{
        phoneNumber: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        handleLogin(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.container}>
          <Field name="phoneNumber"  placeholder="PhoneNumber" /> 
          {errors.phoneNumber && touched.phoneNumber ? (
            <div>{errors.phoneNumber}</div>
          ) : null}
          <br/>
          <Field name="password" type="password" placeholder="Password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
          Dont have an account yet ? <Link href="/register">Sign Up</Link> instead
          <br/>
          <button className={styles.button} type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)}

export default Home