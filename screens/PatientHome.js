
import React, {useState} from 'react';
import { Text, StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    
    return (
    <View >
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View >
        <View placement="left" color="green" backgroundColor='grey' width='100%' alignItems='center' justifyContent= 'center' >
        <Text  >Helppills</Text>
        </View>
        <View alignItems= 'center'
            justifyContent= 'center'
            backgroundColor= 'white'>
        <Image
            
            source={{ uri: 'https://picsum.photos/200' }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
            PlaceholderContent={<ActivityIndicator />}
            />
            <Text>Prenom </Text>
            </View>
        <View backgroundColor='red' width='100%' alignItems='center' justifyContent= 'center'>
        <Text > My Appointment Book</Text>

        <Text> no appointment yet</Text>
        
        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="Book ONE"
            type="solid"
            onPress={() => {props.navigation.navigate('HomeLog')}}
        />
       
        </View>
        
        <View backgroundColor='grey' width='100%' alignItems='center' justifyContent= 'center'>
        {/* EMAIL */}
       
            
        {/* MP oublier */}
        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="Order medicine's drug"
            type="solid"
            onPress={() => {props.navigation.navigate('HomeLog')}}
        />

        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="my presciption "
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