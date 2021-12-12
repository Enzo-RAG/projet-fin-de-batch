
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';

import {Button, Input, Header, Image, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';



 function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [rdv, setRdv] = useState(false)
    const [email, setEmail] = useState('')
    const [info, setInfo] = useState([])


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
        setInfo(body)
     
      }
    
      findArticlesWishList()
    },[email])


console.log('testmap info', info.prescription[0].date)




   
    const Mypresciption = () => {

        if(rdv == true){
        return(
        <Card containerStyle={{width: '70%'}}>
          
        <Card.Title>{info.prescription.date}</Card.Title>
        <Card.Divider/>
          <Text style={{marginBottom: 10}}>
            medoc 1
          </Text>
          <Text style={{marginBottom: 10}}>
            medoc 2
          </Text>
         
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='order now' />
          
          
      </Card>)
      }else{
        return(<Text h3 style={{color:"#F0F0F0"}}> no presciption</Text>)
      }
    }


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
        <Text h3 style={{color:"#F0F0F0"}}> My Presciption</Text>

        {Mypresciption()}
       
        </View>
       
        <Button 
          
          containerStyle = {{width: '70%'}}
            title="Search medicament "
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {setRdv(true)}}
        />

            <Button 
                    
          containerStyle = {{width: '70%'}}
            title="test "
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {setRdv(true)}}
        />
        

       
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
  )(HomeScreen);