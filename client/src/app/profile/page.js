'use client'
'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Divider } from 'antd';
import Image from 'next/image';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginDetails } from '@/redux/reducerSlices/userSlice';

const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


const PersonalDetails = () => {

    const { userDetails } = useSelector(state => state.user);

    return (
        <>
            <div className='detailsHeading'>Customer profile</div>
            <Divider style={{ backgroundColor: 'black' }} />
            <div className='personalInfo'>
                <div className='basicInfo'>
                    <span>Name: {userDetails.fullName}</span>
                    <span>Role: {userDetails.role}</span>
                    <span>Email: {userDetails.email}</span>
                    <span>Phone: {userDetails.phoneNumber}</span>
                    <span>Address: {userDetails.address}</span>
                </div>
                <div className='profilePic'>
                    <Image style={{ objectFit: 'cover' }} src={`http://localhost:4000/user-avatar?userId=${userDetails._id}&id=${Math.random()}`} width={220} height={220} alt='profilepic' />
                    <Upload {...props} >
                        <Button className='uploadBtn' icon={<UploadOutlined />}>Change profile pic</Button>
                    </Upload>
                </div>

            </div>
        </>
    )
}

const EditProfile = () => {

    const { userDetails } = useSelector(state => state.user);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();

    const handleEdit=async(values)=>{
        const res = await fetch(`http://localhost:4000/profile/edit/${userDetails._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          })
          const data = await res.json()
          if(data){
            dispatch(setLoginDetails(data.userDetails));
          }
          messageApi.open({
            type: res.status == 200 ? 'success' : 'error',
            content: data.msg,
          });
    }

    return (
        <>
         {contextHolder}
            <div className='detailsHeading'>Edit Customer profile</div>
            <Divider style={{ backgroundColor: 'black' }} />
            <div className='editProfile'>
             <h4>Edit your profile details and submit to make changes</h4>
            <Formik
                initialValues={userDetails}
                // validationSchema={SignupSchema}
                onSubmit={values => {
                    handleEdit(values)
                }}
            >
                {({ errors, touched }) => (
                    <Form className='editForm'>
                        <Field name="fullName" type="fullName" placeholder="Full Name:" />
                        {errors.fullName && touched.fullName ? (
                            <div>{errors.fullName}</div>
                        ) : null}
                        <br />
                        <Field name="phoneNumber" placeholder="PhoneNumber:" />
                        {errors.phoneNumber && touched.phoneNumber ? (
                            <div>{errors.phoneNumber}</div>
                        ) : null}
                        <br />
                        <Field name="email" placeholder="Email:" />
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}
                        <br />


                        <Field name="address" type="address" placeholder="address" />
                        {errors.address && touched.address ? (
                            <div className='errors'>{errors.address}</div>
                        ) : null}
                        <br />
                        <Field component='select' name='role' id='roles' placeholder='Choose your role'>
                            <option value=''>Choose your role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Field>
                        {errors.role && touched.role ? (
                            <div className='errors'>{errors.role}</div>
                        ) : null}
                        <br />
                        <button className='submitBtn' type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
            </div>

        </>)

}


const page = () => {

    const { userDetails } = useSelector(state => state.user);
    const [personalDetails, setPersonalDetails] = useState(true);
    const [editProfile, setEditProfile] = useState(false);

    const activeTab = (active) => {
        if (active === 'personalDetails') {
            setPersonalDetails(true);
            setEditProfile(false);
        }

        if (active === 'editProfile') {
            setPersonalDetails(false);
            setEditProfile(true);
        }
    }

    return (
        <>
            <div className='profileContainer'>
                <div className='sider'>
                    <div className='heading'>
                        <Image style={{ objectFit: 'cover' }} src={`http://localhost:4000/user-avatar?userId=${userDetails._id}&id=${Math.random()}`} width={50} height={50} />
                        <span>Hi {userDetails.fullName}!</span>
                    </div>
                    <Divider style={{ backgroundColor: 'white' }} />
                    <div className='menu'>
                        <span onClick={() => activeTab('personalDetails')}>Personal details</span>
                        <span onClick={() => activeTab('editProfile')}>Edit your profile</span>
                        <span>Your orders</span>
                        <span>Change Password</span>
                        <span>Logout</span>
                    </div>
                </div>
                <div className='content'>
                    <div className='contentBox'>
                        {personalDetails && <PersonalDetails />}
                        {editProfile && <EditProfile />}
                    </div>
                </div>
            </div>
        </>

    )
}

export default page