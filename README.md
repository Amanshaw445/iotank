# ioTank - Smart Water Management PWA

A futuristic Progressive Web App for monitoring and controlling water tank levels with real-time Firebase integration.

## Features

✅ **Futuristic UI Design**
- Orbitron & Rajdhani font pairing
- Cyan/teal neon glow effects
- Animated grid background
- Smooth transitions and animations

✅ **Smart Status Display**
- Real-time water level monitoring with visual tank
- Tank status indicators (LOW/FILLING/FULL/NORMAL)
- Battery level monitoring
- Last sync timestamp

✅ **Navigation**
- Transparent navbar with blur effect
- Slide-out menu with options:
  - Help
  - Contact Us
  - Troubleshoot
  - Our Products
- Account button (login placeholder)

✅ **PWA Features**
- Installable on mobile and desktop
- Install prompt popup (shows once on first visit)
- Offline support with service worker
- No internet detection with popup alert
- Background sync capability
- Push notification support

✅ **Firebase Integration**
- Real-time data synchronization
- Automatic updates from Firebase Realtime Database
- Pump control with status updates

## Setup Instructions

### 1. Firebase Configuration

Replace the Firebase configuration in `index.html` with your actual credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://my-tank-8848e-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 2. Create App Icons

You need to create two icon files:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

Use a cyan/teal water drop or tank icon to match the app theme.

### 3. Deploy

You can deploy this to:
- **Firebase Hosting** (recommended for Firebase integration)
- **Netlify**
- **Vercel**
- **GitHub Pages**
- Any static hosting service

#### Firebase Hosting Deployment:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Deploy
firebase deploy
```

### 4. HTTPS Requirement

PWAs require HTTPS to work properly. Make sure your hosting provides SSL certificates (most modern hosts do this automatically).

### 5. Testing PWA Features

1. **Install Prompt**: 
   - Visit the site on mobile or desktop
   - You should see an install popup after 2 seconds
   - Click "Install" to add to home screen

2. **Offline Mode**:
   - Install the app
   - Turn off your internet
   - The app should still load with cached data
   - You'll see an "No Internet Connection" popup

3. **Notifications**:
   - Toggle the notifications switch
   - Grant notification permissions when prompted

## Firebase Database Structure

Your Firebase Realtime Database should have this structure:

```json
{
  "water": 2,
  "battery": 12,
  "timestamp": 1706382168000,
  "pumpStatus": {
    "active": false,
    "timestamp": 1706382168000
  }
}
```

## Customization

### Colors
Edit the CSS variables in `index.html`:
```css
:root {
  --bg-primary: #0a0f1e;
  --bg-secondary: #141b2e;
  --bg-card: #1a2332;
  --accent-primary: #00ffcc;
  --accent-secondary: #00ccff;
  --accent-danger: #ff3366;
  --accent-warning: #ffaa00;
  --text-primary: #e8f1ff;
  --text-secondary: #8aa0c4;
}
```

### Menu Items
Edit the menu items in the HTML:
```html
<div class="menu-items">
  <a href="#" class="menu-item">
    <span class="menu-item-icon">❓</span>
    <span>Help</span>
  </a>
  <!-- Add more items here -->
</div>
```

## Browser Support

- ✅ Chrome (recommended)
- ✅ Edge
- ✅ Safari (iOS 11.3+)
- ✅ Firefox
- ✅ Samsung Internet

MIT License - Feel free to use and modify for your projects!

## Support

For issues and questions, contact through the app's "Contact Us" menu.
