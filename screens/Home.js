import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import React from 'react';
import { StyleSheet, View, ActivityIndicator  } from 'react-native';
import {Button, Header, Image, Text} from 'react-native-elements'
import {connect} from 'react-redux';


function Home(props) {
   
    return (
    <View style={styles.container}>
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
           
         
        <View  >
        <Image
            containerStyle = {{marginBottom: 10, marginTop: 10}}
            source={{ uri: 'https://picsum.photos/200' }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
            PlaceholderContent={<ActivityIndicator />}
        />
        <Text h2 style={{color:"#727679"}}> {props.pseudo.users.nom}</Text>
            
        <View style={styles.container} backgroundColor="#727679">
          <Text h3 style={{color:"#F0F0F0"}}> Mes Rendez-Vous :</Text>

          <Button
           containerStyle = {{ width: '70%'}}
           title="Mes Renz-Vous"
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
      
        <View style={{width:350, marginTop:50, backgroundColor:"#8AA78B", height:300}}>
          <View> 

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