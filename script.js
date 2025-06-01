document.addEventListener('DOMContentLoaded', () => {
    // --- Request Notification Permission ---
    if ('Notification' in window) {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    // Optionally, show a welcome notification
                    new Notification('Thanks for enabling notifications!');
                } else {
                    console.log('Notification permission denied.');
                    alert('Please enable notifications for this demo to work fully.');
                }
            });
        } else if (Notification.permission === 'denied') {
            alert('Notifications are currently blocked. Please enable them in your browser settings for this demo.');
        }
    } else {
        alert('This browser does not support desktop notification');
    }

    const simpleNotificationBtn = document.getElementById('simpleNotificationBtn');
    const actionsNotificationBtn = document.getElementById('actionsNotificationBtn');
    const delayedNotificationBtn = document.getElementById('delayedNotificationBtn');

    const iconUrl = 'icon.png'; // Path to our dummy icon

    // --- Button 1: Simple Notification ---
    simpleNotificationBtn.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            const notification = new Notification('Simple Notification', {
                body: 'This is a simple notification!',
                icon: iconUrl
            });
        } else {
            alert('Notification permission is not granted. Please allow notifications.');
        }
    });

    // --- Button 2: Notification with Actions ---
    actionsNotificationBtn.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            const notification = new Notification('Notification with Actions', {
                body: 'Click an action button!',
                icon: iconUrl,
                actions: [
                    { action: 'open_google', title: 'Open Google' },
                    { action: 'cancel', title: 'Cancel' }
                ]
            });

            notification.onclick = (event) => {
                if (event.action === 'open_google') {
                    window.open('https://www.google.com', '_blank');
                }
                notification.close(); // Close the notification after an action is clicked
            };
        } else {
            alert('Notification permission is not granted. Please allow notifications.');
        }
    });

    // --- Button 3: Delayed Notification with Actions ---
    delayedNotificationBtn.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            // Indicate that the process has started
            const originalButtonText = delayedNotificationBtn.textContent;
            delayedNotificationBtn.textContent = 'Waiting 5s...';
            delayedNotificationBtn.disabled = true;

            setTimeout(() => {
                const notification = new Notification('Delayed Notification with Actions', {
                    body: 'This notification appeared after a 5-second delay. Click an action!',
                    icon: iconUrl,
                    actions: [
                        { action: 'open_bing', title: 'Open Bing' }, // Changed to Bing for variety
                        { action: 'cancel', title: 'Cancel' }
                    ]
                });

                notification.onclick = (event) => {
                    if (event.action === 'open_bing') {
                        window.open('https://www.bing.com', '_blank');
                    }
                    notification.close();
                };

                // Reset button state
                delayedNotificationBtn.textContent = originalButtonText;
                delayedNotificationBtn.disabled = false;

            }, 5000);
        } else {
            alert('Notification permission is not granted. Please allow notifications.');
        }
    });
});
