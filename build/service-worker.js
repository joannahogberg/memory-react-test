"use strict";var precacheConfig=[["/memory-react-test/index.html","dcf332fafad845273365470f6328d7c7"],["/memory-react-test/static/css/main.ff9d174e.css","0753392a1319fc17e9da54efab20c94f"],["/memory-react-test/static/js/main.dac1a551.js","6179e6e02ce436e4160efc4d638b29d7"],["/memory-react-test/static/media/_0.02a4e68b.png","02a4e68b3ede270590b79de21af0f993"],["/memory-react-test/static/media/_1.bca19d1c.png","bca19d1c2b630b35efd1a24ba91e4816"],["/memory-react-test/static/media/_10.da4222a3.png","da4222a37bf89e6c8615e34ff7d7853d"],["/memory-react-test/static/media/_11.68d562d6.png","68d562d6f4a8cdb074e670a9dff26f95"],["/memory-react-test/static/media/_12.1916da71.png","1916da71ba3bf1054e3ca2505acd243c"],["/memory-react-test/static/media/_13.b1e4ebab.png","b1e4ebab914314699997e2cafe3883ee"],["/memory-react-test/static/media/_14.31a9400c.png","31a9400cc44669fa619d4b862c27e938"],["/memory-react-test/static/media/_15.5995c221.png","5995c221ddb9d79a3a03cefb69df8d8f"],["/memory-react-test/static/media/_16.fff949b1.png","fff949b1c29b59db03e4c0fe79743fa8"],["/memory-react-test/static/media/_17.86440884.png","86440884b622e718994e5212359ea3e9"],["/memory-react-test/static/media/_2.bf22e58f.png","bf22e58fc69b11474f2a7380a3718352"],["/memory-react-test/static/media/_3.9a8a517e.png","9a8a517ed465247bc3df560dd1949021"],["/memory-react-test/static/media/_4.77acaa9b.png","77acaa9b6e439e3033d8e634e0df883c"],["/memory-react-test/static/media/_5.e037099b.png","e037099b19bc80d1246af92977bd33b4"],["/memory-react-test/static/media/_6.cc9353b7.png","cc9353b7caa4f8578c79f7feb5667df3"],["/memory-react-test/static/media/_7.8ff98161.png","8ff981614867b1c1ff49f40ea1576d38"],["/memory-react-test/static/media/_8.c5373886.png","c5373886a14e969bf25eab8fed1b4042"],["/memory-react-test/static/media/_9.f840ba1d.png","f840ba1d8d6d34c9a97b307d536b9b09"],["/memory-react-test/static/media/backside.6c7207a2.png","6c7207a2c61d62356632969b7bff64a4"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],r=new URL(t,self.location),n=createCacheKey(r,hashParamName,a,/\.\w{8}\./);return[r.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var r=new Request(a,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),r="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,r),t=urlsToCacheKeys.has(a));var n="/memory-react-test/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(n,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});