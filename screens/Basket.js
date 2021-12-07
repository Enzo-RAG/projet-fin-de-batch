import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import React, {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import { Button, Card, Text, Rating,Header,Badge,Image  } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const Basket = (props) => {

    return (
    <View style={{backgroundColor:"#F0F0F0"}}>
        <StatusBar hidden={false} StatusBarStyle="light-content"/>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Panier', style: { color: '#fff', fontWeight:"bold" } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <ScrollView style={{ marginBottom: 85 }}>
                {props.basket.basket.map((profile,i)=>
                (   <Card key={i}>
                        <Card.Title 
                            style={{fontWeight: 'bold',fontSize: 16, backgroundColor:"#F0F0F0",paddingBottom:5 ,paddingTop:5,marginTop:0,marginBottom:0}}>
                            {profile.name}
                        </Card.Title>
                        <View style={{paddingTop:10, flexDirection:"row" , justifyContent: 'center', alignItems:'center'}}>
                            <Text>Quantity: {profile.quantity}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:15}}>
                             <View style={{width:"40%",display:"flex"}}>
                                <Image 
                                    source={{uri:profile.img}} 
                                    style={{height:100}} 
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={{width:"60%",display:"flex"}}>
                                <Button
                                    icon={<Ionicons name="add-circle-sharp" size={25} color="#FFF" />}
                                    buttonStyle={{backgroundColor:"#8AA78B", borderRadius: 100, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                                    title=' Add one quantity' 
                                    onPress={()=> {
                                        console.log("**************************** add **********************")
                                        props.addToBasket({name:profile.name,img:profile.img})
                                    }
                                    }
                                />
                                <Button
                                    icon={<Ionicons name="remove-circle-sharp" size={25} color="rgba(250,0,0,0.4)" />}
                                    type="outline"
                                    buttonStyle={{borderRadius: 100, borderColor:"rgba(250,0,0,0.4)", marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title=' Remove one quantity'
                                    titleStyle={{color:"rgba(250,0,0,0.6)"}} 
                                    onPress={()=> {
                                        console.log("**************************** remove **********************")
                                        props.deleteOne({name:profile.name,img:profile.img})
                                    }}
                                />
                            </View>                     
                        </View>   
                                          
                    </Card>
                ))}
            </ScrollView>
        </View>  
    );
};

function mapStateToProps(state) {
    return { basket : state }
  }

function mapDispatchToProps(dispatch) {
    return {
      addToBasket: function (medoc) {dispatch({ type: 'addToBasket', objMedoc: medoc})},
      deleteOne : function (medoc) {dispatch({ type: 'deleteOne', objMedoc: medoc})}
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basket);

