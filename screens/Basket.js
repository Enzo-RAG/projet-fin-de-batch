import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import React, {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StatusBar} from 'react-native';
import { Button, Card, Text, Header,Image  } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import socketIOClient from "socket.io-client";
import commandesReducer from '../reducers/commandes.reducer';

var socket = socketIOClient("https://helpills1.herokuapp.com/");


const Basket = (props) => {
    const [message, setMessage] = useState();
    const [response, setResponse] = useState("");
    const [coucoy, setCoucoy] = useState("");


    const numeroCommande = (id) =>{
        var numCommande = ""
        var X =  Date.now();
        console.log(id)
        console.log(X)
       numCommande= id.substr(0, 9) + X + id.substr(19, 5)
       return numCommande
    }
    
    useEffect(() => { 
        socket.on("FromAPI", data => {
            setResponse(data);
          });

        socket.emit("Connected", { ville:props.basket.pseudo.users.adress.ville, status:"patient"});

        socket.on('Validation', (newMessage)=> {
            setMessage(newMessage);
            console.log((newMessage[0]!=undefined))
            if (newMessage[0]!=undefined){
                console.log(newMessage[0].panier[0].name)
                setCoucoy(newMessage[0].panier[0].name)
            }else{
                setCoucoy("")
            }
        }
      ) 
    }, []);
     if(props.basket.basket.length>0){
        return (
            <View style={{backgroundColor:"#F0F0F0"}}>
                <StatusBar hidden={false} StatusBarStyle="light-content"/>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                        centerComponent={{ text: 'Panier', style: { color: '#fff', fontWeight:"bold" } }}
                        rightComponent={{ icon: 'home', color: '#fff' }}
                    />
                    <ScrollView style={{ marginBottom: 85 }}>
                        <View style={{ display:'flex', flexDirection:"column", alignItems:"center", justifyContent:"center"}}>    
                        {props.basket.basket.map((profile,i)=>
                        (   <Card key={i}>
                                <Card.Title 
                                    style={{fontWeight: 'bold',fontSize: 16, backgroundColor:"#F0F0F0",paddingBottom:5 ,paddingTop:5,marginTop:0,marginBottom:0}}>
                                    {profile.name}
                                </Card.Title>
                                <View style={{paddingTop:10, flexDirection:"row" , justifyContent: 'center', alignItems:'center'}}>
                                    <Text>Quantité: {profile.quantity}</Text>
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
                                            title=" Ajouter une quantité" 
                                            onPress={()=> {
                                                props.addToBasket({name:profile.name,img:profile.img})
                                            }
                                            }
                                        />
                                        <Button
                                            icon={<Ionicons name="remove-circle-sharp" size={25} color="rgba(250,0,0,0.4)" />}
                                            type="outline"
                                            buttonStyle={{borderRadius: 100, borderColor:"rgba(250,0,0,0.4)", marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                            title=" Supprimer une quantité"
                                            titleStyle={{color:"rgba(250,0,0,0.6)"}} 
                                            onPress={()=> {
                                                props.deleteOne({name:profile.name,img:profile.img})
                                            }}
                                        />
                                    </View>                     
                                </View>   
                                                  
                            </Card>
                        ))}
        
                    <Button
                        icon={<Ionicons name="card-outline" size={30} color="rgba(255,255,255,1)" />}
                        type="outline"
                        buttonStyle={{width:350, backgroundColor:"rgba(138, 167, 139,0.75)", borderRadius: 10, borderWidth:5 ,borderColor:"#8AA78B", marginTop:10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title=' Commander'
                        titleStyle={{color:"rgba(255,255,255,1)", fontSize:27}} 
                        onPress={()=> {
                            var numCommde=  numeroCommande(props.basket.pseudo.users._id)
                            socket.emit("CommandeFromClient", 
                            {
                                panier: props.basket.basket, 
                                numeroCommande:numCommde,
                                nom:props.basket.pseudo.users.nom, 
                                prenom:props.basket.pseudo.users.prenom, 
                                telephone: props.basket.pseudo.users.telephone, 
                                id:props.basket.pseudo.users._id, 
                                ville:props.basket.pseudo.users.adress.ville
                            });
                            props.deleteBasket();
                            props.addToCommandes(numCommde);
                            props.navigation.navigate('Home');
                        }}
                    />
                    </View>
                    </ScrollView>
                </View>  
            );
    } else {
        return(
            <View style={{backgroundColor:"#F0F0F0", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <StatusBar hidden={false} StatusBarStyle="light-content"/>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                        centerComponent={{ text: 'Panier', style: { color: '#fff', fontWeight:"bold" } }}
                        rightComponent={{ icon: 'home', color: '#fff' }}
                    />     
                <Text style={{marginTop:10,marginBottom: 10, backgroundColor:"lightcyan", width:"90%",fontWeight:"bold"}}>
                    Votre panier est vide pour le moment.
                </Text>
               
            </View>
        )
    }
};

function mapStateToProps(state) {
    console.log(state)
    return { basket : state }
  }

function mapDispatchToProps(dispatch) {
    return {
      addToBasket: function (medoc) {dispatch({ type: 'addToBasket', objMedoc: medoc})},
      deleteOne : function (medoc) {dispatch({ type: 'deleteOne', objMedoc: medoc})},
      deleteBasket:function () {dispatch({ type: 'deleteAll'})},
      addToCommandes:function (commande) {dispatch({ type: 'addToCommandes',commande:commande})},
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basket);

