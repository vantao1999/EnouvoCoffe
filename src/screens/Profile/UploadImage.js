import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import axios from 'axios';

const UploadImage = () => {
  const [fileData, setFileDta] = React.useState(null);
  const token = useSelector((state) => get(state, 'auth.token', null));

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        Alert(response.customButton);
      } else {
        setFileDta({
          ...fileData,
          fileData: response?.data,
        });
      }
    });
  };

  const onUpload = () => {
    const formData = new FormData();
    const dataUri = `data:image/png;base64,${fileData.fileData}`;
    formData.append('file', dataUri);
    axios({
      url: 'https://enouvocoffee.hoanglive.me/api/v1/user/upload',
      method: 'POST',
      data: formData,
      headers: {
        Accept: '*',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('response image:', response);
      })
      .catch(function (error) {
        console.log('error from image :', error);
      });
  };

  return (
    <View style={styles.body}>
      <View style={styles.ImageSections}>
        <View>
          {fileData ? (
            <View>
              <Image
                source={{ uri: 'data:image/jpeg;base64,' + fileData.fileData }}
                style={styles.images}
              />
            </View>
          ) : (
            <View>
              <Image source={require('../../assets/Images/gallery.png')} style={styles.images} />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary();
          }}
          style={styles.btnUpload}
        >
          <Text style={styles.textUpload}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnUpload}
          onPress={() => {
            onUpload();
          }}
        >
          <Text style={styles.textUpload}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UploadImage;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  ImageSections: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: 200,
    height: 200,
    marginHorizontal: 3,
  },
  btnUpload: {
    marginTop: 15,
    width: '40%',
    paddingVertical: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffcc00',
  },
  textUpload: {
    fontFamily: 'Roboto',
    fontSize: 18,
  },
});
