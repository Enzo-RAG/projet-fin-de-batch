
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
            title="available"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('agenda')}}
        />)
      }}

    const rdv1 = () => {
      if(rdv == true){
        return(
            <Button 
          
            containerStyle = {{marginBottom: 25, width: '70%', marginTop: 10}}
              title="Les RDV"
              type="solid"
              buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
              onPress={() => {props.navigation.navigate('agenda')}}
          />)
          
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
        <Text h3 style={{color:"#F0F0F0"}}> My Appointment Book</Text>

        {rdv1()}
        {book()}
        
        </View>
        

       
        
        
        {/* EMAIL */}
       
            
        {/* MP oublier */}
        <Button 
          
          containerStyle = {{marginBottom: 25, width: '70%', marginTop: 10}}
            title="check medicine's drug"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('Forgotpass')}}
        />

        <Button 
          
          containerStyle = {{marginBottom: 25, width: '70%'}}
            title="presciption "
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('DocPrescriprion')}}
        />

        <Button 
          
          containerStyle = {{width: '70%'}}
            title="test "
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