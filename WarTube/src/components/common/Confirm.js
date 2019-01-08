import React from 'react';
import {Text, View, Modal } from 'react-native';
import {CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, onAccept, onDecline, visible}) => {
 const { containerStyle, CardSectionStyle, textStyle} = styles;
    return (
     <Modal 
     visible={visible}
     transparent
     animationType="slide"
     onRequestClose={() => {}}
     >
         <View style={containerStyle}>
         <CardSection style={CardSectionStyle}>
             <Text style={textStyle}>{children}</Text>
         </CardSection>
         <CardSection>
             <Button onPress={onAccept}>Yes</Button>
             <Button oPress={onDecline}>No</Button>
         </CardSection>
         </View>
     </Modal>
 );
};

const styles = {
containerStyle:{
    position : 'relative',
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
    justifyContent:'center'
},
textStyle:{
    textAlign:'center',
    fontSize: 18,
    lineHeight: 40,
    flex: 1
},
CardSectionStyle:{
    justifyContent:'center'
}
};

export {Confirm};