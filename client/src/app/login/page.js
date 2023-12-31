'use client';

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
import MainLayout from '@/components/MainLayout/page';


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
  <>
   <MainLayout>
   <div className={styles.mainDiv}>
   {contextHolder}
    <h1 className={styles.heading}>Login </h1>
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
        <Form className={styles.formContainer}>
          <Field style={{marginTop:'18px'}} name="phoneNumber"  placeholder="PhoneNumber" /> 
          {errors.phoneNumber && touched.phoneNumber ? (
            <div className={styles.errors}>{errors.phoneNumber}</div>
          ) : null}
        
          <Field name="password" type="password" placeholder="Password" />
          {errors.password && touched.password ? (
            <div className={styles.errors}>{errors.password}</div>
          ) : null}
               
          <button className={styles.submitBtn} type="submit">Submit</button>

          <span className={styles.text}>Dont have an account yet ? <Link style={{color:'#1677ff'}} href="/register">Sign Up</Link> instead</span>
        </Form>
      )}
    </Formik>
   </div>
    </MainLayout>
  </>
)}

export default Home