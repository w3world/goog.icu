import React, { useState, useEffect, useRef } from 'react';
import { SearchEngine, defaultEngines, warm } from "./SearchEngine";
import Sniffer from './Sniffer/Sniffer';
import HeartRate from "./HeartRate/HeartRate";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePrevious, useEvent } from './Util/use';
import { tik } from './Util/util';
import Notice from './Notice/Notice';

function App() {
  // Default delay time in Millisecond
  const DEFAULT_DELAY = 3000
  // Use function to make sure primary engines only calcultaed once.
  const [engines, setEngines] = useState(() => warm(defaultEngines))
  // The interval between two pings. In Millisecond.
  const [delay, setDelay] = useState(DEFAULT_DELAY)
  // When the current page is not active, `onfocus` is set to false
  // const [isVisibile, setIsVisibile] = useState(true)
  // When the network is offline, `onLine` is set to false
  const [onLine, setOnLine] = useState(window.navigator.onLine || true)
  // const [heartbeats, setHeartbeats] = useState()
  // 
  

  // Event Binding
  useEvent("visibilitychange", () => {
    const isPageVisibile = !document.hidden
    // setIsVisibile(currentIsVisibile)
    setDelay(isPageVisibile ? DEFAULT_DELAY : -1)
  })
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



  return (
    <div>
      {/* <MyIP /> */}

      <HeartRate duration={delay} on={onLine} />

      {/* <Notice message="" level=""/> */}

      {engines.map(engine => (
        <li key={engine.id}>
          <Button variant="outline-primary" href={engine.url}>
          <Card style={{ width: '18rem', backgroundColor: 'transparent' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>{engine.name}</Card.Title>
              <Card.Text>
                Some quick example text
              </Card.Text>
              <Sniffer engine={engine} delay={delay} />
              {/* <Button variant="success" href={engine.url}>Open {engine.name}</Button> */}
            </Card.Body>
          </Card>
          </Button>
        </li>
      ))}

    </div>
  );
}

export default App