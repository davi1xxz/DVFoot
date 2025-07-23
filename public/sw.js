// Service Worker para Time Manager PWA
const CACHE_NAME = 'time-manager-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

// URLs essenciais para cache
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icone.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-192-maskable.png',
  '/icon-512-maskable.png',
  '/src/main.tsx',
  '/offline.html'
];

// URLs de recursos dinâmicos
const dynamicUrls = [
  '/api/',
  '/data/',
  'https://fonts.googleapis.com/',
  'https://images.unsplash.com/'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Interceptar requisições com estratégia avançada
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estratégia Cache First para recursos estáticos
  if (urlsToCache.some(cachedUrl => request.url.includes(cachedUrl))) {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request))
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Estratégia Network First para APIs
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/data/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone e cache a resposta
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          // Fallback para cache se network falhar
          return caches.match(request)
            .then(response => response || new Response(
              JSON.stringify({ error: 'Offline', cached: true }),
              { headers: { 'Content-Type': 'application/json' } }
            ));
        })
    );
    return;
  }

  // Estratégia padrão: Cache First com Network Fallback
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(request)
          .then(fetchResponse => {
            // Cache recursos dinâmicos
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then(cache => cache.put(request, responseClone));
            }
            return fetchResponse;
          })
          .catch(() => {
            // Fallback para página offline
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Push Notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do Time Manager',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Time Manager', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Função para sincronizar dados
async function syncData() {
  try {
    console.log('Sincronizando dados em background...');
    
    // Simular sincronização de dados
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: Date.now() })
    }).catch(() => null);
    
    if (response && response.ok) {
      console.log('Sincronização bem-sucedida');
      // Notificar usuário sobre sincronização
      self.registration.showNotification('Time Manager', {
        body: 'Dados sincronizados com sucesso!',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'sync-success'
      });
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
}

// Registrar periodic sync
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Limpeza de caches antigos
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
      // Claim clients para controle imediato
      await self.clients.claim();
      // Registrar periodicSync apenas se suportado
      if ('periodicSync' in self.registration) {
        try {
          await self.registration.periodicSync.register('background-sync', {
            minInterval: 24 * 60 * 60 * 1000, // 24 horas
          });
        } catch (err) {
          console.log('Periodic sync não suportado:', err);
        }
      }
    })()
  );
});
