
import React, {useState} from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [rdv, setRdv] = useState(false)
    const [numberdrug, setNumberDrug] = useState([1, 1])

    console.log(numberdrug)

    var drug = numberdrug.map((number)=>{
          
      return (
        <Input 
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder= "drug"
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#727679"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />
      );
    });
      


    return (
    <View style={styles.container}>
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
            <ScrollView style={{width: '100%'}}>
         
        
        <Image
            containerStyle = {{marginBottom: 10, marginTop: 10}}
            source={{ uri: 'https://picsum.photos/200' }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
            PlaceholderContent={<ActivityIndicator />}
            />
            <Text h2 style={{color:"#727679"}}> prenom</Text>
            
        <View style={styles.container} backgroundColor="#727679">
        <Text h3 style={{color:"#F0F0F0"}}> Presciption</Text>

        {drug}
       
        </View>
       
     
        <Button 
                    
                    containerStyle = {{width: '70%'}}
                      title="another drugs"
                      type="solid"
                      buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
                      onPress={() => {setNumberDrug([...numberdrug, 1])}}
                  />




            <Button 
                    
          containerStyle = {{width: '70%'}}
            title="Send presciption "
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {setRdv(true)}}
        />
        <Text></Text>
        <Text></Text>

        </ScrollView>
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