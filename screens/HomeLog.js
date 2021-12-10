import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground, Text, View  } from 'react-native';

import {Button, Input, Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import  {Dropdown}  from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

// Dropdown
const data = [
  { label: 'patient', value: 1 },
  { label: 'livreur', value: 2 },
  { label: 'pharmacien', value: 3 },
  { label: 'docteur', value: 4 },
  // { label: 'Item 5', value: '5' },

];

function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    // Dropdown
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    // Dropdown
   
        const [response, setResponse]=useState('')

        const [nom, setNom]= useState('')
        const [email, setEmail]= useState('')
        const [password, setPassword]= useState('')
        const [prenom, setPrenom]= useState('')
        const [documents, setDocuments]= useState([])
        const [photo, setPhoto]= useState([])
        const [adress, setAdress]= useState('')
        const [ville, setVille]= useState('')
        const [codePostal, setCodePostal]= useState('')
        const [telephone, setTelephone]= useState('')
        const [status, setStatus]= useState(0)
        const [nSecu, setNSecu]= useState('')
        const [mutuel, setMutuel]= useState('')
        const [idBanque, setIdBanque]= useState({})
        const [plaqueImmat, setPlaqueImmat]= useState('')
        const [numPharma, setNumPharma]= useState('')
        const [numDoc, setNumDoc]= useState('')
        const [antecedent, setAntecedent]= useState('')


        console.log(prenom,nom,password,email,)
     
      var handleClick = async () =>{
        //  signup();
        var rawresponse = await fetch('https://helpills.herokuapp.com/inscription', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `nom=${nom}&email=${email}&password=${password}&prenom=${prenom}&documents=${documents}&photo=${photo}&adress=${adress}&ville=${ville}&codePostal=${codePostal}&telephone=${telephone}&status=${status}&nSecu=${nSecu}&mutuel=${mutuel}&idBanque=${idBanque}&plaqueImmat=${plaqueImmat}&numPharma=${numPharma}&numDoc=${numDoc}&antecedent=${antecedent}`
           })

           var response = await rawresponse.json();
    setResponse(response)
    setPseudo(response)
    console.log('testdfsdfdsfdsfs$$$$$$df',response.isok)
         
        
      }
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const nbreAleatoire = (min,max)=>{
  return Math.floor(Math.random() * (max+1 - min) + min);
}



const creerCreneaux = ()=>{
  var heure = ''
  var heureNumber = 0
  var minutes = ''
  var minNumber = 0

  if(nbreAleatoire(0,1) == 0){
    minutes='00'
  }else{
    minutes='30'
    minNumber = 0.5
  }
  var a = nbreAleatoire(0,1)
  var b = ''
  
  if(a==0){
  b=nbreAleatoire(0,9)
  heureNumber = b
  }else{
    b=nbreAleatoire(0,5)
    heureNumber = 10+b
  }
  heure += ""+a+b+':'+minutes
  heureNumber += minNumber
  return {string:heure, number:heureNumber}
}

const conversionDate=(number)=>{
  var string = ""
  if(Math.floor(number)!=number){
    if(number<10){
      string="0"+Math.floor(number) +":30"
    }else{
      string=Math.floor(number)+":30"
    }
  }else{
    if(number<10){
      string="0"+Math.floor(number) +":00"
    }else{
      string=Math.floor(number)+":00"
    }
  }
  return string
}


const creneaux = (heureDebut) =>{
  console.log("heureDebut", heureDebut)
  var heureDeFin = nbreAleatoire(Math.floor(heureDebut+1),23)
  const heure =[]
  if(Math.floor(heureDebut)!=heureDebut){
    for(var i=0;i<((heureDeFin-Math.floor(heureDebut))*2);i++){
      heure.push(conversionDate(heureDebut+(i/2)))
    }
  }else{
    for(var i=0;i<((heureDeFin+0.5-Math.floor(heureDebut))*2);i++){
     heure.push(conversionDate(heureDebut+(i/2)))
    }}
  return heure
}






const isAvailableAleatoire= () =>{
    const jour = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]
    var objectDispo = []
    var dispo = []
    var nombre = nbreAleatoire(0,5)
    for (var i=0; i<nombre-1; i++){
        var jourAleatoire = jour[nbreAleatoire(0,jour.length-1)]
        if(!dispo.includes(jourAleatoire)){
        dispo.push(jourAleatoire)}              
    }
    for(var i2=0; i2<dispo.length;i2++){
      objectDispo.push({date:dispo[i2],creneaux:creneaux(creerCreneaux().number)})
    }
    return objectDispo
  }

