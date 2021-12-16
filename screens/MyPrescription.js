
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import * as Linking from "expo-linking"

import {Button, Input, Header, Image, Card, Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';

import { Ionicons } from '@expo/vector-icons';



 function HomeScreen(props) {
   
    const [info, setInfo] = useState([])
 
    const [doc, setDoc] = useState([])
    const [count, setCount] = useState([])
    const [count2, setCount2] = useState('')
    const [number, setNumber] =useState('')
    const [prise, setPrise] = useState('')
    const [duree, setDuree] = useState('')
    const [autre, setAutre] = useState('')
    const [response, setResponse] = useState([])
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [ant, setAnt] = useState('')
    const [tel, setTel] = useState('')
        
    useEffect(() => {
      
      
  
      const findArticlesWishList = async () => {
        const dataWishlist = await fetch('https://arcane-sierra-33789.herokuapp.com/recepMyprescription', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `id=${props.id}`
          
        })
        
        const body = await dataWishlist.json()
        
       
         setInfo(body.prescription)
         setCount(body.prescription.prescription)
         setCount2(body.prescription.prescription.length)
         addmed10()
         setDate(body.prescription.date.substr(0, 10))
         setDescription(body.prescription.description)
        
        console.log("recupe prescirption", count2)
     
      }
    
console.log("test retour de info", info)

      findArticlesWishList()
    },[response])

    useEffect(() => {

      if(props.pseudo.users.status == 1 ){
        const findByName = async () => {
          var rawresponse = await fetch('https://arcane-sierra-33789.herokuapp.com/searchuser', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `email=${info.medecinId}`
        })
         var user = await rawresponse.json()
         setDoc(`docteur.${user.users.nom}`)
         setAnt(user.users.antecedent)
          
          
            }
        findByName()
      }else{const findByName = async () => {
        var rawresponse = await fetch('https://arcane-sierra-33789.herokuapp.com/searchuser', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `email=${info.patientId}`
      })
       var user = await rawresponse.json()
        
        setDoc(`patient.${user.users.nom}`)
        setAnt(user.users.antecedent)
        console.log("test retour de user", user)
        setTel(user.users.telephone)
        
          }
      findByName()}
      
    },[count])


    console.log("test retour de user", doc)

     






console.log('*****************testede count *********', count2)
            
  var test10 = () => {
  
   
  
    if(count2 != 0){
          
      
    return(
        <Card containerStyle={{width: '90%', alignItems: 'center',justifyContent: 'center'}}>
          
        <Card.Title> ordonance du  {date}</Card.Title>
        <Card.Divider/>
        
        {count.map((info3, i) => {
          
          return (
          <View>
          <Text h4> medicament {i+1}</Text>
          <Text style={{marginBottom: 10}}>
          {info3.number} 
        
          </Text>
          <Text style={{marginBottom: 10}}>
          {info3.prise} 
        
          </Text>
          <Text style={{marginBottom: 10}}>
          {info3.duree} 
        
          </Text>
          <Text style={{marginBottom: 10}}>
          {info3.autre} 
        
          </Text>
          <Button
                            icon={<Ionicons name="cart-outline" size={25} color="#FFF" />}
                            buttonStyle={{backgroundColor:"#8AA78B", borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title=' Add to basket' 
                            onPress={()=> {
                                console.log("********************* add to basket")
                                props.addToBasket({name:info3.autre ,img: 'https://picsum.photos/200' })
                               }
                              }
                        /> 
          </View>  
          )
        })}
             
      </Card>)
  }else{
    
return(
<Card containerStyle={{width: '90%' ,alignItems: 'center',justifyContent: 'center'}}>
  
<Card.Title> aucun ordonance </Card.Title>


     
</Card>)

}}


  

  

var addmed10 = () => {
if(props.pseudo.users.status == 4 ){
  
  return(
<View style={styles.container}>
  <Input
  containerStyle = {{marginBottom: 5, width: '70%'}}
  inputStyle={{marginLeft: 10}}
  placeholder='number'
  leftIcon={
    <Icon
    name='user'
    size={24}
    color="#F0F0F0"
    />
  }
  onChangeText={(val) => setNumber(val)}
/>
<Input
  containerStyle = {{marginBottom: 5, width: '70%'}}
  inputStyle={{marginLeft: 10}}
  placeholder='prise'
  leftIcon={
    <Icon
    name='user'
    size={24}
    color="#F0F0F0"
    />
  }
  onChangeText={(val) => setPrise(val)}
/>
<Input
  containerStyle = {{marginBottom: 5, width: '70%'}}
  inputStyle={{marginLeft: 10}}
  placeholder='duree'
  leftIcon={
    <Icon
    name='user'
    size={24}
    color="#F0F0F0"
    />
  }
  onChangeText={(val) => setDuree(val)}
/>
<Input
  containerStyle = {{marginBottom: 5, width: '70%', }}
  inputStyle={{marginLeft: 10}}
  placeholder='autre'
  leftIcon={
    <Icon
    name='user'
    size={24}
    color="#F0F0F0"
    />
  }
  onChangeText={(val) => setAutre(val)}
/>
<Button
containerStyle = {{ width: '70%'}}
title="add doc"
type="solid"
buttonStyle={{ backgroundColor: "#8AA78B" }}
onPress={() => {addprescription()}}
/>
</View>)
}}
   
   
var addprescription = async () =>{
    const dataWishlist = await fetch('https://arcane-sierra-33789.herokuapp.com/addprescription', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `id=${props.id}&number=${number}&prise=${prise}&duree=${duree}&autre=${autre}`
    
  })
    const body = await dataWishlist.json()
    setResponse(body)
    
 }
 
 var appel = function(){
  Linking.openURL(`tel:${tel}`)
}
var appel1 = () => {
  if(props.pseudo.users.status == 4 ){
  return(
    <View style={styles2.container}>
       <Text>
        antecedent : {ant}

    </Text>
    <Button 
    containerStyle = {{marginBottom: 25, width: '70%'}}
      title="appel RDV"
      type="solid"
      buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
      onPress={() => {appel()} }
  />

 
  </View>
 
  )
}}

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
        <Text h3 style={{color:"#F0F0F0",alignItems: 'center',justifyContent: 'center'}}> RDV du {date}  </Text>
        <Text h3 style={{color:"#F0F0F0",alignItems: 'center',justifyContent: 'center'}}>  {doc}  </Text>
        <View style={styles.container}>
        <Text h4 > Description Des Symptome : {description} </Text>
        <Text> </Text>
        </View>
        {appel1()}
       
       
       
       
       
        
        <ScrollView style={styles3.container}>
        {addmed10()}
        
        {test10()}
        <Text></Text>
        

      
        <Button 
          containerStyle = {{marginBottom: 25, width: '100%', alignItems: 'center',justifyContent: 'center',}}
            title="Go home page"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => props.navigation.navigate(`BottomNavigator${props.pseudo.users.status}`, { screen: 'Home' }) }
        />
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
       
        </ScrollView>
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

  const styles2 = StyleSheet.create({
    container: {
      width : '80%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0F0F0'
    },
  });
  const styles3 = StyleSheet.create({
    container: {
      width : '100%',
      
     
      backgroundColor: '#727679'
    },
  });


  function mapStateToProps(state) {
    return { pseudo : state.pseudo , id : state.id }
  }
  function mapDispatchToProps(dispatch) {
    return {
      addToBasket: function (medoc) {
        dispatch({ type: 'addToBasket', objMedoc: medoc})
      }
    }
  }
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(HomeScreen);

