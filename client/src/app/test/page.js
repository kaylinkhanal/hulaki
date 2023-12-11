'use client'

import React from 'react';
import { Formik, Form, Field, Dropdown } from 'formik';
import * as Yup from 'yup';

import {  message } from 'antd';


const SignupSchema = Yup.object().shape({

  productCategory: Yup.string().required('Required'),
  weight:Yup.string().required('Required'),
  locationFrom:Yup.string(),
  locationTo:Yup.string(),
  
});

export const index = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const productHandle = async(values) => {
    const res = await fetch('http://localhost:4000/test', {
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
  
  return(
//   <div className='form'>
//     <h1>Product Information</h1>
    
    
//     <Formik
//       initialValues={{
       
//         productCategory : '',
//         weight:'',
//         locationFrom:'',
//         senderName:'',
//         senderPhoneNumber:'',
//         receiverName:'',
//         receiverPhoneNumber:'',
//         locationTo:'',
//         estimatedPrice: '',

        
//       }}
//       // validationSchema={SignupSchema}
//       onSubmit={values => {
//         // same shape as initial values
//         productHandle(values)
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form >
//          {contextHolder}
//           <Field name="productCategory" type="text" placeholder="Enter the type of product" />
//           {errors.productCategory && touched.productCategory ? <div>{errors. productCategory}</div> : null}
//           <br />
          
//           <br />
//           <Field name="weight" type="text" placeholder="Estimated Weight"/>
//           {errors.weight && touched.weight? <div>{errors.weight}</div> : null}
//           <br />
//           <br />
//           <Field name="locationFrom" type="text" placeholder="Starting Destination" />
//           {errors.locationFrom && touched.locationFrom ? <div>{errors.locationFrom}</div> : null}
//           <br />
//           <br />
//           <Field name="locationTo" type="text" placeholder="Final Destination" />
//           {errors.locationTo && touched.locationTo ? <div>{errors.locationTo}</div> : null}
//           <br />
//           <br />
//           <Field name="senderName" type="text" placeholder="Sender's Name" />
//           {errors.senderName && touched.senderName ? <div>{errors.senderName}</div> : null}
//           <br />
//           <Field name="senderPhoneNumber" type="text" placeholder="Sender's Phone Number" />
//           {errors.senderPhoneNumber && touched.senderPhoneNumber ? <div>{errors.senderPhoneNumber}</div> : null}
//           <br />
//           <Field name="receiverName" type="text" placeholder="Receiver's Name" />
//           {errors.receiverName && touched.receiverName ? <div>{errors.receiverName}</div> : null}
//           <br />
//           <Field name="receiverPhoneNumber" type="text" placeholder="Receiver's Phone Number" />
//           {errors.receiverPhoneNumber && touched.receiverPhoneNumber ? <div>{errors.receiverPhoneNumber}</div> : null}
//           <br />
//           <Field name="estimatedPrice" type="text" placeholder="Estimated Price" />
//           {errors.estimatedPrice && touched.estimatedPrice ? <div>{errors.estimatedPrice}</div> : null}
//           <br />
//           <br />
//           <button type="submit">Submit</button>
//           <br />
          
//         </Form>
//       )}
    
//     </Formik>

//   </div>
<form id="regForm" action="">

<h1>Register:</h1>


<div class="tab">Name:
  <p><input placeholder="First name..." oninput="this.className = ''"/></p>
  <p><input placeholder="Last name..." oninput="this.className = ''"/></p>
</div>

<div class="tab">Contact Info:
  <p><input placeholder="E-mail..." oninput="this.className = ''"/></p>
  <p><input placeholder="Phone..." oninput="this.className = ''"/></p>
</div>

<div class="tab">Birthday:
  <p><input placeholder="dd" oninput="this.className = ''"/></p>
  <p><input placeholder="mm" oninput="this.className = ''"/></p>
  <p><input placeholder="yyyy" oninput="this.className = ''"/></p>
</div>

<div class="tab">Login Info:
  <p><input placeholder="Username..." oninput="this.className = ''"/></p>
  <p><input placeholder="Password..." oninput="this.className = ''"/></p>
</div>

<div style="overflow:auto;">
  <div style="float:right;">
    <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
    <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
  </div>
</div>

<div style="text-align:center;margin-top:40px;">
  <span class="step"></span>
  <span class="step"></span>
  <span class="step"></span>
  <span class="step"></span>
</div>

</form>

)};
export default index 