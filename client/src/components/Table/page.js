import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'productName',
    dataIndex: 'productName',
    key: 'productName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'price',
    dataIndex: 'price',
    key: 'price',
  },
];

const App = (props) => {
return (
<div>
        <Table columns={columns} dataSource={props.data} />
</div>
)

};
export default App;