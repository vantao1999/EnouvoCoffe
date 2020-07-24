import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import axios from 'axios';
import { saveImage } from '../../redux/UserRedux/operations';
import { NavigationUtils } from '../../navigation';

const UploadImage = () => {
  const dispatch = useDispatch();
  const [fileData, setFileDta] = React.useState(null);
  const token = useSelector((state) => get(state, 'auth.token', null));
  const uploading = useSelector((state) => get(state, 'auth.uploading', null));

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

  const saveAvatar = async (image) => {
    const result = await dispatch(saveImage(image));
    if (saveImage.fulfilled.match(result)) {
      Alert.alert('Update successfully');
      NavigationUtils.popToRoot();
    } else {
      Alert.alert('Error', 'Please try again' || 'error');
    }
  };
  const onUpload = async () => {
    const formData = new FormData();
    const dataUri = `data:image/png;base64,${fileData.fileData}`;
    formData.append('file', dataUri);
    axios({
      url: 'http://192.168.9.32:8080/api/v1/s3/upload',
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
        const avatar = response.data.image;
        saveAvatar({ avatar });
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
                resizeMode="contain"
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
      {uploading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ffcc00" />
        </View>
      ) : null}
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
    width: Dimensions.get('window').width / 2,
    paddingVertical: 2,
    alignItems: 'center',
    backgroundColor: '#ffcc00',
  },
  textUpload: {
    fontFamily: 'Roboto',
    fontSize: 18,
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
