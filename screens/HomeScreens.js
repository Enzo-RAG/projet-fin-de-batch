
import React, {useState, useEffect} from 'react';
import {StyleSheet, View } from 'react-native';
import {Button, Input, Text, Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';


// style={styles.container}

function HomeScreen(props) {
   
    const[signinEmail, setSigninEmail] = useState('')
    const [signinPassword, setSigninPassword]= useState('')
    const [destination, setDestination]= useState('')
    const [test, setTest]= useState(true)
    const [pseudo, setPseudo] = useState('')
    const[response, setResponse]= useState('')
   
   
   var handleClickSignin = async () =>{
    var rawsignin = await fetch('https://helpills.herokuapp.com/connection', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${signinEmail}&password=${signinPassword}`
     })
    
    var response = await rawsignin.json();
    setResponse(response)

    if(body.result == true){
      setUserExists(true)
    }

    console.log('testdfsdfdsfdsfs$$$$$$df',response) 
   }

   useEffect(() => {
    const findByName = async () => {
      var rawresponse = await fetch('https://helpills.herokuapp.com/searchuser', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `email=${signinEmail}`
    })
     var user = await rawresponse.json()
      
      setPseudo(user)
        }
    findByName()
  },[response])

   return (
    
    <View style={styles.container}
    >
        {/* EMAIL */}
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
        <Text h1>Sign-in</Text>
        <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='email'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#727679"
                />
            }
            onChangeText={(val) => {setSigninEmail(val), setPseudo(val);}}
        />
            {/* PASSWORD */}
            <Input secureTextEntry={true}
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Password'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#727679"
                />
            }
            onChangeText={(val) => setSigninPassword(val)}
        />
        {/* CONNECTION */}
        <Button
           
           containerStyle = {{marginBottom: 25, width: '70%'}}
            title="CONNECTION"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" }}
            onPress={() => {
               handleClickSignin();
              {if(response.isok == true){ console.log("test");props.onSubmitPseudo(pseudo);props.navigation.navigate('BottomNavigator', { screen: 'Home' })}else{console.log("test2");props.navigation.navigate('HomeScreens')}} ;
            }}
        />
        {/* inscription  */}
        <Button
           containerStyle = {{marginBottom: 25, width: '70%'}}
            title="INSCRIPTION"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" }}
            onPress={() => {props.navigation.navigate('HomeLog')}}
        />

        {/* MP oublier */}
        <Button 
          containerStyle = {{marginBottom: 25, width: '70%'}}
            title="Mot de passe oublié"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B" , color: "redr"}}
            onPress={() => {props.navigation.navigate('map')}}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
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