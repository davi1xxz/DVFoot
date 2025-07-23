// Service Worker para Time Manager PWA
const CACHE_NAME = 'time-manager-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

// URLs essenciais para cache
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icone.svg',
  '/icon-256.png',
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
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    Promise.race([
      // Promise principal com timeout
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('Service Worker: Cache aberto, adicionando URLs...');
          return cache.addAll(urlsToCache.filter(url => url !== '/offline.html')); // Remover URLs problemáticas
        })
        .then(() => {
          console.log('Service Worker: URLs adicionadas ao cache');
          return self.skipWaiting();
        }),
      // Timeout de 15 segundos
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout na instalação do Service Worker')), 15000);
      })
    ]).catch(error => {
      console.error('Service Worker: Erro na instalação:', error);
      // Continuar mesmo com erro para não bloquear
      return self.skipWaiting();
    })
  );
});

// Estratégia de Fetch: Stale-While-Revalidate com Timeouts
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições que não são GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar requisições do Chrome Extension
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Estratégia Stale-While-Revalidate
  event.respondWith(
    caches.open(DYNAMIC_CACHE).then(cache => {
      return cache.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          // Se a resposta da rede for válida, atualiza o cache
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });

        // Retorna a resposta do cache imediatamente se existir, senão aguarda a rede
        return cachedResponse || fetchPromise;
      }).catch(() => {
        // Fallback em caso de erro total
        return caches.match('/offline.html');
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
    icon: '/icon-256.png',
    badge: '/icon-256.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/icon-256.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icon-256.png'
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
        icon: '/icon-256.png',
        badge: '/icon-256.png',
        tag: 'sync-success'
      });
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
}

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    Promise.race([
      (async () => {
        try {
          console.log('Service Worker: Limpando caches antigos...');
          // Limpeza de caches antigos
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => {
              if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                console.log(`Service Worker: Removendo cache antigo: ${cacheName}`);
                return caches.delete(cacheName);
              }
            })
          );
          
          console.log('Service Worker: Assumindo controle dos clientes...');
          // Claim clients para controle imediato
          await self.clients.claim();
          
          // Registrar periodicSync apenas se suportado (sem bloquear)
          if ('periodicSync' in self.registration) {
            try {
              await self.registration.periodicSync.register('background-sync', {
                minInterval: 24 * 60 * 60 * 1000, // 24 horas
              });
              console.log('Service Worker: Periodic sync registrado');
            } catch (err) {
              console.log('Service Worker: Periodic sync não suportado:', err);
            }
          }
          
          console.log('Service Worker: Ativação concluída com sucesso');
        } catch (error) {
          console.error('Service Worker: Erro na ativação:', error);
          // Continuar mesmo com erro
        }
      })(),
      // Timeout de 10 segundos para ativação
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout na ativação do Service Worker')), 10000);
      })
    ]).catch(error => {
      console.error('Service Worker: Erro ou timeout na ativação:', error);
      // Não falhar completamente, apenas log o erro
    })
  );
});
