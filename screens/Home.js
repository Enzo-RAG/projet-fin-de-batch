import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import React,{useEffect,useState} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';
import {Button, Header, Image, Text} from 'react-native-elements'
import {connect} from 'react-redux';


function Home(props) {
   
  const [pseudo, setPseudo] = useState('');
  const [rdv, setRdv] = useState(false);
  var DispoEnPharmacie = 10
  var prix = 35
  var commandeNumero ="61b8687cc1639606425719ef201"
  var timeStamp =  1639642986598 + ((60*7+43)*1000)
  const [now,setNow] = useState(0)

const convertSecondeIntoMinute = (timeToConvert)=>{
  var minutes = Math.floor(timeToConvert/60)
  var secondes = Math.floor(timeToConvert - (60*minutes))
  var timeStamp =  minutes + " min " + secondes + " sec."
  return timeStamp
}
useEffect(() => {
  let interval = setInterval(() => {console.log("now:", Date.now()); setNow(Date.now()) }, 1000);
}, []);
var couocou = convertSecondeIntoMinute((timeStamp - Date.now())/1000)
    return (
    <View style={styles.container}>
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
           
         
        <View style={styles.container} >
        <Image
            containerStyle = {{marginBottom: 10, marginTop: 10}}
            source={{ uri: 'https://picsum.photos/200' }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
            PlaceholderContent={<ActivityIndicator />}
        />
        {/*<Text h2 style={{color:"#727679"}}> {props.pseudo.users.nom}</Text>*/}
            
        <View style={styles.container} backgroundColor="#727679">
          <Text h3 style={{color:"#F0F0F0"}}> Mes Rendez-Vous :</Text>

          <Button
           containerStyle = {{ width: '70%'}}
           title="Mes Rendez-Vous"
           type="solid"
           buttonStyle={{ backgroundColor: "#8AA78B" }}
           onPress={() => {props.navigation.navigate('agenda')}}
          />
        
          <Button          
            containerStyle = {{marginBottom: 25, width: '70%', marginTop: 25}}
              title="Réserver"
              type="solid"
              buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
              onPress={() => {props.navigation.navigate('PatientRdv')}}
          />
        
        </View>
      
        <View style={{borderTopLeftRadius:20, borderTopRightRadius:20 ,width:350, marginTop:25, backgroundColor:"#8AA78B", height:350, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start"}}>
            <View style={{border:"solid",borderLeftWidth:1,borderTopWidth:1,borderRightWidth:1, borderTopLeftRadius:20, borderTopRightRadius:20 ,backgroundColor:"lightgrey", width:"100%",height:50, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start"}}> 
              <Text style={{paddingLeft:20}}>
                Commande n°: {commandeNumero}
              </Text>
              <Text style={{paddingLeft:20}}>
                Temps restant avant expiration : {couocou} 
              </Text>
            </View>

            <View style={{border:"solid", borderWidth:1, height:30, width:"100%", backgroundColor:"lightgrey", display: "flex", justifyContent:"center", alignItems: 'center'}}> 
              <Text>Nombre de pharmacies connectées: 1</Text>
            </View>
            <View style={{border:"solid", borderWidth:1, marginTop:10, height:30, width:"95%", backgroundColor:"white", display: "flex", justifyContent:"center", alignItems: 'center'}}>
              <Text>
                Proposition pharmacie N° 1
              </Text>
            </View>
            <View style={{borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:1, border:"solid", height:140, width:"95%", backgroundColor:"lightgrey", display: "flex", justifyContent:"center", alignItems: 'flex-start'}}>
              <Text style={{paddingLeft:10}}>
                Nom de la pharmacie : Pharmacie idéale
              </Text>
              <Text style={{paddingLeft:10, paddingTop:5}}>
                Prix TTC proposé sans livraison : {prix}€
              </Text>
              <Text style={{paddingLeft:10, paddingTop:5}}>
                Prix TTC proposé avec livraison : {prix + 3.98}€
              </Text>
              <Text style={{paddingLeft:10, paddingTop:5}}>
                Disponibilité du paquet pour livraison : {DispoEnPharmacie} minutes
              </Text>
              <Text style={{paddingLeft:10, paddingTop:5}}>
                Paquet chez vous dans : {DispoEnPharmacie+15}/{DispoEnPharmacie+30} minutes
              </Text>
            </View>
            <View style={{border:"solid", borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1, height:60, width:"95%", backgroundColor:"white", display: "flex", flexDirection:"row", justifyContent:"center", alignItems: 'center'}}>
              <Button
                containerStyle = {{ width: '40%'}}
                title="Valider"
                type="solid"
                buttonStyle={{ backgroundColor: "#8AA78B" }}
                onPress={() => {props.navigation.navigate('Home')}}
              />
              <Button
                containerStyle = {{ marginLeft:10, width: '40%'}}
                title="Refuser"
                type="solid"
                buttonStyle={{ backgroundColor: "rgba(255,0,0,0.6)" }}
                onPress={() => {props.navigation.navigate('Home')}}
              />
            </View>
        </View> 
      </View>
       

        
        
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

  function mapStateToProps(state) {
    return { pseudo : state.pseudo }
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(Home);