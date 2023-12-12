'use client'

import React,{useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {  message,Button, Modal, Card } from 'antd';
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const SignupSchema = Yup.object().shape({

  productName: Yup.string().required('Required'),
  Description:Yup.string().
  required('Required'),
  Brand:Yup.string(),
  price:Yup.string(),
  Image:Yup.string(),
  Category:Yup.string()
});

export const index = () => {
  const [categoryList, setCategoryList] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEditCat, setSelectedEditCat]= useState({})
    const showModal = (item) => {
      setSelectedEditCat(item)
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
  const categoryFetch = async()=> {
    const res = await fetch(`http://localhost:4000/categories`)
    const data = await res.json()
    setCategoryList(data.categoryList) 
  }
 

  useEffect(()=>{
    categoryFetch()
  },[])
  const [messageApi, contextHolder] = message.useMessage();
  const registerValidCateogries = async(values) => {
    const res = await fetch('http://localhost:4000/categories', {
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
        if(res.status===200){
          categoryFetch();
        }
    };
    const deleteCat = async(id) => {
      const res = await fetch('http://localhost:4000/categories', {
          method:'DELETE', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id})
        })
        const data = await res.json()
          messageApi.open({
            type: res.status == 200 ? 'success': 'error',
            content: data.msg,
          });
          console.log(res)
          if(res.status===200){
            categoryFetch();
          }
      };
      const editCat = async(values) => {
        const res = await fetch('http://localhost:4000/categories', {
            method:'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          })
          const data = await res.json()
            messageApi.open({
              type: res.status == 200 ? 'success': 'error',
              content: data.msg,
            });
            console.log(res)
            if(res.status===200){
              categoryFetch();
            }
        };

  const EditForm= ()=>{
    return (
      <Formik
      initialValues={selectedEditCat}
      enableReinitialize
      // validationSchema={SignupSchema}
      onSubmit={values => {
    
        editCat(values)
      }}
    >
      {({ errors, touched }) => (
        <Form >
            <Field name="categoryName"  placeholder="categoryName" /> 
              {errors.categoryName && touched.categoryName ? (
                <div>{errors.categoryName}</div>
              ) : null}
              <br/>
         
              <Field name="maxWeight"  placeholder="maxWeight" /> 
              {errors.maxWeight && touched.maxWeight ? (
                <div>{errors.maxWeight}</div>
              ) : null}
              <br/>
              <Field name="pricePerUnitKg"  placeholder="pricePerUnitKg" /> 
              {errors.pricePerUnitKg && touched.pricePerUnitKg ? (
                <div>{errors.pricePerUnitKg}</div>
              ) : null}
              <br/>
              <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    )
  }

  
  return(
  <div className='form'>

    
    <h3>Add new category:</h3>
    <Formik
      initialValues={{
       
        categoryName : '',
        maxWeight: '',
        PricePerUnitKg:''
        
      }}
      // validationSchema={SignupSchema}
      onSubmit={values => {
        
        registerValidCateogries(values)
      }}
    >
      {({ errors, touched }) => (
        <Form >
         {contextHolder}
          <Field name="categoryName" type="text" placeholder="Enter your  categoryName" />
          {errors.categoryName && touched.categoryName ? <div>{errors.categoryName}</div> : null}
          <br />
          <Field name="maxWeight" type="text" placeholder="Enter your maxWeight" />
          {errors.maxWeight && touched.maxWeight ? <div>{errors.maxWeight}</div> : null}
          <br />
          <Field name="PricePerUnitKg" type="text" placeholder="Enter your Price/Unit kg" />
          {errors.PricePerUnitKg && touched.PricePerUnitKg ? <div>{errors.PricePerUnitKg}</div> : null}
          <br />
          <button type="submit">Submit</button>
          <br />
          
        </Form>
      )}
    </Formik>
    <Card title="Valid Categories list">
        
    {categoryList.length> 0 && categoryList.map((item,id)=>{
      return  <Card.Grid style={gridStyle}>
      {id+1}.  {item.categoryName}
        <p onClick={()=>deleteCat(item._id)}>Del</p>
        <p onClick={()=>showModal(item)}>Edit</p>
        </Card.Grid>
    })}
         </Card>
         <Modal 
           footer={null}
         title="Basic Modal" open={isModalOpen}  onOk={handleOk} onCancel={handleCancel}>
          <EditForm/>
      </Modal>
    </div>
)};
export default index 