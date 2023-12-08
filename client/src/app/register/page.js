'use client'

import React,{useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image'
import { message } from 'antd';
import { Modal, Upload } from 'antd';
import Link from 'next/link';
import NavBar from '../../components/NavBar/page'
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

    const handleRegister = async(values) => {
      var formData = new FormData();
      formData.append('avatar', file) 

      Object.entries(values).map((item,id)=>{
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

  const saveImage = (e)=>{
    setFile(e.target.files[0])
  }

  return (
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