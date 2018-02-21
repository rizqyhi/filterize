var CACHE_NAME = 'filterize-v1'
var fileList = [
  '/filterize',
  'css/normalize.css',
  'css/milligram.css',
  'css/cssgram.css',
  'css/style.css',
  'js/dom-to-image.js',
  'js/script.js'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(fileList)
      })
      .then(function() {
        console.log('Service worker install complete.')
      })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response
        }
        
        return fetch(event.request)
      })
  )
})