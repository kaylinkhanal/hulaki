'use client'
import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Card from '../components/Card/page'
import Table from '../components/Table/page'
import { Pagination } from 'antd';
//import Top from '../components/Top/page'


const { Search } = Input;
const { Header, Content, Footer } = Layout;
const App = () => {
  const {age} = useSelector(state=>state.user)
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
          items={[{key:1, label:"login"},{key:2, label:"sign up"} ]}
          
        />
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
        Ant Design ©2023 Created by Ant UED age    {age}
      </Footer>
    </Layout>
  );
};
export default App;