
import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    
    return (
    <View >
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'HelpIlls', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View >
      
       
        <View backgroundColor='red' width='100%' alignItems='center' justifyContent= 'center'>
        <Text h1 > Forgotten password? </Text>

        <Text> have a memore lapse?</Text>
        <Text> No problem we are all like that</Text>
        
              
        </View>
        
        <View backgroundColor='grey' width='100%' alignItems='center' justifyContent= 'center'>

            
        {/* MP oublier */}
        <Text h3 > Please check your email to get started</Text>
        
        <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Email@xxx.com'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#eb4d4b"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />
        
        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="Confirme"
            type="solid"
            onPress={() => {props.navigation.navigate('HomeLog')}}
        />

       
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});