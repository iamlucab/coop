@echo off
echo ===================================================
echo Building E-bili Mobile App APK
echo ===================================================
echo.

echo Step 1: Checking if keystore exists...
if exist android\app\ebili-release-key.keystore (
    echo Keystore found.
) else (
    echo Keystore not found. Please run android\generate-keystore.bat first.
    echo After generating the keystore, move it to android\app\ directory.
    echo Then run this script again.
    pause
    exit /b
)

echo.
echo Step 2: Setting up environment variables for signing...
set /p KEYSTORE_PASSWORD=Enter keystore password: 
set /p KEY_PASSWORD=Enter key password: 

echo.
echo Step 3: Cleaning previous builds...
cd android
call gradlew clean
if %ERRORLEVEL% neq 0 (
    echo Failed to clean project.
    cd ..
    pause
    exit /b
)

echo.
echo Step 4: Building release APK...
set MYAPP_RELEASE_STORE_PASSWORD=%KEYSTORE_PASSWORD%
set MYAPP_RELEASE_KEY_PASSWORD=%KEY_PASSWORD%
call gradlew assembleRelease
if %ERRORLEVEL% neq 0 (
    echo Failed to build APK.
    cd ..
    pause
    exit /b
)

echo.
echo Step 5: Copying APK to project root...
cd ..
if not exist "apk" mkdir apk
copy android\app\build\outputs\apk\release\app-release.apk apk\ebili-mobile.apk
if %ERRORLEVEL% neq 0 (
    echo Failed to copy APK.
    pause
    exit /b
)

echo.
echo ===================================================
echo Build completed successfully!
echo.
echo Your APK is available at: apk\ebili-mobile.apk
echo.
echo You can install this APK on your Android device by:
echo 1. Transferring the APK to your device
echo 2. Opening the file on your device to install
echo.
echo Note: You may need to enable "Install from Unknown Sources"
echo in your device settings to install this APK.
echo ===================================================
echo.

pause