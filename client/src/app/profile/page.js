'use client';
import React from 'react'
import { Divider } from 'antd';
import Image from 'next/image';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

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
    return (
        <>
           <text className='detailsHeading'>Customer profile</text>
           <Divider style={{backgroundColor:'black'}}/>
            <div className='personalInfo'>
                <div className='basicInfo'>
                    <span>Name: Binod Bastola</span>
                    <span>Email: bndbstl@gmail.com</span>
                    <span>Phone: 9814466766</span>
                    <span>Address: Devchuli-16,Nawalpur,Nepal</span>
                </div>
                <div className='profilePic'>
                    <Image src='/hulakilogo.png' width={220} height={220} alt='profilepic' />
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Change profile pic</Button>
                    </Upload>
                </div>

            </div>
        </>
    )
}




const page = () => {
    return (
        <>
            <div className='profileContainer'>
                <div className='sider'>
                    <div className='heading'>
                        <Image src='/hulakilogo.png' width={50} height={50} />
                        <span>Binod Bastola</span>
                    </div>
                    <Divider style={{backgroundColor:'white'}}/>
                    <div className='menu'>
                        <span>Personal details</span>
                        <span>Edit your profile</span>
                        <span>Your orders</span>
                        <span>Logout</span>
                    </div>
                </div>
                <div className='content'>
                    <div className='contentBox'>
                        <PersonalDetails />
                    </div>
                </div>
            </div>
        </>

    )
}

export default page