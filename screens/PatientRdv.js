
import React, {useState} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';


export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [rdv, setRdv] = useState(false)
    const [day1, setDay1] = useState("")
    const [info, setInfo] = useState("")

var dayrdv = day1.dateString

    console.log(dayrdv)
    console.log(info)

  console.log("test##############################################################")

    LocaleConfig.locales['fr'] = {
        monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
        dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
        today: 'Aujourd\'hui'
      };
      LocaleConfig.defaultLocale = 'fr';

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

        </View>
        

        <Calendar

   
   onDayPress={(day) => {setDay1(day)}}
   // Handler which gets executed on day long press. Default = undefined
   markedDates={{
    '{dayrdv}' : {selected: true, marked: true, selectedColor: 'blue'},
    '2021-06-17': {marked: true},
    '2021-06-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2021-06-19': {disabled: true, disableTouchEvent: true}
  }}
        />
        <Text> MY RDV : le {day1.dateString}  </Text>
        <Input
        containerStyle = {{marginBottom: 5, width: '70%'}}
        inputStyle={{marginLeft: 10}}
        placeholder='descrition des symptome'
        leftIcon={
          <Icon
          name='user'
          size={24}
          color="#727679"
          />
        }
        onChangeText={(symptome)=>setInfo(symptome)}
    />
        
        {/* EMAIL */}
        <Button 
          
          containerStyle = {{marginBottom: 25, width: '70%', marginTop: 10}}
            title="valide prise RDV"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('Forgotpass')}}
        />
            
        {/* MP oublier */}
       
       
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