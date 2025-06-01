# Browser Notification Demo MVP

A Progressive Web App (PWA) that demonstrates browser notifications with different options, including custom actions and service worker integration.

## Features

- Browser notifications with custom icons
- Notification actions (Open Google/Open Bing)
- Service worker for offline functionality
- Installable as a PWA
- Responsive design

## Setup and Running

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask server:**
   ```bash
   python app.py
   ```
   The server will start on `http://localhost:5000`.

3. **Open in browser:**
   Navigate to `http://localhost:5000` in a modern web browser (Chrome, Firefox, or Edge recommended).

4. **Enable notifications when prompted by your browser.**

## Project Structure

```
.
├── app.py                 # Flask server
├── generate_icons.py      # Script for generating app icons
├── requirements.txt       # Python dependencies
└── ui/                    # Frontend files
    ├── assets/
    │   ├── icon.png      # App icon
    │   └── script.js     # Client-side JavaScript
    ├── index.html        # Main HTML page
    ├── manifest.json     # Web App Manifest
    └── service-worker.js # Service worker for PWA functionality
```

## Development

- To modify the app icon, update `ui/assets/icon.png` and run:
  ```bash
  python generate_icons.py
  ```
  This will generate all required icon sizes.

## Browser Support

- Chrome 42+
- Firefox 47+
- Edge 16+
- Safari 16.4+ (with limitations)


## License

MIT