import React, { useState, useEffect, useRef } from 'react';
import { useInterval } from "../Util/use";
import { tik } from '../Util/util';
import { sniffWithFetch } from "../Util/loader";
import Indicator, { IndicatorStatus, IndicatorProps } from '../Indicator/Indicator'
import { SearchEngine } from "../SearchEngine";
import Badge from "react-bootstrap/Badge";
import './Sniffer.css';

interface SnifferProps {
  engine: SearchEngine
  delay: number
  // onfocus: boolean
}

function Sniffer({engine, delay}: SnifferProps) {

  const [status, setStatus] = useState(IndicatorStatus.LOADING)
  const [startAt, setStartAt] = useState(0)
  const [endAt, setEndAt] = useState(0)

  function update(status: IndicatorStatus, startAt: number) {
    console.debug(`status: ${status}, time: ${startAt}`)
    setStatus(status)
    setStartAt(startAt)
    setEndAt(tik())
  }

  function sniff(){
    const startAt = tik()
    let p:Promise<any> = Promise.resolve();
    try {
      const timeout = delay
      // todo: sniff with all resources
      p = sniffWithFetch({src: engine.resources[0], timeout})
      // setStatus(IndicatorStatus.LOADING)
    } catch(ex) {
      console.debug('caught sniff error', ex)
    } finally {
      p.then(res => {
        // console.debug(`${engine.resources[0]} res`, res)
        update(IndicatorStatus.VALID, startAt)
      })
      .catch(err => {
        // console.debug(`${engine.resources[0]} err`, err)
        update(IndicatorStatus.ERROR, startAt)
      })
    } 
      
  }

  useInterval(sniff, delay)

  function duration(startAt: Timestamp, endAt: Timestamp) {
    const t = endAt - startAt
    if (t > delay) {
      return delay
    } else {
      return t
    }
  }

  // todo: gray the overtime status

  return (
    <>
      <Indicator status={status} updatedAt={startAt} animationRefresh={true}/>
      <Badge variant={status}>{duration(startAt, endAt)}<span className="time-ms">ms</span></Badge>
    </>
  )

}

export default Sniffer