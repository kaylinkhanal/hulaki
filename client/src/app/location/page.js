'use client'
import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import styles from '../../styles/Map.module.css'
import { AudioOutlined, } from '@ant-design/icons';
import { Input,Avatar, } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
 );
  const onSearch = (value, _e, info) => console.log(info?.source, value);
function page() {
    const containerStyle = {
        width: '100vw',
        height: '100vh'
      };
      
      const center = {
        lat: 27.7172,
        lng: 85.3240
      };
      
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI"
      })

      if(loadError) return "error loading map"
      
     if(isLoaded) {
        return (
            <div>
            <GoogleMap
               mapContainerStyle={containerStyle}
               center={center}
            zoom={14}
    >        
        <Search className={styles.map}
     placeholder="Search location on Google Map"
     onSearch={onSearch} enterButton />
     <Avatar 
     className={styles.avatar}
     src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
      
    </GoogleMap>   
            </div>
        )
     }else{
        return "loading..."
     }
}

export default page