<!--  --># E-bili Mobile App

A React Native mobile application for the E-bili Online platform.

## Overview

E-bili Mobile is a cross-platform mobile application built with React Native that provides a native mobile experience for the E-bili Online platform. The app allows users to browse products, manage their shopping cart, place orders, request loans, and manage their wallet.

## Features

- User authentication (login, registration)
- Product browsing and shopping
- Shopping cart management
- Order history and tracking
- Loan requests and management
- Wallet management
- Payment processing with proof upload
- Push notifications

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or newer)
- npm or Yarn
- JDK 11 or newer (for Android development)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- CocoaPods (for iOS dependencies, macOS only)
- React Native CLI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ebili-mobile.git
   cd ebili-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install iOS dependencies (macOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Configuration

1. Update the API URL in `src/api/api.js` to point to your E-bili backend:
   ```javascript
   const API_URL = 'https://ebili.online/api';
   ```

2. For Firebase push notifications, update the Firebase configuration in your project.

## Running the App

### Android

```bash
# Start Metro bundler
npx react-native start

# In a new terminal, run on Android
npx react-native run-android
```

### iOS (macOS only)

```bash
# Start Metro bundler
npx react-native start

# In a new terminal, run on iOS
npx react-native run-ios
```

## Building and Installing the APK

We've provided easy-to-use scripts to build an APK that you can install directly on your Android device:

### Quick Build (Windows)

1. Generate a keystore (one-time setup):
   - Run `android\generate-keystore.bat`
   - Follow the prompts to create your keystore
   - Move the generated keystore to `android\app\` directory

2. Build the APK:
   - Run `build-apk.bat` from the project root
   - Enter your keystore passwords when prompted
   - The APK will be generated at `apk\ebili-mobile.apk`

3. Install on your device:
   - Transfer the APK to your Android device
   - Open the file on your device to install
   - You may need to enable "Install from Unknown Sources" in your device settings

For detailed instructions, see [Building and Installing the APK](docs/build-apk-guide.md).

### Alternatives to Building the APK Yourself

If you don't want to set up the development environment to build the APK yourself, we've provided a guide with several alternatives:

#### Recommended Approach: Enhance Your PWA

The quickest way to get a mobile app experience is to enhance the Progressive Web App (PWA) capabilities of your existing website. Your site already has basic PWA functionality that can be improved to provide a near-native experience.

**Benefits:**
- No additional development environment needed
- Works on both Android and iOS
- Immediate updates (no app store approval process)
- Leverages your existing website codebase

See our detailed [Enhance PWA Guide](docs/enhance-pwa-guide.md) for step-by-step instructions.

#### Other Alternatives:

- **Use app builder platforms** like AppGyver or Adalo
- **Use WebView wrappers** like GonativeIO
- **Hire a freelance developer** to build the APK for you
- **Use CI/CD services** for automated builds

For more information on all alternatives, see [Mobile App Alternatives](docs/mobile-app-alternatives.md).

## Building for Production Stores

For official app store releases, follow these guides:

- [Production Build Guide](docs/production-build-guide.md) - Detailed instructions for creating production builds
- [App Store Submission Guide](docs/app-store-submission-guide.md) - Guide for submitting to Google Play and Apple App Store

## Project Structure

```
EbiliMobile/
├── src/
│   ├── api/              # API calls to Laravel backend
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable components
│   ├── context/          # Context providers (auth, etc.)
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Screen components
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   └── App.js            # Main component
├── android/              # Android-specific files
├── ios/                  # iOS-specific files
├── docs/                 # Documentation
└── build-apk.bat         # Script to build Android APK
```

## Documentation

- [Testing Guide](docs/testing-guide.md) - Comprehensive guide for testing the app
- [Production Build Guide](docs/production-build-guide.md) - Instructions for creating production builds
- [App Store Submission Guide](docs/app-store-submission-guide.md) - Guide for submitting to app stores
- [Build APK Guide](docs/build-apk-guide.md) - Detailed guide for building and installing the APK

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please contact support@ebili.online