'use client'
import React, { useState, useEffect, useRef } from 'react'
import { GoogleMap, useLoadScript, MarkerF, Autocomplete } from '@react-google-maps/api'
import styles from '../../styles/Map.module.css'
import { getDistance } from 'geolib';
import { useSelector, useDispatch } from 'react-redux';
import {setSenderLocDetails,setReceiverLocDetails,setSenderPosition, setReceiverPosition} from '../../redux/reducerSlices/orderSlice'
import { AudioOutlined, } from '@ant-design/icons';
import { Input, Avatar, List, Typography } from 'antd';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { Tooltip } from 'antd';
import Marquee from 'react-fast-marquee';
import { Alert } from 'antd';
const { Search } = Input;
import { io } from 'socket.io-client';
const URL =  'http://localhost:4000';
const socket = io(URL);


const lib = ["places"]
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);


function page(props) {
  useEffect(()=>{
    socket.on('connection');
  },[])
  const inputRef = useRef(null)
  const initialCenter = {
    lat: 27.7172,
    lng: 85.3240
  }
  const { senderLocDetails, receiverLocDetails , orderDetails } = useSelector(state => state.order)
  const distance =  getDistance(
    { latitude: senderLocDetails?.senderCoords?.lat, longitude: senderLocDetails?.senderCoords?.lng},
    { latitude: receiverLocDetails?.receiverCoords?.lat, longitude: receiverLocDetails?.receiverCoords?.lng},
)/1000;
  const {userDetails } = useSelector(state=> state.user)
  const dispatch = useDispatch()
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    display: 'flex'
  };
  const [searchList, setSearchList] = useState([])
  const [mapStep, setMapStep] = useState(1)
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false)
  const [center, setCenter] = useState(initialCenter)

  const listSelect = (item) => {
    if (mapStep == 1) {
      dispatch(setSenderPosition({ lat: item.lat, lng: item.lon }))
    } else {
      dispatch(setReceiverPosition({ lat: item.lat, lng: item.lon }))
    }
    dispatch(setSenderLocDetails({ city: item.city, formatted: item.formatted, address_line1: item.address_line1 }))
    setIsSearchBoxOpen(false)
  }
  const onSearch = async (value, section) => {
    if (value === '') {
      setIsSearchBoxOpen(false);
    }
    if (value !== '') {
      setIsSearchBoxOpen(true)
    }

    //save to redux
    if(section === 'receiver'){
      dispatch(setReceiverLocDetails({ city: value, formatted: value, address_line1: value }))
    }else{
      dispatch(setSenderLocDetails({ city: value, formatted: value, address_line1: value }))
    }

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json()
    setSearchList(data.results)
    //get autocomplete places list

  }
  const addReceiverLocation = async(e)=> {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json()
   if(data){
    const {city, formatted, address_line1} = data.features[0].properties
    dispatch(setReceiverLocDetails({city, formatted, address_line1,receiverCoords: {lat, lng}}))
   }
  }

  useEffect(() => {
    if (navigator.geolocation.getCurrentPosition) {
      navigator.geolocation?.getCurrentPosition(position => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  }, [])


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI",
    libraries: lib
  })

  const addSenderLocation = async (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json()
    if (data) {
      const { city, formatted, address_line1 } = data.features[0].properties
      dispatch(setSenderLocDetails({ city, formatted, address_line1, senderCoords: { lat, lng } }))
    }
  }

  const saveOrder  = async()=> {
    socket.emit('orderDetails',{ senderLocDetails, receiverLocDetails, ...orderDetails ,senderDetails: userDetails._id} )
    // const res = await fetch('http://localhost:4000/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ senderLocDetails, receiverLocDetails, ...orderDetails ,senderDetails: userDetails._id})
    // })
    // const data = await res.json()
  }

  if (loadError) return "error loading map"


  const UserSection = () => {
    return (
      <div>
              <div className={styles.searchDiv}>
            <div>
              {mapStep == 1 ? (
                <Search
                size='large'
                ref={inputRef}
                className={styles.map}
                value={senderLocDetails?.formatted || ''}
                onChange={(e) => onSearch(e.target.value, 'sender')}
                placeholder={ "Enter sender location details here"}
                onSearch={() => { setIsSearchBoxOpen(false) }}
                enterButton />
              ): (
              <Search
                size='large'
                ref={inputRef}
                className={styles.map}
                value={receiverLocDetails?.formatted || ''}
                onChange={(e) => onSearch(e.target.value, 'receiver')}
                placeholder={ "Enter reviever location details here"}
                onSearch={() => { setIsSearchBoxOpen(false) }}
                enterButton />
              )}
              
            </div>

            <div>
              {isSearchBoxOpen && (<div className={styles.header}>
                <List
                  bordered
                  dataSource={searchList}
                  renderItem={(item) => (
                    <List.Item onClick={() => listSelect(item)} className={styles.listItem}>
                      {item.formatted}
                    </List.Item>
                  )}
                />
              </div>
              )}
            </div>

          </div>
          <div className={styles.cont}>
         
          <div className={styles.price}>
          Total Distance: {distance} km
              </div> 
            <div className={styles.price1}>
            Estimated Price: {distance }
              </div>          
      </div>
          <Avatar
            className={styles.avatar}
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />


          {mapStep !== 1 &&
            <div onClick={() => setMapStep(1)} className={styles.back}>
              <IoMdArrowRoundBack size={50} />
            </div>
          }

          <div onClick={() => {
            setMapStep(2)
            if (mapStep == 2) {
              alert("Your order has been requested, Please wait for admin approval")

              saveOrder()
            }
        
          }} className={styles.proceed}>

            {
              mapStep === 2 ? (<Tooltip title="Confirm" mouseEnterDelay={0.7}><GiConfirmed size={50} color='green' /></Tooltip>)
                : <IoMdArrowRoundForward size={50} />
                
            }

          </div>
    
 
          <Alert
           className={styles.alertBox}
            banner
            message={
              <>
             
               <Marquee pauseOnHover gradient={false} speed={20}>
              {
                mapStep===1 ? "Enter sender location details from the google map to continue  and proceed to the next page ."
                : "Enter receiver location details from the google map to continue and to proceed click on the confirm button"
               }
              </Marquee>
     
              </>
             
            }
          />
      </div>
    )
  }
  if (isLoaded) {

    return (
      <div>
        <GoogleMap
          mapContainerStyle={props.containerStyle || containerStyle}
          center={center}
          zoom={props.userType==='rider' ? 12 : 14}
          onClick={() => setIsSearchBoxOpen(false)}
        >
        {(mapStep === 1 || props.userType == 'rider' ) && (
              <MarkerF
              onDragEnd={addSenderLocation}
              draggable={props.userType !== 'rider'}
              position={senderLocDetails.senderCoords}
              />
        )}
           
           {(mapStep === 2 || props.userType == 'rider' )&& (
              <MarkerF
              onDragEnd={addReceiverLocation}
              draggable={props.userType !== 'rider'}
              position={receiverLocDetails.receiverCoords}
            />
        )}
          
      

       {props.userType !== 'rider' &&  <UserSection/>}
        </GoogleMap>
      </div>
    )
  } else {
    return "loading..."
  }
}

export default page