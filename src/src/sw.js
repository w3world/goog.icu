const staticCacheName = "GICUStatic"
const coreAssets = [
  '/',
  '/index.html',
  '/main.js',
  // even cdn js
  //jquery.js
]

// install service worker
self.addEventListener('install', evt => {
  console.log('service worker has been Installed')

  // wait until the pre-cache promises resolves
  evt.waitUntil(
    // pre-cache core shell
    caches.open(staticCacheName).then(cache => {
      console.log('caching core assets')
      cache.addAll(coreAssets)
    })
  )
})

self.addEventListener('activate', evt => {
  console.log('service worker has been Activated')

  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key != staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  )
})


self.addEventListener('fetch', evt => {
  // need to let pass the search engine resources
  if (evt.request.url != domainTarget) {}

  console.log('fetch caught')
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request)
    })
  )
})