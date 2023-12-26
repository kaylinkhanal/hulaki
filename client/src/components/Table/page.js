'use client'
import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
const { Column } = Table;

const App = (props) => {

  return (
    <Table dataSource={props.list}>
      {props?.title?.map((item) => {
        return <Column title={item} dataIndex={item} key={item} />
      })}


      {props.action && (
        <Column
          title="Action"
          key="action"
          render={(item) => (
            <Space size="middle">
              <a onClick={() => props.onEdit(item)}>Edit </a>
              <a onClick={() => props.onDelete(item._id)}>Delete</a>
            </Space>
          )}
        />
      )}
      {
        props.rider &&
       (<>
       <Column
          title="Status"
          key="status"
          render={(item) => (
            <Space size="large">

              <select style={{ width: '150px' }} onChange={(e)=>props.handleStatus(e,item)}>
                <option value={item.status} disabled selected>{item.status}</option>
                <option value="accepted">Rider Accepted</option>
                <option value="Reached Pickup point">Reached Pickup point</option>
                <option value="Picked up">Picked up</option>
                <option value="Reached Destination point">Reached Destination point</option>
                <option value="Order Delivered">Order Delivered</option>
              </select>
            </Space>
          )}
        />

          <Column
          title="View"
          key="View"
          render={(item) => (
              <Button onClick={()=>props.handleMapView(item)}>View </Button>
          )}
        />
       
       </> )
      }
      


    </Table>
  )
};
export default App;
