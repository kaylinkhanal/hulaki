'use client'
import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

const App = (props) => {
  const deleteorder = async (id) => {
    const res = await fetch('http://localhost:4000/users', {
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
      orderFetch()
     }
  };

  const editorder = async (values,resetForm) => {
    const res = await fetch('http://localhost:4000/users', {
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
      orderFetch();
      resetForm()
    }
  };
  return(
  <Table dataSource={props.list}>
    {props?.title?.map((item)=>{
      return   <Column title={item} dataIndex={item} key={item} />
    })}
  
  
  <Column
      title="Action"
      key="action"
      render={(item) => (
        <Space size="middle">
           <a onClick={()=>editorder(item._id)}>Edit</a>
          <a onClick={()=>deleteorder(item._id)}>Delete</a>
        </Space>
      )}
    /> 

  </Table>
)};
export default App;
