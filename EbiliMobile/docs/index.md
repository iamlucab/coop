# E-bili Mobile App Documentation

Welcome to the E-bili Mobile App documentation. This index provides links to all the documentation for the project.

## Getting Started

- [README](../README.md) - Main project overview and setup instructions

## Development Guides

- [Project Structure](../README.md#project-structure) - Overview of the project structure
- [API Integration](../src/api/api.js) - API connection to the E-bili backend
- [Authentication](../src/api/auth.js) - Authentication implementation
- [Navigation](../src/navigation/AppNavigator.js) - App navigation structure

## Key Features

- [Dashboard](../src/screens/DashboardScreen.js) - Main dashboard screen
- [Shop](../src/screens/ShopScreen.js) - Product browsing and shopping
- [Wallet](../src/screens/WalletScreen.js) - Wallet management
- [Profile](../src/screens/ProfileScreen.js) - User profile management
- [Loan Management](../src/screens/RequestLoanScreen.js) - Loan request and management
- [Payment Processing](../src/screens/PaymentScreen.js) - Payment processing with proof upload
- [Camera Integration](../src/components/CameraComponent.js) - Camera component for payment proof uploads
- [Push Notifications](../src/utils/NotificationService.js) - Push notification implementation

## Production Guides

- [Testing Guide](testing-guide.md) - Comprehensive guide for testing the app
- [Production Build Guide](production-build-guide.md) - Instructions for creating production builds
- [App Store Submission Guide](app-store-submission-guide.md) - Guide for submitting to app stores
- [Build APK Guide](build-apk-guide.md) - Detailed guide for building and installing the APK directly on your device
- [Mobile App Alternatives](mobile-app-alternatives.md) - Options for creating a mobile app without building the APK yourself
- [Enhance PWA Guide](enhance-pwa-guide.md) - Detailed guide for enhancing your website's PWA capabilities

## Architecture

The E-bili Mobile App follows a modular architecture with the following key components:

1. **API Layer** - Handles communication with the E-bili backend
2. **Context Providers** - Manage global state (auth, cart, etc.)
3. **Navigation** - Manages screen navigation and flow
4. **Screens** - Individual app screens
5. **Components** - Reusable UI components
6. **Utils** - Utility functions and services

## Development Workflow

1. Set up the development environment according to the README
2. Make changes to the codebase
3. Test changes using the Testing Guide
4. Create production builds using the Production Build Guide
5. Submit to app stores using the App Store Submission Guide

## Troubleshooting

If you encounter issues during development or deployment, refer to the following resources:

- Check the Testing Guide for common testing issues
- Refer to the Production Build Guide for build-related problems
- See the App Store Submission Guide for submission issues

If you need further assistance, contact the development team at support@ebili.online.