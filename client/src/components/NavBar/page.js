'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { Avatar, Divider, Tooltip, Button, Popover, ConfigProvider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from '../../redux/reducerSlices/userSlice'


const Nav = () => {
  const dispatch = useDispatch()
  const { userDetails, isLoggedIn } = useSelector(state => state.user)

  const text = <span>{userDetails.email}</span>;

  const content = (
    <div>
      <Link href="/profile"><span>Profile</span></Link>
      <p onClick={() => dispatch(handleLogout())}>Logout</p>
    </div>
  );

  const navDiv = {
      marginInlineStart: 1100,
      clear: 'both',
      whiteSpace: 'nowrap',
     
  }

  return (

    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
    >
      <Link href="/" >
        <Menu.Item key="alipay">
          <Image src='/hulakilogo.png' alt='' width={55} height={55} style={{marginLeft:'85px'}}/>
        </Menu.Item>

      </Link>
      {isLoggedIn ? (
        <div
          style={navDiv}
        >
          <Popover placement="bottomRight" title={text} content={content}>
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          </Popover>
        </div>
      ) : (
        <div
          style={navDiv}
        >
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
        </div>
      )}
    </Menu>
  )
}



export default Nav