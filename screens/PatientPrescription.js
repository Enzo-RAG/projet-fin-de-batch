
import React, {useState} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [rdv, setRdv] = useState(false)


   
    const Mypresciption = () => {
      if(rdv == true){
        return(
        <Card containerStyle={{width: '70%'}}>
        <Card.Title>prescriprion 1</Card.Title>
        <Card.Divider/>
          <Text style={{marginBottom: 10}}>
            medoc 1
          </Text>
          <Text style={{marginBottom: 10}}>
            medoc 2
          </Text>
         
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='order now' />
          
          
      </Card>)
      }else{
        return(<Text h3 style={{color:"#F0F0F0"}}> no presciption</Text>)
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
        <Text h3 style={{color:"#F0F0F0"}}> My Presciption</Text>

        {Mypresciption()}
       
        </View>
       
        <Button 
          
          containerStyle = {{width: '70%'}}
            title="Search medicament "
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {setRdv(true)}}
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