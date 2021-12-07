
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import {Button, Input, Text, Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

// style={styles.container}

export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    
    return (
    
    <View style={styles.container}
    >
        {/* EMAIL */}
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
        <Text h1>Sign-in</Text>
        <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='email'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#727679"
                />
            }
            onChangeText={(val) => setEmail(val)}
        />
            {/* PASSWORD */}
            <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Password'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#727679"
                />
            }
            onChangeText={(val) => setPassword(val)}
        />
        {/* CONNECTION */}
        <Button
           
           containerStyle = {{marginBottom: 25, width: '70%'}}
            title="CONNECTION"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" }}
            onPress={() => {
              props.navigation.navigate('BottomNavigator', { screen: 'GalleryScreen' });
            }}
        />
        {/* inscription  */}
        <Button
           containerStyle = {{marginBottom: 25, width: '70%'}}
            title="INSCRIPTION"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" }}
            onPress={() => {props.navigation.navigate('HomeLog')}}
        />

        {/* MP oublier */}
        <Button 
          containerStyle = {{marginBottom: 25, width: '70%'}}
            title="Mot de passe oublié"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('Forgotpass')}}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  },
});