# Testing Guide for E-bili Mobile App

This guide provides detailed instructions for testing the E-bili Mobile app on both Android and iOS devices before releasing to production.

## Prerequisites

- Android device or emulator with Android 6.0 (API level 23) or higher
- iOS device or simulator with iOS 12.0 or higher (for iOS testing)
- Mac computer (for iOS testing)
- Development environment set up according to the main README.md

## Testing on Android

### Using a Physical Device

1. **Enable Developer Options and USB Debugging**:
   - Go to Settings > About phone
   - Tap "Build number" 7 times to enable Developer Options
   - Go back to Settings > System > Developer Options
   - Enable "USB debugging"

2. **Connect Device and Run App**:
   ```bash
   # Check if your device is recognized
   adb devices
   
   # Run the app on your device
   npx react-native run-android
   ```

3. **Testing on Release Build**:
   ```bash
   # Generate a release build
   cd android
   ./gradlew assembleRelease
   
   # Install the release build on your device
   adb install app/build/outputs/apk/release/app-release.apk
   ```

### Using an Emulator

1. **Create an Android Virtual Device (AVD)**:
   - Open Android Studio
   - Go to Tools > AVD Manager
   - Click "Create Virtual Device"
   - Select a device definition (e.g., Pixel 4)
   - Select a system image (e.g., Android 11.0)
   - Complete the AVD creation

2. **Run the App on Emulator**:
   ```bash
   # Start the emulator from command line
   emulator -avd [your_avd_name]
   
   # Or start it from Android Studio's AVD Manager
   
   # Run the app
   npx react-native run-android
   ```

## Testing on iOS (macOS only)

### Using a Physical Device

1. **Register Your Device**:
   - Connect your iOS device to your Mac
   - Open Xcode > Window > Devices and Simulators
   - Select your device and ensure it's registered for development

2. **Run the App on Your Device**:
   - Open the iOS project in Xcode:
     ```bash
     open ios/EbiliMobile.xcworkspace
     ```
   - Select your device from the device dropdown
   - Click the Run button or press Cmd+R

### Using a Simulator

1. **Run the App on Simulator**:
   ```bash
   # List available simulators
   xcrun simctl list devices
   
   # Run on a specific simulator
   npx react-native run-ios --simulator="iPhone 12"
   
   # Or simply run on the default simulator
   npx react-native run-ios
   ```

## Test Cases

Ensure to test the following features thoroughly:

### Authentication
- [ ] User registration with valid data
- [ ] User registration with invalid data (error handling)
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials (error handling)
- [ ] Password reset functionality
- [ ] Session persistence after app restart
- [ ] Logout functionality

### Navigation
- [ ] Navigation between all screens
- [ ] Bottom tab navigation
- [ ] Stack navigation (back button functionality)
- [ ] Deep linking (if implemented)

### Product Browsing
- [ ] Product list loading
- [ ] Product filtering by category
- [ ] Product search functionality
- [ ] Product details view
- [ ] Image loading and caching

### Shopping Cart
- [ ] Adding products to cart
- [ ] Updating product quantity
- [ ] Removing products from cart
- [ ] Cart persistence after app restart
- [ ] Checkout process

### Wallet
- [ ] Wallet balance display
- [ ] Transaction history loading
- [ ] Cash-in functionality
- [ ] Cash-out functionality

### Loan Management
- [ ] Loan application process
- [ ] Loan eligibility check
- [ ] Loan history display
- [ ] Loan payment process
- [ ] Payment proof upload using camera

### Profile
- [ ] Profile information display
- [ ] Profile information update
- [ ] Password change functionality

### Push Notifications
- [ ] Permission request dialog
- [ ] Receiving foreground notifications
- [ ] Receiving background notifications
- [ ] Notification action handling

### Performance
- [ ] App startup time
- [ ] Screen transition smoothness
- [ ] Scrolling performance in lists
- [ ] Memory usage during extended use
- [ ] Battery consumption

### Network Handling
- [ ] Behavior with slow network
- [ ] Behavior with no network
- [ ] Error handling for API failures
- [ ] Data caching and offline functionality

## Device Compatibility Testing

Test the app on various:
- Screen sizes (small, medium, large)
- Screen densities
- OS versions (minimum supported to latest)
- Device manufacturers (for Android)

## Accessibility Testing
- [ ] Text scaling
- [ ] Screen reader compatibility
- [ ] Color contrast
- [ ] Touch target sizes

## Security Testing
- [ ] Secure storage of sensitive data
- [ ] API communication encryption
- [ ] Session handling
- [ ] Input validation

## Reporting Issues

Document any issues found during testing with:
1. Clear description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots or videos
6. Device information (make, model, OS version)
7. App version

## Final Checklist Before Release

- [ ] All critical and high-priority bugs fixed
- [ ] App icon and splash screen display correctly
- [ ] App name displays correctly
- [ ] Version number is correct
- [ ] All placeholder content has been replaced
- [ ] No debug code or console logs in release build
- [ ] App performs well on low-end devices
- [ ] All third-party services and APIs are production-ready