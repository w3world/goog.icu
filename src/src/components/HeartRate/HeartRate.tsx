import React, { useState, useEffect, useRef } from 'react';
import './HeartRate.css';

interface HeartRateProps{
  duration: number
  on: boolean
}

function HeartRate({duration, on}:HeartRateProps) {
  return (
    <div id="heartRate">
      <div className={`heart-rate heart-rate-${on ? 'on': 'off'}`}>
        <div className="heart-rate-placeholder"></div>
        <div className="fade-in" style={{ animationDuration: `${duration}ms` }}></div>
      </div>
    </div>
  )
}

export default HeartRate