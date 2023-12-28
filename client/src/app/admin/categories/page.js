'use client'

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { message, Button, Modal, Card } from 'antd';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import styles from '@/styles/Categories.module.css';
import Nav from '@/components/NavBar/page';
import Footer from '@/components/Footer/page';

const gridStyle = {
  width: '200px',
  textAlign: 'center',
  margin: '0px 10px',
  marginBottom:'20px'

};
const modalFooter = {
  display:'flex',
  flexDirection: 'row',
  marginTop: '30px' 
}

const SignupSchema = Yup.object().shape({

  productName: Yup.string().required('Required'),
  Description: Yup.string().
    required('Required'),
  Brand: Yup.string(),
  price: Yup.string(),
  Image: Yup.string(),
  Category: Yup.string()
});


export const index = () => {
  const [categoryList, setCategoryList] = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedEditCat, setSelectedEditCat] = useState({});
  const [messageApi, contextHolder] = message.useMessage();


  const showModal1 = (item) => {
    setSelectedEditCat(item);
    setIsModalOpen1(true);
  };
  const showModal2 = (item) => {
    setSelectedEditCat(item);
    setIsModalOpen2(true);
  };
  const handleCancel = () => {
    setIsModalOpen1(false);
    setIsModalOpen2(false);
  };

  const categoryFetch = async () => {
    try{
      const res = await fetch(`http://localhost:4000/categories`)
      const data = await res.json()
      setCategoryList(data.categoryList)
    }catch(err){
      console.log(err);
    }
  }


  useEffect(() => {
    categoryFetch()
  }, [])


  const registerValidCateogries = async(values, resetForm) => {
    const res = await fetch('http://localhost:4000/categories', {
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
    if (res.status === 200) {
      categoryFetch();
      resetForm();
    }
  };

  const deleteCat = async (id) => {
    const res = await fetch('http://localhost:4000/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
    console.log(res)
    if (res.status === 200) {
      categoryFetch();
      setIsModalOpen2(false);
    }
  };


  const editCat = async (values, resetForm) => {
    const res = await fetch('http://localhost:4000/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
    if (res.status === 200) {
      categoryFetch();
      handleCancel();
      resetForm()
    }
  };


  const EditForm = () => {
    return (
      <Formik
        initialValues={selectedEditCat}
        enableReinitialize
        // validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          editCat(values, resetForm)
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.editForm}>
            <div>
              <label>Category name:</label>
              <Field name="categoryName" placeholder="categoryName" />
              {errors.categoryName && touched.categoryName ? (
                <div>{errors.categoryName}</div>
              ) : null}
            </div>

            <div>
              <label>Max weight (in kg):</label>
              <Field name="maxWeight" placeholder="maxWeight" />
              {errors.maxWeight && touched.maxWeight ? (
                <div>{errors.maxWeight}</div>
              ) : null}
            </div>

            <div>
              <label>Price per unit kg:</label>
              <Field name="pricePerUnitKg" placeholder="pricePerUnitKg" />
              {errors.pricePerUnitKg && touched.pricePerUnitKg ? (
                <div>{errors.pricePerUnitKg}</div>
              ) : null}
            </div>

            <br />
            <button className={styles.submitBtn} type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <>
    <Nav/>
    <div className={styles.container}>
    <div className={styles.Box}>
    <h3 style={{fontSize:'30px',fontWeight:'bold',textAlign:'center'}}>Add new category</h3>
      <Formik
        initialValues={{
          categoryName: '',
          maxWeight: '',
          PricePerUnitKg: ''
        }}
        // validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          registerValidCateogries(values, resetForm);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.addCategoryForm}>
            <div className={styles.formDiv}>
              {contextHolder}
              <Field name="categoryName" type="text" placeholder="Enter your  categoryName" />
              {errors.categoryName && touched.categoryName ? <div>{errors.categoryName}</div> : null}

              <Field name="maxWeight" type="text" placeholder="Enter your maxWeight" />
              {errors.maxWeight && touched.maxWeight ? <div>{errors.maxWeight}</div> : null}

              <Field name="PricePerUnitKg" type="text" placeholder="Enter your Price/Unit kg" />
              {errors.PricePerUnitKg && touched.PricePerUnitKg ? <div>{errors.PricePerUnitKg}</div> : null}
              <br />
              <button className={styles.submitBtn} type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal title="Edit category" open={isModalOpen1} onCancel={handleCancel} footer={null}>
        <EditForm />
      </Modal>
      <Modal title="Delete category" open={isModalOpen2} onCancel={handleCancel} onOk={() => deleteCat(selectedEditCat._id)}>
        <p>Are you sure you want to delete this category ?</p>
      </Modal>
      <Card title="Valid Categories list" style={{width:'90vw'}}>
        {categoryList.length > 0 ? categoryList.map((item, id) => {
          return <Card.Grid style={gridStyle}>
            <h3> {id + 1}.{item.categoryName}</h3>
            <br />
            <div className={styles.icons}>
              <p onClick={() => showModal1(item)}><FaEdit size={30} color='green' /></p>
              <p onClick={() => showModal2(item)}><RiDeleteBin2Fill size={30} color='red' /></p>
            </div>
          </Card.Grid>
        }) : "No categories"}
      </Card>
    </div>
    </div>
    <Footer/>
    </>

  )
};
export default index 