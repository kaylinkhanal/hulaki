'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import {setLoginDetails} from '../../../redux/reducerSlices/userSlice'
import Link from 'next/link'
import {  message } from 'antd';
const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    newPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    confirmPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

 const Home = () => {
  const {userDetails,isLoggedIn} = useSelector(state=>state.user)
  // const dispatch = useDispatch()
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();
  const changePassword = async(values) => {
    const res = await fetch(`http://localhost:4000/change-password?userId=${userDetails._id}`, {
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
        
        router.push('/profile')
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
    <h2>Change Password </h2>
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={PasswordSchema}
      onSubmit={values => {
        changePassword(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="oldPassword" type="password" placeholder="Old password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
          <Field name="newPassword" type="password" placeholder="New password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
          <Field name="confirmPassword" type="password" placeholder="Confirm password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}

          <br/>
          <button type="submit">Change Password</button>
        </Form>
      )}
    </Formik>
  </div>
)}

export default Home