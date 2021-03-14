import React, { useState, useEffect, useRef } from 'react';
import { useInterval } from "../../utils/use";
import { tik } from '../../utils/util';
import { sniffWithFetch } from "../../utils/loader";
import Indicator, { IndicatorStatus, IndicatorProps } from '../Indicator/Indicator'
import { SearchEngine } from "../../data/SearchEngine";
import Badge from "react-bootstrap/Badge";
import './Sniffer.css';
import { Container } from 'react-bootstrap';

interface SnifferProps {
  engine: SearchEngine
  delay: number
  onUpdate: Function
  highlight?: boolean
  // onfocus: boolean
}

function Sniffer({engine, delay, highlight = false, onUpdate}: SnifferProps) {

  const [status, setStatus] = useState(IndicatorStatus.DEFAULT)
  const [startAt, setStartAt] = useState(0)
  const [endAt, setEndAt] = useState(0)
  // const [duration, setDuration] = useState(0)
  const [timeString, setTimeString] = useState('')
  const [timeUnit, setTimeUnit] = useState('')


  function duration(startAt: Timestamp, endAt: Timestamp) {
    let t = endAt - startAt
    let unit
    let timeString
    if (t > 1000) {
      unit = 's'
      timeString = (t / 1000).toFixed(1)
      if (t > delay) {
        timeString = `max ${(delay / 1000).toFixed( delay >= 1000 ? 0 : 1)}`
      }
    } else {
      unit = 'ms'
      timeString = t.toString()
    }

    setTimeString(timeString)
    setTimeUnit(unit)
  }

  function update(status: IndicatorStatus, startAt: number, endAt: number) {
    setStatus(status)
    setStartAt(startAt)
    setEndAt(endAt)
    duration(startAt, endAt)
    onUpdate({...engine, isAvailable: status === IndicatorStatus.VALID})
  }

  function sniff(){
    const startAt = tik()
    let p:Promise<any> = Promise.resolve();
    try {
      const timeout = delay
      p = sniffWithFetch({urls: engine.resources, timeout})
      setStatus(IndicatorStatus.DEFAULT)
      // setEndAt(0)
      // setStatus(IndicatorStatus.LOADING)
    } catch(ex) {
      console.error('[ERROR] caught sniff error', ex)
    } finally {
      p.then(res => {
        update(IndicatorStatus.VALID, startAt, tik())
      })
      .catch(err => {
        update(IndicatorStatus.ERROR, startAt, tik())
      })
    } 
      
  }

  useEffect(sniff,[])
  useInterval(sniff, delay)

  // todo: gray the overtime status
  

  return (
    <div className="sniffer-container">
      <div className="indicator-container">
        <Indicator status={status} updatedAt={startAt} animationRefresh={true}/>
      </div>
      {Boolean(endAt) &&
        <div className="indicator-floating-badge" data-highlight={highlight}>
          <Badge variant={status}>
            <span className="time-string">{timeString}</span>
            <span className="time-suffix">{timeUnit}</span>
          </Badge>
        </div>
      }
    </div>
  )

}

export default Sniffer