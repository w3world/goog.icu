import { EventHandler, useEffect, useRef } from 'react';
import { tik } from './util';

/* React style `setInterval`
 *
 * ref: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * example:
 * 
  ```
  function Counter() {
    let [count, setCount] = useState(0);

    useInterval(() => {
      // Your custom logic here
      setCount(count + 1);
    }, 1000);

    return <h1>{count}</h1>;
  }
  ```
 * 
 * callback: Function to run in interval
 * number: interval period, when it's negative the callback will be PAUSED.
 * 
 * */
export function useInterval(callback: Function, delay: number = 1000) {
  const savedCallback = useRef<Function>(() => { });

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    // Use a negative delay to pause the interval
    if (delay > 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

/**
 * useEvent
 * 
 * @param event Event name string to be registered
 * @param handler EventHandler
 */

export function useEvent(event: string, handler: EventHandler<any>) {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler as EventHandler<any>);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler as EventHandler<any>);
    };
  });
}

/*
 * WARN: NOT TESTED YET
 * Don't update too fast. If within an interval, the deps value does not change, only fire once
 *
 * useDebounce(callback, deps, [interval])
 * 
 */
/*
export function useDebounce(callback: Function, deps: any[], interval: number = 1000) {
  const savedRunAt = useRef<number>(0)
  
  useEffect(() => {
    const runAt = tik()
    if (runAt - savedRunAt.current > interval) {
      callback()
      savedRunAt.current = runAt;
    }
  }, deps)

}
*/


/*
 * Get the previous value
 *
 * example:
```
  // State value and setter for our example
  const [count, setCount] = useState(0);
  
  // Get the previous value (was passed into hook on last render)
  const prevCount = usePrevious(count);  
```
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  // so the first initial value ref.current is `undefined`
  return ref.current;

  // but want to sync with the state's initial value.
  // return ref.current || value;
}
