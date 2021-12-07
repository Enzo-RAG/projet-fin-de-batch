
import React, {useState} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [rdv, setRdv] = useState(false)


    const book = () => {
      if(rdv == false){
        return(
          <Button 
          
          containerStyle = {{marginBottom: 25, width: '70%', marginTop: 25}}
            title="Book ONE"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('PatientRdv')}}
        />)
      }}

    const rdv1 = () => {
      if(rdv == true){
        return(
        <Card containerStyle={{width: '70%'}}>
        <Card.Title>nom doc</Card.Title>
        <Card.Divider/>
        <Card.Image source={{ uri: 'https://picsum.photos/200' }}></Card.Image>
          <Text style={{marginBottom: 10}}>
            date heure
          </Text>
         
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Modify' />
            <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='cancel' />
          
      </Card>)
      }else{
        return(<Text h3 style={{color:"#F0F0F0"}}> no appointment yet</Text>)
      }
    }


    return (
    <View style={styles.container}>
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
           
         
        
        <Image
            containerStyle = {{marginBottom: 10, marginTop: 10}}
            source={{ uri: 'https://picsum.photos/200' }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
            PlaceholderContent={<ActivityIndicator />}
            />
            <Text h2 style={{color:"#727679"}}> prenom</Text>
            
        <View style={styles.container} backgroundColor="#727679">
        <Text h3 style={{color:"#F0F0F0"}}> My Appointment Book patient</Text>

        {rdv1()}
        {book()}
        
        </View>
        

       
        
        
        {/* EMAIL */}
       
            
        {/* MP oublier */}
        <Button 
          
          containerStyle = {{marginBottom: 25, width: '70%', marginTop: 10}}
            title="Order medicine's drug"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('Forgotpass')}}
        />

        <Button 
          
          containerStyle = {{marginBottom: 25, width: '70%'}}
            title="my presciption "
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('PatientPresciption')}}
        />

        <Button 
          
          containerStyle = {{width: '70%'}}
            title="my presciption "
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {setRdv(true)}}
        />
        

       
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