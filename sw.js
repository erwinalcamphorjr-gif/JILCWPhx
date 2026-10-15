
const CACHE_NAME = 'jilcwphx-devotional-logo-v43';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/home-icon-192.png',
  './icons/home-icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(
              key =>
                key.startsWith('jilcwphx-devotional-') &&
                key !== CACHE_NAME
            )
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Display a notification when a push message is received.
self.addEventListener('push', event => {
  let data = {
    title: 'DEVOTIONAL TIME',
    body: "It's time to spend a moment with God's Word.",
    url: './'
  };

  if (event.data) {
    try {
      const received = event.data.json();
      data = { ...data, ...received };
    } catch {
      data.body = event.data.text() || data.body;
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './icons/home-icon-192.png',
      badge: './icons/home-icon-192.png',
      tag: 'jilcwphx-devotional-reminder',
      data: { url: data.url || './' }
    })
  );
});

// Open the app when the user taps the notification.
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    (async () => {
      const targetUrl = new URL(
        event.notification.data?.url || './',
        self.registration.scope
      ).href;

      const windows = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      });

      for (const client of windows) {
        if ('focus' in client) {
          await client.focus();
          if ('navigate' in client) {
            await client.navigate(targetUrl);
          }
          return;
        }
      }

      if (self.clients.openWindow) {
        await self.clients.openWindow(targetUrl);
      }
    })()
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then(cache =>
              cache.put('./index.html', copy)
            );
          }

          return response;
        })
        .catch(() => caches.match('./index.html'))
    );

    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request)
        .then(response => {
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then(cache =>
              cache.put(request, copy)
            );
          }

          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