console.log("aaaaa",isAvailableAleatoire())

      const chainenNmbreAleatoire =(nbre)=>{
        var chaine = ""
        for (var i=0;i<nbre;i++){
         chaine += nbreAleatoire(0,9)
        }
        return chaine
      }



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    var infoplus = () =>  {  

      if(value == 1){
        console.log("b",value)
        return(
        <View style={styles3.container}>
        <Input
        containerStyle = {{marginBottom: 5, width: '70%'}}
        inputStyle={{marginLeft: 10}}
        placeholder='antecedant medico'
        leftIcon={
          <Icon
          name='user'
          size={24}
          color="#727679"
          />
        }
        onChangeText={(val) => setAntecedent(val)}
         />
          <Input
              containerStyle = {{marginBottom: 5, width: '70%'}}
              inputStyle={{marginLeft: 10}}
              placeholder='Numéro de téléphone'
              leftIcon={
                <Icon
                name='user'
                size={24}
                color="#727679"
                />
              }
              onChangeText={(val) => setTelephone(val)}
          />
          <Input
              containerStyle = {{marginBottom: 5, width: '70%'}}
              inputStyle={{marginLeft: 10}}
              placeholder='numéro de sécurité sociale'
              leftIcon={
                <Icon
                name='user'
                size={24}
                color="#727679"
                />
              }
              onChangeText={(val) => setNSecu(val)}
          />
          <Input
                  containerStyle = {{marginBottom: 5, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                  placeholder='numéro de mutuelle'
                  leftIcon={
                    <Icon
                    name='user'
                    size={24}
                    color="#727679"
                    />
                  }
                  onChangeText={(val) => setMutuel(val)}
              />
              
    </View>
        )}else if(value == 2){
      return(
        <View style={styles3.container}>
          <Input
          containerStyle = {{marginBottom: 5, width: '70%'}}
          inputStyle={{marginLeft: 10}}
          placeholder='num de plac imatriculation'
          leftIcon={
            <Icon
            name='user'
            size={24}
            color="#727679"
            />
          }
          onChangeText={(val) => setPlaqueImmat(val)}
      />
     
      </View>
          )
      }else if(value == 3){
        return(
          <View style={styles3.container}> 
            <Input
            containerStyle = {{marginBottom: 5, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='num de pharmacien'
            leftIcon={
              <Icon
              name='user'
              size={24}
              color="#727679"
              />
            }
            onChangeText={(val) => setNumPharma(val)}
        />
        
              
          </View>
            )
        }else if(value == 4){
          return(
              
            <View style={styles3.container}>
              <Input
              containerStyle = {{marginBottom: 5, width: '70%'}}
              inputStyle={{marginLeft: 10}}
              placeholder='num de docteur'
              leftIcon={
                <Icon
                name='user'
                size={24}
                color="#727679"
                />
              }
              onChangeText={(val) => setNumDoc(val)}
          />
          
            </View>
              )
          }
          return null

        }

  
    
    return (
<ScrollView>
    <View style={styles.container}>
      <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
         
    
        
        
         
        {/* NOM */}
        <Input
            containerStyle = {{marginBottom: 5, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Nom'
            leftIcon={
              <Icon
              name='user'
              size={24}
              color="#727679"
              />
            }
            onChangeText={(val) => setNom(val)}
        />
              {/* prenom */}
            <Input
            containerStyle = {{marginBottom: 5, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Prenom'
            leftIcon={
              <Icon
              name='user'
              size={24}
              color="#727679"
              />
            }
            onChangeText={(val) => setPrenom(val)}
        />    
         {/* Email */}
         <Input
            containerStyle = {{marginBottom: 5, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Email'
            leftIcon={
              <Icon
              name='user'
              size={24}
              color="#727679"
              />
            }
            onChangeText={(val) => {setEmail(val)}}
        />   
            <Input  secureTextEntry={true}
            containerStyle = {{marginBottom: 5, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Mot de passe'
            leftIcon={
              <Icon
              name='user'
              size={24}
              color="#727679"
              />
            }
            onChangeText={(val) => setPassword(val)}
        />
            
            <Input
                  containerStyle = {{marginBottom: 5, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                  placeholder='Adresse'
                  leftIcon={
                    <Icon
                    name='user'
                    size={24}
                    color="#727679"
                    />
                  }
                  onChangeText={(val) => setAdress(val)}
              />
              <Input
                  containerStyle = {{marginBottom: 5, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                  placeholder='Ville'
                  leftIcon={
                    <Icon
                    name='user'
                    size={24}
                    color="#727679"
                    />
                  }
                  onChangeText={(val) => setVille(val)}
              />
              <Input
                  containerStyle = {{marginBottom: 5, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                  placeholder='Code postale'
                  leftIcon={
                    <Icon
                    name='user'
                    size={24}
                    color="#727679"
                    />
                  }
                  onChangeText={(val) => setCodePostal(val)}
              />

        {/* Dropdown */}
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
          placeholder={!isFocus ? 'vous etes ?' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            setStatus(item.value)
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
        {infoplus()}
        <Button
           containerStyle = {{ width: '70%'}}
           title="CONNECTION"
           type="solid"
           buttonStyle={{ backgroundColor: "#8AA78B" }}
           onPress={() => {handleClick();if(response.isok == true){ console.log("test"),props.onSubmitPseudo(pseudo),props.navigation.navigate('Home')}else{ console.log("test2"),props.navigation.navigate('HomeLog')}}}
        />
         <Button
           containerStyle = {{ width: '70%'}}
           title="doc home"
           type="solid"
           buttonStyle={{ backgroundColor: "#8AA78B" }}
           onPress={() => {props.navigation.navigate('agenda')}}
        />
        

        
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  },
});
const styles3 = StyleSheet.create({
  container: {
    width: "100%",
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



function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function (pseudo) {
      dispatch({ type: 'savePseudo', pseudo: pseudo })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(HomeScreen);