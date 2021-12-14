
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';

import  {Dropdown}  from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {connect} from 'react-redux';


function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [rdv, setRdv] = useState(false)
    const [date, setDate] = useState("")
    const [patientId , setPatienId] = useState("") 
    const [medecinId, setMedecinId] = useState("")
    const [photo, setPhoto] = useState("")
    const [description, setDesciption] = useState("")
    const [validite , setValidite] = useState ("")
    const [prescriptionnumber, setPrescriptionnumber] = useState ("")
    const [prescriptionprise, setPrescriptionprise] = useState ("")
    const [prescriptionduree, setPrescriptionduree] = useState ("")
    const [prescriptionautre, setPrescriptionautre] = useState ("")
    const [info, setInfo] = useState ([])
    const [namdoc ,setNamDoc] = useState('.....')

          
          // Dropdown
      const data = [];

      // Dropdown
       const [value, setValue] = useState(null);
       const [isFocus, setIsFocus] = useState(false);
       const [status, setStatus]= useState("")
       

       useEffect(() => {
        const findArticlesWishList = async () => {
          const dataWishlist = await fetch('https://arcane-sierra-33789.herokuapp.com/searchdoc')
          const body = await dataWishlist.json()
          
          for(var i=0 ; i < body.docteur.length ; i++){
              const test =  body.docteur[i]
              
              const test3 = {label : test.nom} 
              const test5 = { value : test.email };
              const test6 = Object.assign(test3, test5)
              data.push(test6)
            }
              }
      
        findArticlesWishList()
      },[isFocus])


         console.log('verifretourdinfo', props.pseudo.users.admin)

  
  

  async function addRDV(){
  
    await fetch('https://arcane-sierra-33789.herokuapp.com/addrdv',{
    method : 'POST',
    headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
    body: `date=${date}&description=${description}&Photo=${photo}&patientId=${patientId}&medecinId=${medecinId}`
  

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
            <Text h2 style={{color:"#727679"}}> {props.pseudo.users.nom}</Text>
            
        <View style={styles.container} backgroundColor="#727679">
        <Text h3 style={{color:"#F0F0F0"}}> My Appointment Book patient</Text>

        </View>
        
        <ScrollView>
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

<View style={styles.container}>
        
        <Dropdown
          style={[styles2.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles2.placeholderStyle}
          selectedTextStyle={styles2.selectedTextStyle}
          inputSearchStyle={styles2.inputSearchStyle}
          iconStyle={styles2.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? `votre medecin ${namdoc}` : `votre medecin ${namdoc}` }
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            setMedecinId(item.value)
            setNamDoc(item.label)
            
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles2.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />

      </View>
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
            onPress={() => {setPatienId(props.pseudo.users.email), addRDV(), props.navigation.navigate('BottomNavigator', { screen: 'GalleryScreen' })}}
        />
        
        {/* MP oublier */}
       
        <Text></Text>
        <Text></Text>
        <Text></Text>
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

  const styles2 = StyleSheet.create({
    container: {
      width: 50 ,
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      width: 290,
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      
      fontSize: 16,
    },
    selectedTextStyle: {
      
      fontSize: 16,
    },
    iconStyle: {
      
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

  function mapStateToProps(state) {
    return { pseudo : state.pseudo }
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(HomeScreen);