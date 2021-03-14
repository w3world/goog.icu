import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./app/App"

ReactDOM.render(<App />, document.querySelector("#app"))


/*
interface Rules {
  name: string
  domain: string
  path: string
}



// todo: use indexdb for sniffed results
interface MyStorage {
  sniffed: Record<string, any>
}

const storage:MyStorage = {
  sniffed: {},
}

async function sniffResource(src: string, timeout = 200) {
  // create a http request and see 200 statuts without timeout
  const _start = tik()
  engines.map(engine => {
    let duration = -1;
    // multiple resources + 1 timeout promises, first returns then ends all
    const requestPromise = engine.resources.map(resource => {
      // todo: debounce within time frame
      sniffWithFetch(src).then(response => {
        duration = tik() - _start
      })// .catch()
    })
  })
  
}


function clear(storageName: string, jsName: string, domName: string) {
  // clear the localstorage item
  if (storageName) {
    storage.sniffed[storageName] = {}
  }

  // clear the JS context item
  // for exmaple, when cleaning the google map api, we need to eval 'delete google' before
  // re-load the js script
  if (jsName){
    try{
      delete (window as any)[jsName]
    } catch (e) {}
  }

  // clear the dom element
  if (domName) {
    try{
      document.querySelector(`#${domName}`).remove()
    } catch (e) {}
  }

}



// function installServiceWorker() {
//   // Service Worker registration
//   const navigator = window.navigator
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then(function () {
//         console.log("Service Worker registered.");
//       });
//   }
// }



*/