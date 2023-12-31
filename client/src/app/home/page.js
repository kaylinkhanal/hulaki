'use client'
import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import { Card, Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Avatar, Divider, Tooltip, Button, Popover, ConfigProvider  } from 'antd';
// import Card from '../../components/Card/page'
import Table from '../../components/Table/page'
import { Pagination } from 'antd';

//import Top from '../components/Top/page'

const { Search } = Input;
const { Header, Content, Footer } = Layout;
const App = () => {
  const router = useRouter()


  const dispatch= useDispatch()
  const {userDetails,isLoggedIn} = useSelector(state=>state.user)

  const [searchList, setSearchList] = useState([])


  const text = <span>{userDetails.email}</span>;
  const content = (
    <div>
     <Link href="/profile"><span>Profile</span></Link>
      <p onClick={()=>dispatch(handleLogout())}>Logout</p>
    </div>
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  const onSearch = async (e) => {
    const res = await  fetch('http://localhost:4000/search-products?name='+e.target.value)
    const data = await res.json()
    setSearchList(data.productList)
  };
  return (
    <>
    <Layout className="layout">
     <Search
      placeholder="Enter Your Traking Order"
      enterButton="Search"
      size="medium"
      suffix={suffix}
      onChange={onSearch}
      style={{width:'50%',marginTop:'50px'}}
    />
   
    
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Row gutter={24}>
    <Col span={5}>
      <Card onClick={()=> router.push('/order')}  title="Order" bordered={false}>
        Place order
      </Card>
    </Col>
    <Col span={5}>
      <Card onClick={()=> router.push('/history')} title="History" bordered={false}>
        Order History
      </Card>
    </Col>
    <Col span={5}>
      <Card onClick={()=> router.push('/track')} title="Ongoing" bordered={false}>
        Ongoing deliveries
      </Card>
    </Col>
  </Row>
       
        </Breadcrumb>
      </Content>
    </Layout>
    </>

  );
};
export default App;