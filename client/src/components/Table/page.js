'use client'
import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column} = Table;

const App = (props) => {
  
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
          <a onClick={()=>props.onEdit()}>Edit </a>
          <a onClick={()=>props.onDelete(item._id)}>Delete</a>
        </Space>
      )}
    /> 

  </Table>
)};
export default App;
