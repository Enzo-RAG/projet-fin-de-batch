
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';



 function Ordonnance (props) {
    
    const [rdv, setRdv] = useState(true)
    const [email, setEmail] = useState('')
    const [info, setInfo] = useState([])
    const [test, setTest] = useState([])
    


    useEffect(() => {
      setEmail(props.pseudo.users._id)
      
  
      const findArticlesWishList = async () => {
        const dataWishlist = await fetch('https://arcane-sierra-33789.herokuapp.com/recepprescription', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `id=${email}`
          
        })
       
        const body = await dataWishlist.json()
        
        setInfo(body.prescription)
        if(info != null){
          setRdv(true) 
        }
     
      }
    
      findArticlesWishList()
    },[email])





useEffect(() => {

  var test = info.map((info1 , i ) => {
  if(info1.prescription.length >= 1){
  
  
    if(info1.prescription !== null){
    return(
      <Card containerStyle={{width: '90%', alignItems: 'center',justifyContent: 'center'}}>
      
    <Card.Title>{info1.date.substr(0, 10)}</Card.Title>
    <Card.Divider/>
    
    {info1.prescription.map((info3, i) => {
      
      return (
      <View>
      <Text h4> Medicament {i+1}</Text>
      <Text style={{marginBottom: 10}}>
      Medicament :{info3.autre} 
    
      </Text>
      <Text style={{marginBottom: 10}}>
      Quantité : {info3.number} 
    
      </Text>
      <Text style={{marginBottom: 10}}>
      Prise : {info3.prise} 
    
      </Text>
      <Text style={{marginBottom: 10}}>
      durée: {info3.duree} / jour
    
      </Text>
     
      
      </View>  
      )
    })}
         
  </Card>)
  }else{
    return(<Text h3 style={{color:"#F0F0F0"}}> Aucune Ordonnance</Text>)
  }
  }})
 
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
        <Text h3 style={{color:"#F0F0F0"}}> Historique Des Ordonnances</Text>
        <ScrollView style={styles3.container}>
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

  const styles3 = StyleSheet.create({
    container: {
      width : '100%',
      backgroundColor: '#727679'
    },
  });


  function mapStateToProps(state) {
    return { pseudo : state.pseudo , id : state.id }
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(Ordonnance);