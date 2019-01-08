import React from 'react';
import {  Text, Image} from 'react-native';
import {  CardSection} from './common';

const Content = ({prop,image , name, styles}) => {
   
   
    return ( 
                <CardSection style={{backgroundColor:'#e6faff'}}>
           <Image
            style={styles}
                source={{uri : image}} />
                <CardSection style={{flexDirection : 'column',backgroundColor:'#e6faff'}} >
           <Text style={{fontSize: 24, fontWeight:'bold', color:'blue', backgroundColor:'#e6faff'}}>{name}</Text>
           <Text style={{fontSize: 20, color:'#FF4500', fontWeight:'bold',backgroundColor:'#e6faff' }} >{prop}</Text>
              </CardSection>
             </CardSection>
            
    );
}

export default Content;