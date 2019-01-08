import React, { Component } from 'react';
import { Image ,Text, View, ImageBackground } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import {auth} from '../config';


class LoginForm extends Component {
 
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress(){
    const { email, password} = this.state;
    
    this.setState({ error: '', loading: true});
    auth.signInWithEmailAndPassword(email, password)
   .then(() => {
      this.setState({
       email: '',
       password: '',
       loading: false,
       error: ''
      });
      this.props.screenProps.isLoggedIn();
    })
    .catch(() => {
        auth.createUserWithEmailAndPassword(email, password)
        .then( () => {
        this.setState({
         email: '',
         password: '',
         loading: false,
         error: ''
        });
        this.props.screenProps.isLoggedIn();
      })
        .catch(() => {
        this.setState({
         error: "Authentication failed",
         loading: false
 
        });});
    });
   }

   onLoginFail() {
       this.setState({
        error: "Authentication failed",
        loading: false

       });
   }

   renderButton(){
       if (this.state.loading) {
           return <Spinner size="small"/>
       }
         return (
        <Button onPress={this.onButtonPress.bind(this)}> 
        Log In
    </Button>
       );
   }

    render() {
        return (
            <ImageBackground source={require('./back2.png')} style={{width: '100%', height: '100%'}}>
        <View style={{ flex: 1 ,justifyContent : "center"}} >
            <View>
            <Image source={require('./login.png')} style={{height: 80, width: 80 , alignSelf:'center'}} />
            </View>
            <Card >
                <CardSection >
                    <Input 
                    placeholder="e.g. user@gmail.com"
                    label="Email:"
                    value={this.state.email}
                    onChangeText={ email => this.setState({ email })} 
                    />
                </CardSection>
                
                <CardSection>
                    <Input
                    secureTextEntry={true}
                    placeholder="password"
                   label="password :"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                <Text style={styles.textStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
            </View>
            </ImageBackground>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        backgroundColor:'white'
    }
};

export default LoginForm;