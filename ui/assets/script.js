document.addEventListener('DOMContentLoaded', async () => {
    // --- Register Service Worker ---
    // Service worker registration is now handled in index.html
    // This is just a fallback in case the service worker registration fails there
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.ready;
            console.log('ServiceWorker is ready with scope: ', registration.scope);
        } catch (error) {
            console.error('ServiceWorker registration failed:', error);
        }
    }

    // --- Request Notification Permission ---
    if ('Notification' in window) {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                // Show a welcome notification
                if ('serviceWorker' in navigator) {
                    const registration = await navigator.serviceWorker.ready;
                    registration.showNotification('Welcome!', {
                        body: 'Thanks for enabling notifications!',
                        icon: '/assets/icon.png'
                    });
                } else {
                    new Notification('Thanks for enabling notifications!');
                }
            } else {
                console.log('Notification permission denied.');
                alert('Please enable notifications for this demo to work fully.');
            }
        } else if (Notification.permission === 'denied') {
            alert('Notifications are currently blocked. Please enable them in your browser settings for this demo.');
        }
    } else {
        alert('This browser does not support desktop notification');
    }

    const simpleNotificationBtn = document.getElementById('simpleNotificationBtn');
    const actionsNotificationBtn = document.getElementById('actionsNotificationBtn');
    const delayedNotificationBtn = document.getElementById('delayedNotificationBtn');

    const iconUrl = '/assets/icon.png';

    // --- Button 1: Simple Notification ---
    simpleNotificationBtn.addEventListener('click', async () => {
        if (Notification.permission === 'granted') {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                registration.showNotification('Simple Notification', {
                    body: 'This is a simple notification!',
                    icon: iconUrl
                });
            } else {
                new Notification('Simple Notification', {
                    body: 'This is a simple notification!',
                    icon: iconUrl
                });
            }
        } else {
            alert('Notification permission is not granted. Please allow notifications.');
        }
    });

    // --- Button 2: Notification with Actions ---
    actionsNotificationBtn.addEventListener('click', async () => {
        if (Notification.permission === 'granted') {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                registration.showNotification('Notification with Actions', {
                    body: 'Click an action button!',
                    icon: iconUrl,
                    actions: [
                        { action: 'open_google', title: 'Open Google' },
                        { action: 'open_bing', title: 'Open Bing' }
                    ]
                });
            } else {
                alert('This browser does not support notification actions. Please use a modern browser.');
            }
        } else {
            alert('Notification permission is not granted. Please allow notifications.');
        }
    });

    // --- Button 3: Delayed Notification with Actions ---
    delayedNotificationBtn.addEventListener('click', async () => {
        if (Notification.permission === 'granted') {
            // Indicate that the process has started
            const originalButtonText = delayedNotificationBtn.textContent;
            delayedNotificationBtn.textContent = 'Waiting 5s...';
            delayedNotificationBtn.disabled = true;

            setTimeout(async () => {
                if ('serviceWorker' in navigator) {
                    const registration = await navigator.serviceWorker.ready;
                    registration.showNotification('Delayed Notification with Actions', {
                        body: 'This notification appeared after a 5-second delay. Click an action!',
                        icon: iconUrl,
                        actions: [
                            { action: 'open_google', title: 'Open Google' },
                            { action: 'open_bing', title: 'Open Bing' }
                        ]
                    });
                } else {
                    alert('This browser does not support notification actions. Please use a modern browser.');
                }

                // Reset button state
                delayedNotificationBtn.textContent = originalButtonText;
                delayedNotificationBtn.disabled = false;
            }, 5000);
        } else {
            alert('Notification permission is not granted. Please allow notifications.');
        }
    });
});
