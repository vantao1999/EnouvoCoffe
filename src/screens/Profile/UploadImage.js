/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as actions from '../../redux/UserRedux/operations';
import axios from 'axios';

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: '',
      image: {},
      fileData: null,
    };
    this.launchImageLibrary();
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          // image: response
        });
      }
    });
  };
  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{ uri: this.state.fileUri }} style={styles.images} />;
    } else {
      return <Image source={require('../../assets/Images/gallery.png')} style={styles.images} />;
    }
  }

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
          style={styles.images}
        />
      );
    } else {
      return <Image source={require('../../assets/Images/gallery.png')} style={styles.images} />;
    }
  }
  onUpload = () => {
    // console.log('fileData', this.state.fileData);
    console.log('this.state.fileUri', this.state.fileUri);

    const formData = new FormData();
    formData.append('file', this.state.fileUri);
    console.log('FormDATA', formData);

    axios({
      url: 'https://enouvowallet-api.herokuapp.com/api/v1/user/uploadFile',
      method: 'POST',
      data: formData,
      headers: {
        Accept: '*',
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRhbyIsImlkIjo0LCJlbWFpbCI6InZhbnRhby5kZXZAZ21haWwuY29tIiwic2NvcGUiOiJ1c2VyIiwidHRsIjozNjAwMDAwLCJpYXQiOjE1OTI0NTQ0MzB9._qIxDMRDjBEhXSxcq1hFcQcg7nTjxxyrHbicWd_Ig0Y',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('response :', response);
      })
      .catch(function (error) {
        console.log('error from image :', error);
      });
    // this.props.upLoadImage(data);
  };

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.ImageSections}>
          {/* <View>{this.renderFileUri()}</View> */}
          <View>{this.renderFileData()}</View>
          <TouchableOpacity style={styles.buttonSave} onPress={this.onUpload}>
            <Text style={styles.textSave}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  upLoadImage: (data) => dispatch(actions.uploadImage(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);

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
  buttonSave: {
    marginTop: 20,
  },
  textSave: {
    fontFamily: 'Roboto-bold',
    color: '#007fff',
    fontSize: 18,
  },
});
