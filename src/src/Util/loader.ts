import { tik, uid, mixParams } from "./util";

export enum Extension {
  JS,
  JSON,
  IMG,
  OTHER
}

export function isExtension(src: string, ext: Extension) {
  return ext === extensionFromPath(src)

  function extensionFromPath(_src: string) {
    if (_src.endsWith('.js')) { return Extension.JS }
    if (_src.endsWith('.json')) { return Extension.JSON }

    const imageExtension = ['.png', '.jpg', '.jpeg', 'gif', 'webp']
    if (imageExtension.find(img => _src.endsWith(img)) !== undefined) {
      return Extension.IMG
    }

    return Extension.OTHER
  }
}

enum Method {
  GET = 'GET',
  POST = 'POST',
  HEAD = 'HEAD'
}

interface SniffOptions {
  src: string
  method?: Method
  timeout?: number
}

interface Trailable {
  startAt?: number,
  endAt?: number,
  duration?: number
  operation?: string,
  data?: any,
  message?: string
}

interface PromiseResult extends Trailable {

}

interface SniffResult extends PromiseResult {
  src: string,
  refreshToken?: string,
}

type PromiseResovler = (sr: PromiseResult) => void
type SniffResovler = (sr: SniffResult) => void

export function sniffWithFetch({
  src,
  method = Method.HEAD,
  timeout = 3000
}: SniffOptions): Promise<SniffResult> {
  if ('fetch' in window) {
    const fetchPromise = window.fetch(src, {
      method: method,
      cache: 'no-cache',
      credentials: 'omit',
      mode: 'no-cors',
    })
    return promiseTimeout(fetchPromise, timeout)
  } else {
    return new Promise((_, reject: SniffResovler) => {
      reject({
        src, message: "Native fetch is not supported!"
      })
    })
  }
}

/*
export function sniffWithScriptTag(src: string): Promise<SniffResult> {
  const _uid = uid()
  return elementTag(src, _uid)
}


function elementTag(src: string, refreshToken: string) {
  return new Promise((resolve: SniffResovler, reject: SniffResovler): void => {
    let resolved = false
    let errored = false
    const startAt = tik()
    const body = document.getElementsByTagName('body')[0]
    const tag = document.createElement('script');

    const handleLoad = () => {
      if (resolved != true) {
        const endAt = tik()
        resolved = true; resolve({ src, refreshToken, startAt, endAt, duration: endAt - startAt })
      }
    }
    const handleReject = () => {
      if (errored != true) {
        const endAt = tik()
        errored = true; reject({ src, refreshToken, startAt, endAt, duration: endAt - startAt })
      }
    }

    if (isExtension(src, Extension.JS)) {
      tag.type = 'text/javascript';
      // tag.async = false; // Load in order   
      tag.async = true
      tag.onreadystatechange = function () {
        if (resolved) return handleLoad();
        if (errored) return handleReject();
        const state = tag.readyState;
        if (state === 'complete') {
          handleLoad()
        } else if (state === 'error') {
          handleReject()
        }
      }
    }

    tag.addEventListener('load', handleLoad)
    tag.addEventListener('error', handleReject);
    tag.id = refreshToken;
    tag.src = mixParams(src, { refreshToken })
    body.appendChild(tag);
    // return tag;
  });
}
*/


/* Applying a timeout to your promises
 * ref: https://italonascimento.github.io/applying-a-timeout-to-your-promises/
 */
function promiseTimeout(promise: Promise<any>, ms: number = 2000) {

  // Create a promise that rejects in <ms> milliseconds
  let timeout = new Promise((_, reject: PromiseResovler) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      const _tik = tik()
      reject({
        startAt: _tik - ms,
        endAt: _tik,
        message: `Timed out in ${ms} ms.`,
      })
    }, ms)
  })

  // Returns a race between our timeout and the passed in promise
  return Promise.race([
    promise,
    timeout
  ])
}