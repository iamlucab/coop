import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button, IconButton } from 'react-native-paper';

const { width } = Dimensions.get('window');

const CameraComponent = ({ onPictureTaken, onClose }) => {
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setLoading(true);
        const options = { 
          quality: 0.85, 
          base64: false,
          width: 1280,
          fixOrientation: true,
          orientation: 'portrait'
        };
        
        const data = await cameraRef.current.takePictureAsync(options);
        setCapturedImage(data.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const confirmPicture = () => {
    if (capturedImage) {
      onPictureTaken(capturedImage);
    }
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.on
        : RNCamera.Constants.FlashMode.off
    );
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back
    );
  };

  return (
    <View style={styles.container}>
      {capturedImage ? (
        // Preview captured image
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          
          <View style={styles.previewActions}>
            <Button 
              mode="contained" 
              onPress={retakePicture}
              style={[styles.previewButton, { backgroundColor: '#f44336' }]}
              icon="camera-retake"
            >
              Retake
            </Button>
            <Button 
              mode="contained" 
              onPress={confirmPicture}
              style={[styles.previewButton, { backgroundColor: '#4caf50' }]}
              icon="check"
            >
              Use Photo
            </Button>
          </View>
        </View>
      ) : (
        // Camera view
        <View style={styles.cameraContainer}>
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            type={cameraType}
            flashMode={flashMode}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera, status }) => {
              if (status !== 'READY') {
                return (
                  <View style={styles.pendingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.pendingText}>
                      {status === 'PENDING_AUTHORIZATION'
                        ? 'Requesting camera permission...'
                        : 'Loading camera...'}
                    </Text>
                  </View>
                );
              }
              
              return (
                <View style={styles.cameraControls}>
                  <View style={styles.topControls}>
                    <IconButton
                      icon="close"
                      color="#ffffff"
                      size={30}
                      onPress={onClose}
                      style={styles.closeButton}
                    />
                    
                    <View style={styles.rightControls}>
                      <IconButton
                        icon={flashMode === RNCamera.Constants.FlashMode.off ? "flash-off" : "flash"}
                        color="#ffffff"
                        size={30}
                        onPress={toggleFlash}
                      />
                      <IconButton
                        icon="camera-flip"
                        color="#ffffff"
                        size={30}
                        onPress={toggleCameraType}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.bottomControls}>
                    <TouchableOpacity
                      onPress={takePicture}
                      style={styles.captureButton}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator size="large" color="#ffffff" />
                      ) : (
                        <View style={styles.captureButtonInner} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          </RNCamera>
          
          <View style={styles.instructions}>
            <Text style={styles.instructionsText}>
              Take a clear photo of your payment receipt
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  pendingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingText: {
    color: '#ffffff',
    marginTop: 10,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 30,
  },
  rightControls: {
    flexDirection: 'row',
  },
  bottomControls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
  },
  instructions: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
  },
  instructionsText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  preview: {
    width: width,
    height: width * 4/3,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
  },
  previewButton: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default CameraComponent;