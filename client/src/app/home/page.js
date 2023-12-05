'use client'
import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { Avatar, Divider, Tooltip, Button, Popover, ConfigProvider  } from 'antd';
import Card from '../../components/Card/page'
import Table from '../../components/Table/page'
import { Pagination } from 'antd';
//import Top from '../components/Top/page'


const { Search } = Input;
const { Header, Content, Footer } = Layout;
const App = () => {
  const {userDetails} = useSelector(state=>state.user)
  const [productList, setProductList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [count,setCount] = useState(0)
  const fetchProducts = async(page=1)=> {
    const res = await fetch('http://localhost:4000/products?page='+page)
    const data = await res.json()
    setProductList(data.productList) 
    setCount(data.totalCount)
  }
 

  useEffect(()=>{
  fetchProducts()
  },[])

  const text = <span>{userDetails.email}</span>;
  const content = (
    <div>
     <Link href="/profile"><span>Profile</span></Link>
      <p>Logout</p>
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
    <Layout className="layout">
     



   
         



        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
        
          
        >
        <Link href="/" >
            <Menu.Item key="alipay">
            Logo here
            </Menu.Item>
          
          </Link>
      
          <Link href="/login" >
            <Menu.Item key="alipay">
            Login
            </Menu.Item>
          
          </Link>
          <Link href="/register" >
            <Menu.Item key="alipay">
            Register
            </Menu.Item>
          
          </Link>
        
          <div
        style={{
          marginInlineStart: 80,
          clear: 'both',
          whiteSpace: 'nowrap',
        }}
      >
       
        <Popover placement="bottomRight" title={text} content={content}>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        </Popover>
      </div>
            </Menu>
     <Search
      placeholder="Enter Your Traking Order"
      enterButton="Search"
      size="medium"
      suffix={suffix}
      onChange={onSearch}
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
       
        </Breadcrumb>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        {/* <Top/> */}
        Hulaki ©2023
      </Footer>
    </Layout>
  );
};
export default App;