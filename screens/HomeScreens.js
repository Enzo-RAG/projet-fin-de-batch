
import React, {useState} from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    
    return (
    <ImageBackground style={styles.container}>
        {/* EMAIL */}
        <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='email'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#eb4d4b"
                />
            }
            onChangeText={(val) => setPseudo(val)}
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
                color="#eb4d4b"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />
        {/* CONNECTION */}
        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="CONNECTION"
            type="solid"
            onPress={() => {props.navigation.navigate('HomeLog')}}
        />
        {/* inscription  */}
        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="inscription"
            type="solid"
            onPress={() => {props.navigation.navigate('HomeLog')}}
        />

        {/* MP oublier */}
        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="MP oublier"
            type="solid"
            onPress={() => {props.navigation.navigate('HomeLog')}}
        />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
});