import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator, Text  } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

import {Button, Input, Header, Image, Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';



 function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [rdv, setRdv] = useState(true)
    const [email, setEmail] = useState('')
    const [info, setInfo] = useState([])
    const [test, setTest] = useState([])
    const [info2, setinfo2] = useState([])
    const [doc, setDoc] = useState('')
    const [count, setCount] = useState([])
    const [count2, setCount2] = useState("2")

        console.log('testdela novel info    dsdfsd' , count)
        console.log('testdela novel info    dsdfsd' , info)
    useEffect(() => {
      setEmail(props.pseudo.users._id)
      
  
      const findArticlesWishList = async () => {
        const dataWishlist = await fetch('https://arcane-sierra-33789.herokuapp.com/recepMyprescription', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `id=${props.id}`
          
        })
        
        const body = await dataWishlist.json()
        
        // console.log(body)
        await setInfo(body.prescription)
        await setCount(body.prescription.prescription)
        await setCount2(count.length)
        if(info != null){
          setRdv(true) 
        }
     
      }
    
      findArticlesWishList()
    },[])

    useEffect(() => {
        const findByName = async () => {
          var rawresponse = await fetch('https://arcane-sierra-33789.herokuapp.com/searchuser', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `email=${info.medecinId}`
        })
         var user = await rawresponse.json()
          
          setDoc(user)
            }
        findByName()
      },[])

// console.log('testmap info', info)


useEffect(async () => {
            var count1 = await count.length

            console.log("***********************robobrole", count1)
  var test = (() => {
  
  
  // console.log("retourinfo", info1)
    if(count2 <= 1){
        console.log('jesuis passer pour je veux ')    
    return(
    <Card containerStyle={{width: '70%'}}>
      
    <Card.Title>{info.date}</Card.Title>
    <Card.Divider/>
    
        
     
      <View>
      <Text style={{marginBottom: 10}}>
      {info.prescription[0].number} 
    
    
      </Text>
      <Text style={{marginBottom: 10}}>
      {info.prescription.prise} 
    
      </Text>
      <Text style={{marginBottom: 10}}>
      {info.prescription.duree} 
    
      </Text>
      <Text style={{marginBottom: 10}}>
      {info.prescription.autre} 
    
      </Text>
      
      </View>  
      
    
         
  </Card>)
  }else{

    console.log('jesuis passer par le map ')
    return(
        <Card containerStyle={{width: '70%'}}>
          
        <Card.Title>{info.date}</Card.Title>
        <Card.Divider/>
        
        {count.map((info3, i) => {
          
          return (
          <View>
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
          
          </View>  
          )
        })}
             
      </Card>)
  }
})
 
  setTest(test)

  
},[count])


   
    


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
        <Text h3 style={{color:"#F0F0F0"}}> Presciption du rdv le {info.date} du Docteur  </Text>
        <ScrollView>
        {test}
      

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


  function mapStateToProps(state) {
    return { pseudo : state.pseudo , id : state.id }
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(HomeScreen);