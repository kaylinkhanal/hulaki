'use client'

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {  message } from 'antd';
import {setOrderDetails} from '../../redux/reducerSlices/orderSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'

const SignupSchema = Yup.object().shape({
  orderCateogry: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    productWeight: Yup.number()
    .min(0.2, 'Too low!')
    .max(20, 'Too big!')
    .required('Required'),
    description: Yup.string()
    .min(5, 'Too short!')
    .max(250, 'Too long!')
    .required('Required'),
    receiverName: Yup.string(),
    receiverPhoneNumber:Yup.number()
});

 const Home = () => {
  const router = useRouter()
  const dispatch= useDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const [categoryList, setCategoryList] = useState({})
  const categoryFetch = async()=> {
    const res = await fetch(`http://localhost:4000/categories`)
    const data = await res.json()
    setCategoryList(data.categoryList) 
  }
 

  useEffect(()=>{
    categoryFetch()
  },[])
  const handleOrder = async(values) => {
    const res = await fetch('http://localhost:4000/order', {
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

    const [formStep, setFormStep]= useState(1)
  

  const FormDisplay = ({errors,touched})=> {
    if(formStep==1){
      return (
      <div>
          <h1>Product Detail form</h1>
            <p> Category:</p>
          <Field as='select'   name='categoryName' >
            {categoryList.length>0 && categoryList.map((item)=>{
              return   <option value={item.categoryName}>{item.categoryName}</option>
            })}
          
          </Field>
          {errors.role && touched.role ? (
            <div className='errors'>{errors.role}</div>
          ) : null}
          <Field name="productName"  placeholder="productName" /> 
            {errors.productName && touched.productName ? (
              <div>{errors.productName}</div>
            ) : null}
            <br/>
            <hr />
            <p>Weight:</p>
            <Field name="productWeight" type="number" placeholder="Enter your  productWeight" />
            {errors.productWeight && touched.productWeight ? (
              <div>{errors.productWeight}</div>
            ) : null}
            <br/> <hr />
            <p>About your Product:</p>
            <Field  as="textarea" name="description" type="string" placeholder="Describe about your product" />
            {errors.content && touched.content ? (
              <div>{errors.content}</div>
            ) : null}
     
            <br/> <hr />
            <button onClick={()=>setFormStep(2)}>Next</button>
      </div>

      )
    }else{
      return (
        <div>
            <h1>Reciever Details:</h1>
              <p> Full Name:</p>
            <Field name="receiverName"  placeholder="receiverName" /> 
              {errors.receiverName && touched.receiverName ? (
                <div>{errors.receiverName}</div>
              ) : null}
              <br/>
              <hr />
              <p>PhoneNumber:</p>
              <Field name="receiverPhoneNumber" placeholder="Enter your  phoneNumber" />
              {errors.receiverPhoneNumber && touched.receiverPhoneNumber ? (
                <div>{errors.receiverPhoneNumber}</div>
              ) : null}
              <br/> <hr />
              <button onClick={()=>setFormStep(1)}>Back</button>
        </div>
  
        )
    }

  }


  return(
  <div>
  <Formik
      initialValues={{
        categoryName: categoryList?.[0]?.categoryName,
        productName: '',
        productWeight: '',
        description:'',
        receiverName:'',
        receiverPhoneNumber:''
        
       
      }}
      enableReinitialize
      // validationSchema={SignupSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(setOrderDetails(values))
        router.push('/location')
         resetForm();
    setFormStep(1);
      }}
    >
      {({ errors, touched }) => (
        <Form className='form1'>
              {contextHolder}
          <FormDisplay errors={errors} touched={touched}/>
          {formStep==2 && <button type="submit">Submit</button> } 
        </Form>
      )}
    </Formik>
  </div>
)}

export default Home