'use client'

import React from 'react';
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';

import { message } from 'antd';
import { Dropdown, } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';

const options = [];
const categories = ['Electronics', 'Clothes', 'Groceries', 'Document', 'Heavy Items']
for (let i = 0; i < 5; i++) {
    options.push({
        label: categories[i],
        value: categories[i],
    });
}
const handleChange = (value) => {
    console.log(`selected ${value}`);
};


const ProductSchema = Yup.object().shape({

    productCategory: Yup.string().required('Required'),
    productCategory: Yup.string().required('Required'),
    weight: Yup.string().required('Required'),
    locationFrom: Yup.string().required('Required'),
    senderName: Yup.string().required('Required'),
    senderPhoneNumber: Yup.string().required('Required'),
    receiverName: Yup.string().required('Required'),
    receiverPhoneNumber: Yup.string().required('Required'),
    locationTo: Yup.string().required('Required'),
    estimatedPrice: Yup.string().required('Required'),

});

export const index = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const productHandle = async (values) => {
        const res = await fetch('http://localhost:4000/create-products', {
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
    }

    return (
        <div className='form'>
            <h1>Product Information</h1>


            <Formik
                initialValues={{

                    productCategory: '',
                    weight: '',
                    locationFrom: '',
                    senderName: '',
                    senderPhoneNumber: '',
                    receiverName: '',
                    receiverPhoneNumber: '',
                    locationTo: '',
                    estimatedPrice: '',


                }}
                validationSchema={ProductSchema}
                onSubmit={values => {
                    // same shape as initial values
                    productHandle(values)
                }}
            >
                {({ errors, touched }) => (
                    <Form >
                        {contextHolder}
                        {/* <Field name="productCategory" type="text" placeholder="Enter the type of product" />
                        {errors.productCategory && touched.productCategory ? <div>{errors.productCategory}</div> : null}
                        <br /> */}

                        <Space
                            style={{
                                width: '100%',
                            }}
                            direction="vertical"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Select the category of item"
                                defaultValue={[]}
                                onChange={handleChange}
                                options={options}
                            />

                        </Space>

                        <br />

                        <Field name="weight" type="text" placeholder="Estimated Weight" />
                        {errors.weight && touched.weight ? <div>{errors.weight}</div> : null}


                        <br />
                        <br />
                        <Field name="locationFrom" type="text" placeholder="Starting Destination" />
                        {errors.locationFrom && touched.locationFrom ? <div>{errors.locationFrom}</div> : null}
                        <br />
                        <br />
                        <Field name="locationTo" type="text" placeholder="Final Destination" />
                        {errors.locationTo && touched.locationTo ? <div>{errors.locationTo}</div> : null}
                        <br />
                        <br />
                        <Field name="senderName" type="text" placeholder="Sender's Name" />
                        {errors.senderName && touched.senderName ? <div>{errors.senderName}</div> : null}
                        <br />
                        <Field name="senderPhoneNumber" type="text" placeholder="Sender's Phone Number" />
                        {errors.senderPhoneNumber && touched.senderPhoneNumber ? <div>{errors.senderPhoneNumber}</div> : null}
                        <br />
                        <Field name="receiverName" type="text" placeholder="Receiver's Name" />
                        {errors.receiverName && touched.receiverName ? <div>{errors.receiverName}</div> : null}
                        <br />
                        <Field name="receiverPhoneNumber" type="text" placeholder="Receiver's Phone Number" />
                        {errors.receiverPhoneNumber && touched.receiverPhoneNumber ? <div>{errors.receiverPhoneNumber}</div> : null}
                        <br />
                        <Field name="estimatedPrice" type="text" placeholder="Estimated Price" />
                        {errors.estimatedPrice && touched.estimatedPrice ? <div>{errors.estimatedPrice}</div> : null}
                        <br />

                        <br />
                        <button type="submit">Submit</button>
                        <br />

                    </Form>
                )}

            </Formik>

        </div>


    )
};
export default index 