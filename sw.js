const C='trip-v6',A=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request).then(h=>{const n=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque'))caches.open(C).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>h||caches.match('./index.html'));return h||n}))});
