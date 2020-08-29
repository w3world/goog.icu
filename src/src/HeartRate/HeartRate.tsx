import React, { useState, useEffect, useRef } from 'react';
import './HeartRate.css';
import heartRateGreenSvg from "./heart-rate-green.svg";

interface HeartRateProps{
  duration: number
  on: boolean
}

function HeartRate({duration, on}:HeartRateProps){

  const style = { animationDuration: `${duration}ms` } as React.CSSProperties
  return (
    <div className={`heart-rate heart-rate-${on ? 'on': 'off'}`}>
      <div className="heart-rate-placeholder"></div>
      <div className="fade-in" style={style}></div>
    </div>
  )
}

export default HeartRate