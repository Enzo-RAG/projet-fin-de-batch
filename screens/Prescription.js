
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
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


    useEffect(() => {
      setEmail(props.pseudo.users._id)
      console.log('suis la', props.pseudo)
  
      const findArticlesWishList = async () => {
        const dataWishlist = await fetch('https://arcane-sierra-33789.herokuapp.com/recepprescription', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `id=${email}`
          
        })
        console.log("justeapreslefetchdedededededededededeede", dataWishlist )
        const body = await dataWishlist.json()
        console.log('testtttttttttttttttttttttttttttttttttttttt', body)
        // console.log(body)
        setInfo(body.prescription)
        if(info != null){
          setRdv(true) 
        }
     
      }
    
      findArticlesWishList()
    },[email])


// console.log('testmap info', info)


useEffect(() => {

  var test = info.map((info1 , i ) => {
  setinfo2(info1)
  console.log("retour info", info1)
  // console.log("retourinfo", info1)
    if(info1.prescription !== null){
    return(
    <Card containerStyle={{width: '70%'}}>
      
    <Card.Title>{info1.date}</Card.Title>
    <Card.Divider/>
    
    {info1.prescription.map((info3, i) => {
      console.log("testdeinforlicorne",info3)
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
  }else{
    return(<Text h3 style={{color:"#F0F0F0"}}> no presciption</Text>)
  }
})
 
  setTest(test)

  
},[info])


   
    


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
        <Text h3 style={{color:"#F0F0F0"}}> My Presciption</Text>
        <ScrollView>
        {test}
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


  function mapStateToProps(state) {
    return { pseudo : state.pseudo , id : state.id }
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(HomeScreen);