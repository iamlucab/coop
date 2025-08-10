@echo off
echo Generating keystore for signing the APK...
keytool -genkeypair -v -storetype PKCS12 -keystore ebili-release-key.keystore -alias ebili-key-alias -keyalg RSA -keysize 2048 -validity 10000
echo.
echo If successful, the keystore file has been created.
echo Please move it to the android/app/ directory.
echo.
pause