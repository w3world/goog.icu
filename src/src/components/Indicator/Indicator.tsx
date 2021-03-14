import React, { useState, useEffect } from 'react';
import './Indicator.css';


export interface IndicatorProps {
  status?: IndicatorStatus
  updatedAt?: number
  animationRefresh?: boolean 
}

export enum IndicatorStatus {
  DEFAULT = 'default',
  VALID = 'success', 
  LOADING = 'warning', 
  ERROR = 'danger',
}


function Indicator({status, updatedAt, animationRefresh = true}: IndicatorProps) {

  const [isAnimating, setIsAnimating] = useState(true)
  
  // When an update coming in, stops the animation in next frame and repaint the new
  // useEffect(() => {
  //   if (animationRefresh) {
  //     setIsAnimating(false)
  //     window.requestAnimationFrame(function () {
  //       window.requestAnimationFrame(function () {
  //         setIsAnimating(true)
  //       })
  //     })
  //   }
  // }, [updatedAt])

  return (                     
    <div className="indicator">
      <div className={status}>
        <div className="validationAffix">
          <div className="validationIndicator"></div>
        </div>
      </div>
    </div>
  );
};

export default Indicator