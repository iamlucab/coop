# Production Build Guide for E-bili Mobile App

This guide provides detailed instructions for creating production builds of the E-bili Mobile app for both Android and iOS platforms.

## Prerequisites

- Complete development and testing of the app
- Android SDK and build tools installed (for Android build)
- Xcode 12 or newer (for iOS build, macOS only)
- Apple Developer account (for iOS build)
- Google Play Developer account (for Android build)
- Keystore file for Android app signing

## Android Production Build

### 1. Generate a Signing Key

If you don't already have a keystore file, create one:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore ebili-release-key.keystore -alias ebili-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted to create passwords and provide some information about your organization.

**IMPORTANT**: Keep your keystore file and passwords secure. If you lose them, you won't be able to update your app on the Play Store.

### 2. Configure Gradle for Release Build

1. Place the keystore file in `android/app/` directory.

2. Configure signing in `android/app/build.gradle`:

```gradle
android {
    ...
    
    defaultConfig { ... }
    
    signingConfigs {
        release {
            storeFile file('ebili-release-key.keystore')
            storePassword System.getenv("KEYSTORE_PASSWORD") ?: KEYSTORE_PASSWORD
            keyAlias 'ebili-key-alias'
            keyPassword System.getenv("KEY_PASSWORD") ?: KEY_PASSWORD
        }
    }
    
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

3. Set up the keystore passwords in `android/gradle.properties` (not recommended for production) or use environment variables:

```
KEYSTORE_PASSWORD=your_keystore_password
KEY_PASSWORD=your_key_password
```

### 3. Configure App Information

1. Update app name in `android/app/src/main/res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">E-bili</string>
</resources>
```

2. Update app icon by replacing the files in `android/app/src/main/res/mipmap-*` directories.

3. Update version information in `android/app/build.gradle`:
```gradle
defaultConfig {
    applicationId "com.ebili.mobile"
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
    versionCode 1  // Increment this for each Play Store update
    versionName "1.0.0"  // User-visible version number
}
```

### 4. Enable Proguard (Optional but Recommended)

In `android/app/build.gradle`:

```gradle
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        ...
    }
}
```

### 5. Build the Release APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`

### 6. Build Android App Bundle (AAB) for Play Store

Google Play Store prefers Android App Bundles over APKs:

```bash
cd android
./gradlew bundleRelease
```

The AAB will be generated at `android/app/build/outputs/bundle/release/app-release.aab`

### 7. Test the Release Build

Before uploading to the Play Store, install and test the release build:

```bash
# For APK
adb install app/build/outputs/apk/release/app-release.apk

# For AAB, you need to use bundletool to convert to APK set
java -jar bundletool.jar build-apks --bundle=app/build/outputs/bundle/release/app-release.aab --output=app-release.apks
java -jar bundletool.jar install-apks --apks=app-release.apks
```

## iOS Production Build (macOS only)

### 1. Configure App Information

1. Open the Xcode project:
```bash
open ios/EbiliMobile.xcworkspace
```

2. In Xcode, select the project in the Project Navigator, then select the "EbiliMobile" target.

3. Update the following information:
   - Display Name: The name shown on the home screen
   - Bundle Identifier: e.g., com.ebili.mobile
   - Version: The user-visible version number (e.g., 1.0.0)
   - Build: The build number (increment for each App Store submission)

4. Update app icons in the Assets.xcassets folder.

### 2. Configure Signing

1. In Xcode, go to the "Signing & Capabilities" tab.

2. Ensure "Automatically manage signing" is checked.

3. Select your Team (Apple Developer account).

4. Xcode will generate a provisioning profile based on your team and bundle identifier.

### 3. Create an Archive

1. Select the appropriate device scheme (Generic iOS Device, not a simulator).

2. From the menu, select Product > Archive.

3. Wait for the archiving process to complete.

### 4. Distribute the App

1. After archiving, the Organizer window will appear.

2. Select your archive and click "Distribute App".

3. Select "App Store Connect" and click "Next".

4. Choose distribution options:
   - Upload: Upload the app to App Store Connect
   - Export: Save the IPA file locally

5. Follow the prompts to complete the process.

6. If you selected "Upload", the app will be uploaded to App Store Connect.

7. If you selected "Export", you'll get an IPA file that you can upload manually using Application Loader or Transporter.

## App Store Submission Preparation

### Google Play Store (Android)

1. Create a developer account at [Google Play Console](https://play.google.com/console/).

2. Create a new application.

3. Prepare the following assets:
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 PNG)
   - At least 2 screenshots for each device type (phone, tablet)
   - Short description (80 characters max)
   - Full description (4000 characters max)
   - Privacy policy URL

4. Upload your AAB file.

5. Set up pricing and distribution.

6. Complete the content rating questionnaire.

7. Submit for review.

### Apple App Store (iOS)

1. Create a developer account at [Apple Developer](https://developer.apple.com/).

2. Create a new app in [App Store Connect](https://appstoreconnect.apple.com/).

3. Prepare the following assets:
   - App icon (1024x1024 PNG)
   - At least 1 screenshot for each device type (iPhone, iPad)
   - App preview videos (optional)
   - Promotional text (170 characters max)
   - Description (4000 characters max)
   - Keywords
   - Support URL
   - Marketing URL (optional)
   - Privacy policy URL

4. Upload your build from Xcode or using Transporter.

5. Set up pricing and availability.

6. Complete the App Review Information section.

7. Submit for review.

## Version Updates

### Android

1. Update the version information in `android/app/build.gradle`:
```gradle
defaultConfig {
    ...
    versionCode 2  // Increment this for each update
    versionName "1.0.1"  // Update this as needed
}
```

2. Build a new AAB and upload to the Play Console.

### iOS

1. In Xcode, update the Version and Build numbers.

2. Create a new archive and upload to App Store Connect.

## Continuous Integration (Optional)

Consider setting up CI/CD pipelines using services like:
- GitHub Actions
- Bitrise
- CircleCI
- Fastlane

This can automate the build and deployment process, ensuring consistent builds and reducing manual errors.

## Troubleshooting Common Issues

### Android

1. **Signing Issues**:
   - Ensure keystore path is correct
   - Verify keystore and key passwords
   - Check that the key alias is correct

2. **Build Failures**:
   - Check for native module compatibility
   - Ensure all dependencies are properly installed
   - Look for version conflicts in build.gradle files

3. **Large APK Size**:
   - Enable ProGuard/R8
   - Use Android App Bundle instead of APK
   - Remove unused resources and code

### iOS

1. **Signing Issues**:
   - Ensure Apple Developer account is active
   - Verify the bundle identifier is unique
   - Check provisioning profile status

2. **Build Failures**:
   - Update CocoaPods (`pod update`)
   - Clean the build folder (Product > Clean Build Folder)
   - Check for native module compatibility

3. **Rejection Reasons**:
   - Incomplete metadata
   - Crashes or bugs
   - Privacy concerns
   - Misleading descriptions

## Final Checklist

Before submitting to app stores:

- [ ] App icon and splash screen display correctly
- [ ] App name displays correctly
- [ ] Version number is correct
- [ ] All placeholder content has been replaced
- [ ] No debug code or console logs in release build
- [ ] All third-party services and APIs are production-ready
- [ ] Privacy policy is in place and accessible
- [ ] Terms of service are in place and accessible
- [ ] All required app store assets are prepared
- [ ] The app has been tested on multiple devices
- [ ] All critical and high-priority bugs are fixed