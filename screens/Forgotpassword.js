
import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    
    return (
    <View style={styles.container}>
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
        
       
        
        <Text h1 > Forgotten password? </Text>

        <Text style={{marginBottom: 20}}> have a memore lapse?</Text>
        <Text style={{marginBottom: 20}}> No problem we are all like that</Text>
        
              
        
        
        

         <View style={styles.container} backgroundColor="#727679" >
        {/* MP oublier */}
        <Text h4 style={{marginTop: 40 , marginBottom: 20}}>Please check your email </Text>
        
        <Input
            containerStyle = {{marginBottom: 5, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Email@xxx.com'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#F0F0F0"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />
        
        <Button 
          
          containerStyle = {{marginBottom: 10, width: '70%'}}
            title="COnfirme"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('Home')}}
        />
        </View>   
       
        </View>
        
  );
}

const styles = StyleSheet.create({
    container: {
      width : '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0F0F0'
    },
  });