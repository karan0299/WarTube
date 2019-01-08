import React from 'react';
import {Text, FlatList, View, Modal, ScrollView, Image, TouchableHighlight, ImageBackground} from 'react-native';
import  { showImagePicker } from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {Button , Card, CardSection, Input} from './common';
import { withNavigation} from 'react-navigation';
import {AsyncStorage} from 'react-native'
import {db, store} from '../config';



const  Blob =RNFetchBlob.polyfill.Blob;
     const fs=RNFetchBlob.fs
    window.XMLHttpRequest =RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob= Blob
let itemsRef= db.ref();
class Posts extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            post: [] ,
           modalVisible: false,
           comment:"",
           postedon:''
        };
        }

componentDidMount(){
        itemsRef.child("Posts")
        .once("value", snapshot => {
            const data = snapshot.val()
            if (snapshot.val()){
                const temp = [];
                Object
                .keys(data)
                .forEach(noteText => temp.push(data[noteText]));
                this.setState({
                    post: temp
                });
            }
        });

    }
    componentWillUpdate() {
    
        itemsRef.child("Posts")
        .once("value", snapshot => {
            const data = snapshot.val()
            if (snapshot.val()){
                const temp = [];
                Object
                .keys(data)
                .forEach(noteText => temp.push(data[noteText]));
                this.setState({
                    post: temp
                });
            }
        });

    }

     

    onButtonPress(){
    this.setState({loggedInStatus : 'loggedOut'}); this.props.navigation.goBack();
   }

setModalVisible(visible) {
    this.setState({comment: ''})
    this.setState({modalVisible: visible});
  }

  onButtonModal(){
      itemsRef.child("Posts").push({comment : this.state.comment, createdAT: new Date().getTime()})
      this.setState({modalVisible: false});
  }

  renderFlatList({item}){
     var d=new Date(item.createdAT).toDateString()
    if(item.url) 
    {
    return(
        
        <CardSection> 
            <ImageBackground source={require('./backg5.png')} style={{width: '100%', height: '100%',flexDirection:'row'}}>
           <Image source={require('./user.png')} style={{height: 40, width: 40 }}/>
           <View style={{flexDirection:'column'}}>
           <Text style={styles.userStyle}>User</Text>
           <Text>posted on : {d}</Text>
            <Text style={styles.postStyle}> {item.comment} </Text>
            <Image source={{uri : item.url}} style={{height: 100, width: 100, marginLeft: 0, marginBottom:10, borderRadius:4 }} />
            </View>
            </ImageBackground>
        </CardSection>
        
      );
    }
    else {
        return(
            <CardSection> 
                <ImageBackground source={require('./backg5.png')} style={{width: '100%', height: '100%',flexDirection:'row'}}>
               <Image source={require('./user.png')} style={{height: 40, width: 40 }}/>
               <View style={{flexDirection:'column'}}>
               <Text   style={styles.userStyle}>User</Text>
               <Text>posted on : {d}</Text>
                <Text  style={styles.postStyle}> {item.comment} </Text>
                </View>
                </ImageBackground>
            </CardSection>
        );
    }
  }

  onButtonImg(){
    showImagePicker((response) => {console.log(response)
        if(!response.didCancel) {
            let imgPromises = [];
            imgPromises.push(this.uploadImage(response.uri, 'image/jpeg', response.fileName));
            
            Promise.all(imgPromises).then(urls => {
               // ALL IMAGES SUCCEEDED and you will get an array of URIS that you can save to your database for later use!
            }).catch(error => {
              // One OR many images failed the upload. Give feedback to someone.
            })
        }
    }) }

    storeReference(download, sessionId) {
       let image ={
             type :'image',
             url: download,
             createdAT :sessionId,
             comment: this.state.comment
         }
         itemsRef.child("Posts").push(image);
     }


     uploadImage(uri, mime = 'image/jpeg', name) {
 
        return new Promise((resolve, reject) => {
     
        
          let imgUri = uri; let uploadBlob = null;
         const uploadUri= imgUri;
    const imageRef = store.ref().child(name)
          
          fs.readFile(uploadUri, 'base64')
            .then((data) => { 
              return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
              uploadBlob = blob;
              return imageRef.put(blob, { contentType: mime, name: name });
            })
            .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL();
            })
            .then(url => { 
              resolve(url);
              const sessionId=new Date().getTime();
              this.storeReference(url,sessionId )
            })
            .catch(error => {
              reject(error)
          })
        })
    
     }

    render(){
        
    return (<ScrollView >
       
        <Modal
        animationType="slide"
        transparent={ false }
        visible={this.state.modalVisible}
        >
        <TouchableHighlight onPress={() => this.setState({modalVisible: false})}>
        <View>
        <Image source={require('./back.png')} style={{height: 40, width: 40 }}  />
        </View>
        </TouchableHighlight>
        <ImageBackground source={require('./backg6.png')} style={{width: '100%', height: '100%'}}>
<CardSection>
                    <Input 
                   
                    placeholder="Whats on your mind"
                    label=""
                    value={this.state.comment}
                   onChangeText={ comment => this.setState({ comment })} 
                    style={{fontSize : 20,
                        fontFamily:"times-new-roman",
                        fontWeight:'bold'}}
                    />
                </CardSection>
                <View style={{marginRight : 30, marginLeft: 30 }}>
                <CardSection >
                    <Button onPress={this.onButtonModal.bind(this)}>Post Comment</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonImg.bind(this)}>Post Image</Button>
                </CardSection>
                </View>
                </ImageBackground>
        </Modal>
        <ImageBackground source={require('./backg3.png')} style={{width: '100%', height: '100%'}}>
        <Card style={{flexDirection: 'row', borderColor:'white',  borderWidth: 0,   elevation: 0}}>
          <Button onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{flex: 2}}>Post</Button>
        
        <Button onPress={() => { AsyncStorage.removeItem('loggedInStatus');this.props.navigation.goBack();}} style={{flex: 1}}>LogOut</Button> 
        </Card>
      
     <FlatList
       data={this.state.post}
      renderItem={({item}) => this.renderFlatList({item})}
       style={{flex: 1, padding: 10}}
       />
      </ImageBackground>
          </ScrollView>
    );
}
}

const styles = {
    postStyle : {
        flex : 1,
        fontSize : 18,
        fontFamily:"times-new-roman",
        fontWeight:'bold',
        paddingBottom:5,
       marginRight: 7, marginLeft: 5,
       paddingTop:2,
        
    },
    userStyle : {
        flex : 1,
        fontSize : 20,
        fontFamily:"times-new-roman",
        fontWeight:'bold',
        color: 'blue',
       marginRight: 7, marginLeft: 5
    }
}

export default withNavigation(Posts);