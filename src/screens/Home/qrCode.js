/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Alert, Text, TouchableOpacity, Linking } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
// import { log } from 'react-native-reanimated';

const ScanQR = () => {
  const onSuccess = (e) => {
    Linking.openURL(e.data).catch((err) => Alert.alert('Invalid QR code', e.data));
  };

  return (
    <QRCodeScanner
      containerStyle={{ backgroundColor: '#fff' }}
      onRead={onSuccess}
      reactivate={true}
      permissionDialogMessage="Need permission to access camera"
      reactivateTimeout={10}
      cameraTimeout={10}
      showMarker={true}
      markerStyle={{ borderColor: '#fff', borderRadius: 10 }}
      bottomContent={
        <TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 21, color: '#05375a' }}>Scan QR code</Text>
        </TouchableOpacity>
      }
    />
  );
};
export default ScanQR;
