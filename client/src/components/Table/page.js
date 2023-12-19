'use client'
import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

const App = (props) => {
  const deleteUser = (id)=> {
    fetch('http://localhost:4000'+props.endpoint+"?userid="+id)
  }
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
          <a>Edit </a>
          <a onClick={()=>deleteorder(item._id)}>Delete</a>
        </Space>
      )}
    /> 

  </Table>
)};
export default App;
