// Service Worker for handling notifications

// Listen for the install event
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    // Activate the service worker immediately
    self.skipWaiting();
});

// Listen for the activate event
self.addEventListener('activate', event => {
    console.log('Service Worker activated');
    // Take control of all clients immediately
    event.waitUntil(clients.claim());
});

// Listen for messages from the page
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event);
    event.notification.close();
    
    // Handle notification actions
    let url = '/';
    
    if (event.action === 'open_google') {
        url = 'https://www.google.com';
    } else if (event.action === 'open_bing') {
        url = 'https://www.bing.com';
    }
    
    // Open or focus the URL
    event.waitUntil(
        clients.matchAll({type: 'window'}).then(windowClients => {
            // Check if there's already a window/tab open with the URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // No existing window/tab found, open a new one
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
