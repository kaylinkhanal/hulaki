'use client'

import React from 'react';
import { Formik,Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import {setLoginDetails} from '../../redux/reducerSlices/userSlice'
import Link from 'next/link'
import {  message ,Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
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
    <h1>Login</h1>
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <br/>
          Dont have an account yet ? <Link href="/register">Sign Up</Link> instead
    </Form.Item>
  </Form>
  
  </div>
)}

export default Home