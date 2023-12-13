'use client'
import React, {useState, useEffect} from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import styles from '../../styles/Map.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {setSenderLocDetails} from '../../redux/reducerSlices/orderSlice'
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
  const {senderLocDetails} = useSelector(state=>state.order)
  const dispatch= useDispatch()
    const containerStyle = {
        width: '100vw',
        height: '100vh'
      };
      const [center, setCenter] = useState({
        lat: 27.7172,
        lng: 85.3240
      })
  
      useEffect(()=>{
        if(navigator.geolocation.getCurrentPosition){
        navigator.geolocation?.getCurrentPosition(position=> {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude 
          })
        })
        }
      },[])
   
      
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI"
      })
      const addSenderLocation = async(e)=> {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
        );
        const data = await res.json()
       if(data){
        const {city, formatted, address_line1} = data.features[0].properties
        dispatch(setSenderLocDetails({city, formatted, address_line1}))
       }
      }

      if(loadError) return "error loading map"
      
     if(isLoaded) {
        return (
            <div>
            <GoogleMap
               mapContainerStyle={containerStyle}
               center={center}
            zoom={14}
    >    
    <MarkerF
    onDragEnd={addSenderLocation}
    draggable={true}
    position={center}
    />
     <div className={styles.header}>
Select order pick up address:

</div>    
        <Search className={styles.map}
        value={senderLocDetails?.formatted || ''}
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