import React from 'react';
import { AsyncStorage } from "react-native"
import Posts from './Posts';
import LoginForm from './LoginForm';
import {Spinner} from './common';

class SplashScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state ={ isLoggedIn: false };
    }
  
   componentWillUpdate(){
    AsyncStorage.getItem('loggedInStatus')
    .then((value) => {
       if (value === null){
      this.setState({ loggedInStatus: 'loggedOut' });}// AsyncStorage.setItem('loggedInStatus','loggedOut');}
      else{
      this.setState({ loggedInStatus: value });}
    });
   }
    componentDidMount() {
      AsyncStorage.getItem('loggedInStatus')
      .then((value) => {
         if (value === null){
        this.setState({ loggedInStatus: 'loggedOut' });}// AsyncStorage.setItem('loggedInStatus','loggedOut');}
        else{
        this.setState({ loggedInStatus: value });}
      });
    }
  
    render() {
      if (this.state.loggedInStatus === 'loggedIn') {
        return <Posts />
      }
      else if (this.state.loggedInStatus === 'loggedOut') {
        return <LoginForm screenProps={{ isLoggedIn: () =>{ AsyncStorage.setItem('loggedInStatus','loggedIn');this.setState({ loggedInStatus: 'loggedIn' })} }} />
      }
   
      return <Spinner />
    }
  }

  export default SplashScreen;