# Building and Installing the E-bili Mobile App APK

This guide provides step-by-step instructions for building an APK file of the E-bili Mobile app and installing it on your Android device.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or newer)
2. **Java Development Kit (JDK)** (version 11 or newer)
3. **Android SDK** (typically installed with Android Studio)
4. **Git** (to clone the repository if needed)

## Building the APK

### Option 1: Using the Automated Script (Recommended)

We've provided a batch script that automates the APK building process:

1. **Generate a Keystore** (first-time only):
   - Navigate to the project root directory
   - Run `android\generate-keystore.bat`
   - Follow the prompts to create a keystore
   - Remember the passwords you enter
   - Move the generated keystore file to `android\app\` directory

2. **Build the APK**:
   - Navigate to the project root directory
   - Run `build-apk.bat`
   - Enter the keystore and key passwords when prompted
   - Wait for the build process to complete
   - The APK will be generated at `apk\ebili-mobile.apk`

### Option 2: Manual Build Process

If you prefer to build the APK manually or are on a non-Windows system:

1. **Generate a Keystore** (first-time only):
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore ebili-release-key.keystore -alias ebili-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```
   - Move the generated keystore to `android/app/` directory

2. **Set Environment Variables**:
   ```bash
   # Windows
   set MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
   set MYAPP_RELEASE_KEY_PASSWORD=your_key_password
   
   # Linux/macOS
   export MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
   export MYAPP_RELEASE_KEY_PASSWORD=your_key_password
   ```

3. **Build the APK**:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleRelease
   ```

4. **Locate the APK**:
   - The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`

## Installing the APK on Your Android Device

### Method 1: Direct Transfer

1. **Enable Unknown Sources**:
   - Go to your device's Settings
   - Navigate to Security or Privacy settings
   - Enable "Install from Unknown Sources" or "Install Unknown Apps"
   - On newer Android versions, you might need to grant permission to specific apps (like your file manager)

2. **Transfer the APK**:
   - Connect your device to your computer via USB
   - Copy the APK file to your device's storage
   - Alternatively, upload the APK to Google Drive or send it via email

3. **Install the App**:
   - On your device, use a file manager to locate the APK
   - Tap on the APK file
   - Follow the prompts to install the app

### Method 2: Using ADB (Android Debug Bridge)

1. **Enable USB Debugging**:
   - Go to Settings > About phone
   - Tap "Build number" 7 times to enable Developer Options
   - Go back to Settings > System > Developer Options
   - Enable "USB debugging"

2. **Connect Your Device**:
   - Connect your device to your computer via USB
   - Confirm any authorization prompts on your device

3. **Install via ADB**:
   ```bash
   adb install path/to/ebili-mobile.apk
   ```

## Troubleshooting

### Build Issues

1. **Gradle Build Failed**:
   - Ensure you have the correct JDK version installed
   - Check that JAVA_HOME environment variable is set correctly
   - Try running `./gradlew clean` before building again

2. **Keystore Issues**:
   - Verify that the keystore file is in the correct location (`android/app/`)
   - Ensure you're using the correct keystore and key passwords

### Installation Issues

1. **App Not Installing**:
   - Check that "Install from Unknown Sources" is enabled
   - Ensure you have enough storage space on your device
   - If updating, try uninstalling the previous version first

2. **App Crashes on Launch**:
   - Check that your device meets the minimum requirements
   - Ensure you're installing the correct APK for your device architecture

## Notes

- The APK is signed with your keystore. Keep the keystore file and passwords secure.
- If you lose your keystore, you won't be able to update the app with the same signature.
- This APK is for personal use or testing. For distribution via app stores, follow the app store submission guide.