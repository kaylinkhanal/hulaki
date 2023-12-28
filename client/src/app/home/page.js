'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { Card, Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { Timeline } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Avatar, Divider, Tooltip, Button, Popover, ConfigProvider } from 'antd';
// import Card from '../../components/Card/page'
import Table from '../../components/Table/page'
import NavBar from '@/components/NavBar/page';
import { Pagination } from 'antd';
import styles from "@/styles/Home.module.css";

//import Top from '../components/Top/page'

const { Search } = Input;
const { Header, Content, Footer } = Layout;

const App = () => {
  const router = useRouter()


  const dispatch = useDispatch()
  const { userDetails, isLoggedIn } = useSelector(state => state.user)

  const [searchList, setSearchList] = useState([])
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = () => {
   
    setIsModalOpen1(true);
  };
  <Timeline
  items={[
    {
      children: 'Create a services site 2015-09-01',
    },
    {
      children: 'Solve initial network problems 2015-09-01',
    },
    {
      children: 'Technical testing 2015-09-01',
    },
    {
      children: 'Network problems being solved 2015-09-01',
    },
  ]}
/>
  const text = <span>{userDetails.email}</span>;
  const content = (
    <div>
      <Link href="/profile"><span>Profile</span></Link>
      <p onClick={() => dispatch(handleLogout())}>Logout</p>
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
    const res = await fetch('http://localhost:4000/search-products?name=' + e.target.value)
    const data = await res.json()
    setSearchList(data.productList)
  };
  return (
    <>
      <NavBar/>
      <Layout className={styles.layout}>
        <Search onClick={() => showModal1()}
          placeholder="Enter Your Traking Order"
          enterButton="Search"
          size="medium"
          suffix={suffix}
          onChange={onSearch}
          style={{ width: '50%', marginTop: '50px' }}
        />


{isModalOpen1 && ( // Render Timeline when the modal is open
          <Timeline
            items={[
              {
                children: 'Create a services site 2015-09-01',
              },
              {
                children: 'Solve initial network problems 2015-09-01',
              },
              {
                children: 'Technical testing 2015-09-01',
              },
              {
                children: 'Network problems being solved 2015-09-01',
              },
            ]}
          />
        )}

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
            <Row gutter={24} style={{ width: '70vw', height: 'maxcontent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <Col span={5} >
                <Card className={styles.card} onClick={() => router.push('/order')} title="Order" bordered={false}>
                  Place order
                </Card>
              </Col>
              <Col span={5}>
                <Card className={styles.card} onClick={() => router.push('/history')} title="History" bordered={false}>
                  Order History
                </Card>
              </Col>
              <Col span={6}>
                <Card className={styles.card} onClick={() => router.push('/track')} title="Ongoing" bordered={false}>
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