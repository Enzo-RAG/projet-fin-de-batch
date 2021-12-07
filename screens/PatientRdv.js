
import React, {useState} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';


export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [rdv, setRdv] = useState(false)
    const [date, setDate] = useState("")
    const [patientId , setPatienId] = useState("maxime2@gmail.com") 
    const [medecinId, setMedecinId] = useState("maxime@gmail.com")
    const [photo, setPhoto] = useState("")
    const [descritpion, setDesciption] = useState("")
    const [validite , setValidite] = useState ("")
    const [prescriptionnumber, setPrescriptionnumber] = useState ("")
    const [prescriptionprise, setPrescriptionprise] = useState ("")
    const [prescriptionduree, setPrescriptionduree] = useState ("")
    const [prescriptionautre, setPrescriptionautre] = useState ("")
    

  
  console.log(date)
  console.log("test##############################################################")

  async function addRDV(){
  console.log("route add")
  var rawresponse = await fetch('https://frozen-scrubland-67920.herokuapp.com/addrdv',{
    method : 'POST',
    headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
    body: `date=${date}&descritpion=${descritpion}&Photo=${photo}&patientId=${patientId}&medecinId=${medecinId}`
  

  })}

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

   
   onDayPress={(day) => {setDate(day.dateString)}}
   // Handler which gets executed on day long press. Default = undefined
   markedDates={{
    '{dayrdv}' : {selected: true, marked: true, selectedColor: 'blue'},
    '2021-06-17': {marked: true},
    '2021-06-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2021-06-19': {disabled: true, disableTouchEvent: true}
  }}
        />
        <Input
        containerStyle = {{marginBottom: 5, width: '70%'}}
        inputStyle={{marginLeft: 10}}
        value={date}
        leftIcon={
          <Icon
          name='user'
          size={24}
          color="#727679"
          />
        }
        onChangeText={(date)=> setDate(date)}
    />
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
        onChangeText={(symptome)=>setDesciption(symptome)}
    />
        
        {/* EMAIL */}
        <Button 
          
          containerStyle = {{marginBottom: 25, width: '70%', marginTop: 10}}
            title="valide prise RDV"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('Forgotpass'), addRDV()}}
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