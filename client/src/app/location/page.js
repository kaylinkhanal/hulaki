'use client'
import React, {useState, useEffect, useRef} from 'react'
import { GoogleMap, useLoadScript, MarkerF, Autocomplete } from '@react-google-maps/api'
import styles from '../../styles/Map.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {setSenderLocDetails} from '../../redux/reducerSlices/orderSlice'
import { AudioOutlined, } from '@ant-design/icons';
import { Input,Avatar,List ,Typography} from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
 );
 
function page() {
const inputRef = useRef(null)
const initialCenter = {
  lat: 27.7172,
  lng: 85.3240
}
  const {senderLocDetails} = useSelector(state=>state.order)
  const dispatch= useDispatch()
    const containerStyle = {
        width: '100vw',
        height: '100vh'
      };
      const [searchList, setSearchList] = useState([])
      const [mapStep, setMapStep] = useState(1)
      const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false)
      const [receiverPosition, setReceiverPosition] = useState(initialCenter)
      const [center, setCenter] = useState(initialCenter)
 
      const listSelect = (item) => {
        if(formStep == 1 ){
          setSenderPosition({lat: item.lat, lng: item.lon})
        }else{
          setReceiverPosition({lat: item.lat, lng: item.lon})
        }
      
          dispatch(setSenderLocDetails({city: item.city, formatted:item.formatted, address_line1: item.address_line1}))
          setIsSearchBoxOpen(false)
      }
      const onSearch = async(value) => {
        setIsSearchBoxOpen(true)
        //save to redux
        dispatch(setSenderLocDetails({city: value, formatted:value, address_line1: value}))
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
        );
        const data = await res.json()
        setSearchList(data.results)
        //get autocomplete places list
       
      }
  
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
        googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI",
        libraries:["places"]
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
        dispatch(setSenderLocDetails({city, formatted, address_line1,senderCoords: {lat, lng}}))
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
    { mapStep === 1  ? (
      <MarkerF
      onDragEnd={addSenderLocation}
      draggable={true}
      position={senderLocDetails.senderCoords}
      />
    ) : (
    <MarkerF
        onDragEnd={addSenderLocation}
        draggable={true}
        position={receiverPosition}
        />
    )}
  
     
    <Search 
    ref={inputRef}
    className={styles.map}
        value={senderLocDetails?.formatted || ''}
        onChange={(e)=>onSearch(e.target.value)}
     placeholder="Search location on Google Map"
     onSearch={onSearch} enterButton />

   {isSearchBoxOpen && (<div className={styles.header}>
    <List
     bordered
     dataSource={searchList}
     renderItem={(item) => (
       <List.Item onClick={()=>listSelect(item)}>
         {item.formatted}
       </List.Item>
     )}
   />
 <button onClick={()=>setIsSearchBoxOpen(false)}>Close</button>

</div>    
)}

     {mapStep === 1 ?  (
      <div className={styles.guide}>Enter senders location</div>
     ):
    (
      <div className={styles.guide}>Enter Receiver location</div>
    )
    
    }
    


       
     <Avatar 
     className={styles.avatar}
     src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
      
      <div  onClick={()=> setMapStep(1)} className={styles.back}>
        Back
        </div>
        <div onClick={()=>{
          setMapStep(2)  
          if(mapStep == 2 ){
            alert("Your order has been requested, Please wait for admin approval")
          }
          }} className={styles.proceed}>
        {mapStep === 2 ? 'Confrim'  : 'Proceed'}
        </div>
    </GoogleMap>   
            </div>
        )
     }else{
        return "loading..."
     }
}

export default page