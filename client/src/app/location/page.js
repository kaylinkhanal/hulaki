'use client'
import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import styles from '../../styles/Map.module.css'
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
        <div className={styles.map}>

        </div>
    <input/>
    </GoogleMap>
            </div>
        )
     }else{
        return "loading..."
     }
}

export default page