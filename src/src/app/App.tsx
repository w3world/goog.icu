import React, { useState, useEffect, useRef, useReducer } from 'react';
import { SearchEngine, defaultSearchEngines } from "../data/SearchEngine";
import Sniffer from '../components/Sniffer/Sniffer';
import HeartRate from "../components/HeartRate/HeartRate";
import Image from "react-bootstrap/Image";

import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePrevious, useEvent } from '../utils/use';
import SearchBox from "../components/SearchBox/SearchBox";
import { tik } from '../utils/util';
import Notice from '../components/Notice/Notice';

import './App.css';
import { Container, Row, Col } from 'react-bootstrap';


type EngineProps = {
  id: string,
  isLoading?: boolean,
  isAvailable?: boolean,
  duration?: number,
}
type IEngineProps = SearchEngine & EngineProps
type EngineAction =
  | { type: 'update', payload: EngineProps }
  | { type: 'success' }

// Returns the primay engines
function warm(map: Record<string, SearchEngine>): IEngineProps[] {
  return Object.entries(map)
    .map(v => { return { ...v[1], 'id': v[0] } })
    // Returns the primary engine in each family
    // .filter(eng => eng.family ? !!eng.familyPrimary : true)
    // High to low
    .sort((x, y) => y.priority - x.priority)
}

function App() {
  /**
   * Constants
   */
  // Default delay time in Millisecond
  const DEFAULT_DELAY = 2000

  /**
   * States
   */
  // Use function to make sure primary engines only calcultaed once.

  const engineReducer = (state: IEngineProps[], action: EngineAction) => {
    switch (action.type) {
      case 'success':
        return state;
      case 'update':
        return state.map(engine => engine.id == action.payload.id ?
          { ...engine, ...action.payload } : engine)
    }
  }

  // function updateEngine(e: SearchEngine, newE:SearchEngine) {
  //   setEngines(engines.map(engine => {
  //     return e.id === engine.id ? newE : engine
  //   }))
  // }

  const [engines, dispatchActionEngines] = useReducer(engineReducer, warm(defaultSearchEngines))
  // The interval between two pings. In Millisecond.
  const [delay, setDelay] = useState(DEFAULT_DELAY)
  // When the current page is not active, `onfocus` is set to false
  // const [isVisibile, setIsVisibile] = useState(true)
  // When the network is offline, `onLine` is set to false
  const [onLine, setOnLine] = useState(window.navigator.onLine)
  // const [heartbeats, setHeartbeats] = useState()
  // The index of the selected engine
  const [engineIdx, setEngineIdx] = useState(0)

  const [engineStats,] = useState()

  const [isSearchBoxFocused, setSearchBoxFocused] = useState(false)


  /* 
   * Event Binding
   */
  // Only send requests when this app is visible 
  useEvent("visibilitychange", () => {
    const isPageVisibile = !document.hidden
    // setIsVisibile(currentIsVisibile)
    setDelay(isPageVisibile ? DEFAULT_DELAY : -1)
  })
  // Online/offline detection
  useEvent('online', () => {
    console.debug("You are now connected to the network.");
    setOnLine(true)
  });
  useEvent('offline', () => {
    console.debug("You are now NOT connected to the network.");
    setOnLine(false)
  });

  // todo: Preload svgs for offline usage
  // https://pwa-workshop.js.org/3-precaching/#exploring-caching-apis

  // todo: Use redux to collect sniffer analysis, and update HeartRate according to the result
  // function updateEngineDelay() {
  //   dispatch({ type: 'update', payload: })
  // }



  // todo: hide the heart rate when the search box is focused

  return (
    <Container id="main">
      <Row>
        <Col sm><SearchBox engine={engines[engineIdx]} /></Col>
      </Row>

      {/* <Notice message="" level=""/> */}

      <Row>
        {engines.map(engine => (
          <Col xs={4} sm={3} key={engine.id} className="engine-container">
            <Button className="engine-btn" variant={engine.isLoading ? "light" : "default"}
              href={engine.url}
              onMouseEnter={() => dispatchActionEngines({
                type: 'update', payload: { id: engine.id, isLoading: true }
              })}
              onMouseLeave={() => dispatchActionEngines({
                type: 'update', payload: { id: engine.id, isLoading: false }
              })}
              onClick={(e) => {
                dispatchActionEngines({
                  type: 'update', payload: { id: engine.id, isLoading: true }
                })
                // console.log(engine.isAvailable)
                if (!engine.isAvailable) {
                  e.preventDefault(); e.stopPropagation();
                }
              }}
            >
              <Sniffer engine={engine} delay={delay} highlight={true}
                onUpdate={(engineProps: EngineProps) => dispatchActionEngines({
                  type: 'update', payload: engineProps
                })} />
              <span className="engine-name">{engine.name}</span>
            </Button>
          </Col>
        ))}
      </Row>

      <Row>
        <Col><HeartRate duration={delay} on={onLine} /></Col>
      </Row>

    </Container>
  );
}

export default App