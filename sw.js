/* Service worker — Alou Cissé
   Changez VERSION à chaque mise à jour du site pour forcer le rafraîchissement. */
const VERSION = 'ac-v3';
const SHELL = ['./', './index.html', './config.js', './demo-data.js', './manifest.json', './icon-192.png', './icon-512.png'];
const LIBS = ['www.gstatic.com', 'cdnjs.cloudflare.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== 'ac-libs').map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Pages : réseau d'abord, cache si hors-ligne
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Bibliothèques versionnées (Firebase, QR code) : cache d'abord
  if (LIBS.includes(url.hostname)) {
    e.respondWith(
      caches.open('ac-libs').then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; })))
    );
    return;
  }

  // Fichiers du site : cache immédiat + mise à jour en arrière-plan
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.open(VERSION).then((c) => c.match(req).then((hit) => {
        const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
  }
  // Le reste (Firestore, PayPal, taux de change) passe directement par le réseau.
  // Le catalogue hors-ligne est assuré par le cache persistant de Firestore.
});
