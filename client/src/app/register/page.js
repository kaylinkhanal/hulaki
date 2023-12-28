'use client'

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image'
import { message } from 'antd';
import { Modal, Upload } from 'antd';
import Link from 'next/link';

import Footer from '@/components/Footer/page';
import styles from '../../styles/register.module.css'

const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  fullName: Yup.string()
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



const index = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  // const saveFile = (e) => {
  //   e.target.files[0]

  // }

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null)
  // const [imageUrl, setImageUrl] = useState();
  // const handleChange = (info) => {
  //  console.log(info.file.originFileObj)
  // };
  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </div>
  // );

  const handleRegister = async (values) => {
    var formData = new FormData();
    formData.append('avatar', file)

    Object.entries(values).map((item, id) => {
      formData.append(item[0], item[1])
    })




    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
    console.log(res)
  }

  const saveImage = (e) => {
    setFile(e.target.files[0])
  }

  return (

    <>
    
      <Formik
        initialValues={{
          fullName: '',
          phoneNumber: '',
          password: '',
          email: '',
          address: '',
          role: 'User'
        }}
        // validationSchema={SignupSchema}
        onSubmit={values => {
          handleRegister(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.authForm}>
            {contextHolder}
            <div className={styles.input} >
            <Field name="fullName" type="fullName" placeholder="Full Name:"/>
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
           <br/>
           <br/>
            <Field  name="phoneNumber" placeholder="Phone number:" />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <br/>
            <br/>
             <Field  name="email" placeholder="Email:" />
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
            <br/>
            <br/>
           <Field  name="address" type="address" placeholder="address" />
            {errors.address && touched.address ? (
              <div className='errors'>{errors.address}</div>
            ) : null}
           <br/>
           <br/>
            <Field component='select' name='role' id='roles' placeholder='Choose your role'>
              <option disabled >Choose your role</option>
              <option value="User">User</option>
              <option value="Rider">Rider</option>
            </Field>
            {errors.role && touched.role ? (
              <div className='errors'>{errors.role}</div>
            ) : null}
            <br/>
            <br/>
          
            <Field  name="password" type="password" placeholder="password" />
            {errors.password && touched.password ? (
              <div className='errors'>{errors.password}</div>
            ) : null}
            <br />
            <br/>
            
            <input  type="file" onChange={saveImage} />
            </div>
            
            <span>Already registered ?<Link href="/">Login</Link>&nbsp; instead</span>
            <div className={styles.button}>
            <button type="submit">Submit</button>
        </div>
          </Form>
        )}
      </Formik>
      <Footer/>
    </>

  )
};

export default index