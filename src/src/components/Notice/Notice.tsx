import React, { useState, useEffect, useRef } from 'react';
import Alert from "react-bootstrap/Alert";


interface NoticeProps {
  message: NoticeMessage,
  level: NoticeLevel,
  autohide: Timestamp
}


type NoticeLevel = 'success' | 'danger' | 'warning' | 'info'

export enum NoticeMessage {
  OFFLINE = "Can't reach the internet",
  ONLINE = "You are now online!",
  FAILURE_ALL = "Can't reach any site",
  FAILURE_PART = "Fails to load all sites",
  SUCC_ALL = "All sites are loaded",
}

// todo: when multiple notices are sent, reset autohide clock
function Notice({message, level, autohide}: NoticeProps) {
  // const timeoutRef = useRef();
  const [shown, setShown] = useState(true)

  useEffect(() => {
    if (autohide > 0) {
      const clock =  setTimeout(() => {
        setShown(false)
      }, autohide)
      // timeoutRef.current = clock
      return () => {
        clearTimeout(clock)
      }
    }
  }, [message, level, autohide])

  return (
    <>
      {shown && 
      <Alert variant={level}>
        {message}
      </Alert>
      }
    </>
  )

}

export default Notice