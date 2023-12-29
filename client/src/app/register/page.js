'use client';

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image'
import { message } from 'antd';
import { Modal, Upload } from 'antd';
import Link from 'next/link';
import Nav from '@/components/NavBar/page';
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
     <Nav/>
      <div className={styles.container}>
       <span className={styles.heading}>Register for Hulaki</span>
      <Formik
        initialValues={{
          fullName: '',
          phoneNumber: '',
          password: '',
          email: '',
          address: '',
          role: 'User'
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          handleRegister(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.authForm}>
            {contextHolder}
            <div className={styles.input} >
              <Field style={{marginTop:'18px'}} name="fullName" type="fullName" placeholder="Full Name:" />
              {errors.fullName && touched.fullName ? (
                <div className={styles.errors}>{errors.fullName}</div>
              ) : null}
          
              <Field name="phoneNumber" placeholder="Phone number:" />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className={styles.errors}>{errors.phoneNumber}</div>
              ) : null}
          
              <Field name="email" placeholder="Email:" />
              {errors.email && touched.email ? (
                <div className={styles.errors}>{errors.email}</div>
              ) : null}
         
              <Field name="address" type="address" placeholder="address" />
              {errors.address && touched.address ? (
                <div className={styles.errors}>{errors.address}</div>
              ) : null}
          
              <Field style={{width:'70%',color:'black',cursor:'pointer'}} component='select' name='role' id='roles' placeholder='Choose your role'>
                <option  disabled >Choose your role</option>
                <option value="User">User</option>
                <option value="Rider">Rider</option>
              </Field>
              {errors.role && touched.role ? (
                <div className={styles.errors}>{errors.role}</div>
              ) : null}

              <Field name="password" type="password" placeholder="password" />
              {errors.password && touched.password ? (
                <div className={styles.errors}>{errors.password}</div>
              ) : null}

              <input className={styles.file} type="file" onChange={saveImage} />
            </div>

            <div className={styles.button}>
              <button className={styles.submitBtn} type="submit">Submit</button>
            </div>
            <span className={styles.text}>Already registered ?<Link style={{color:'#1677ff'}} href="/login"> Login</Link>&nbsp; instead</span>

          </Form>
        )}
      </Formik>
      </div>
      <Footer />
    </>

  )
};

export default index