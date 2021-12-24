import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import React, {useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import { Button, Card, Text, Rating,Header,Badge,Image,Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { Input } from 'react-native-elements/dist/input/Input';

const Medoc = (props) => {

    const allaitement ="https://res.cloudinary.com/dz0ooeuqq/image/upload/v1638831902/allaitement_pmhleh.jpg"
    const enceinte ="https://res.cloudinary.com/dz0ooeuqq/image/upload/v1638831901/posters-femme-enceinte-symbole-vecteur-stylise.jpg_ogehcp.jpg"
    const allergies = "https://res.cloudinary.com/dz0ooeuqq/image/upload/v1638831902/allergies_xsfk2a.jpg"
    const [medocTab, setMedocTab] = useState([])
    const [input1,setInput1]=useState("")

 
      const findMedoc = async(name) => {
        var rawResponse = await fetch('https://helpills1.herokuapp.com/medocs/getDrugsByActive', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `name=${name}`
          });
          console.log("***************************************************************************")
          
        const response = await rawResponse.json() 
        setMedocTab(response.saveNewDrug)
        
      }

   if (medocTab.length<1){
    return(
        <View style={{backgroundColor:"#F0F0F0"}}>
            <StatusBar hidden={false} StatusBarStyle="light-content"/>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: "Médicaments", style: { color: '#fff', fontWeight:"bold" } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <ScrollView style={{ marginBottom: 85 }}>
            </ScrollView>
            <View style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Text style={{marginTop:30,marginBottom: 30, fontSize:18}}>
                    Rechercher des médicaments par molécule. 
                </Text>
                <Input
                    containerStyle = {{marginBottom: 20, width: '90%'}}
                    inputStyle={{marginLeft: 3}}
                    placeholder="Nom de molécule, ex : paracétamol"
                    onChangeText={(val) => {setInput1(val)}}
                    value={input1}
                >
                </Input>
                
                <Button
                    icon={<Ionicons name="hourglass-outline" size={30} color="rgba(255,255,255,1)" />}
                    type="outline"
                    buttonStyle={{width:350, backgroundColor:"rgba(138, 167, 139,0.75)", borderRadius: 10, borderWidth:5 ,borderColor:"#8AA78B", marginTop:10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title=' Rechercher'
                    titleStyle={{color:"rgba(255,255,255,1)", fontSize:27}} 
                    onPress={()=> {
                        findMedoc(input1)
                    }}
                />
            </View>
            
        </View> 
    )

   }else if(medocTab.length>1){

    return (
        <View style={{backgroundColor:"#F0F0F0"}}>
            <StatusBar hidden={false} StatusBarStyle="light-content"/>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Drugs', style: { color: '#fff', fontWeight:"bold" } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <ScrollView style={{ marginBottom: 85 }}>
            {medocTab.map((profile,i)=> { 
                var text = ""; 
                var color ="blue"; 
                var textColor ="white";
                var recommended1 ="checkmark-circle"; 
                var recommended2 ="checkmark-circle";
                var recommended3 ="checkmark-circle";
                var recommended1Color = "green";
                var recommended2Color = "green";
                var recommended3Color = "green";

                if (profile.prescription == 0){
                    text="sans prescription"
                    console.log(text)
                    color ="blue"
                }else if(profile.prescription == 1){
                    text="liste 1"
                    console.log(text)
                    color ="green"
                }else if(profile.prescription == 2){
                    text="liste 2"
                    console.log(text)
                    color ="orange"
                }else {
                    text="stupéfiants"
                    console.log(text)
                    color ="red"
                    textColor ="black"
                };

                
                    if(!profile.notRecommended.includes("enceinte")){
                        recommended1='close-circle'
                        recommended1Color ="red"
                    }

                    if(!profile.notRecommended.includes("allaitantes")){
                        recommended2='close-circle'
                        recommended2Color ="red"
                    }
 
                    if(!profile.notRecommended.includes("allergies")){
                        recommended3='close-circle'
                        recommended3Color ="red"
                    }               
                
                ;return( 
                    <View>   
                    <Card key={i} >
                        <Card.Title 
                            style={{fontWeight: 'bold',fontSize: 16, backgroundColor:"#F0F0F0",paddingBottom:5 ,paddingTop:5,marginTop:0,marginBottom:0,borderColor:"black",borderRadius:10, borderStyle:"solid",borderWidth: 1}}>
                            {profile.drugName}
                        </Card.Title>
                        <View style={{paddingTop:10,paddingBottom:10,flexDirection:"row" , justifyContent: 'center', alignItems:'center'}}>                        
                            <Rating
                                style={{marginTop:0, marginBottom:0}}
                                fractions="{2}" 
                                startingValue={profile.rating.stars}
                                readonly
                                type='star'
                                ratingCount={5}
                                imageSize={20}
                                jumpValue={0.5}
                            /> 
                            <Text style={{marginLeft:5, marginBottom:0}}>({profile.rating.nbreVote})</Text>
                        </View>

                        <View style={{flexDirection:"row" , justifyContent: 'space-evenly', alignItems:'flex-start'}}> 
                            {
                                profile.drugsDetail.map((profile,i)=>(
                                    <View style={{flexDirection:"column" , justifyContent: 'center', alignItems:'flex-start'}}>
                                        <Badge key={i} status='warning' value={profile.form} badgeStyle={{backgroundColor: "red"}} textStyle={{color:"black", lineHeight:15}}/>
                                        {profile.madeWith.map((profile,i)=>(
                                            <View key={i} style={{flexDirection:"row" , justifyContent: 'center', alignItems:'center'}}>
                                                <Badge status='warning' value={profile.name} badgeStyle={{backgroundColor: "green"}} textStyle={{color:"white", lineHeight:15}}/>
                                                <View style={{flexDirection:"row" , justifyContent: 'center', alignItems:'center'}}>
                                                    <Badge status='warning' value={`${profile.dosage} ${profile.unit}`} badgeStyle={{backgroundColor: "yellow"}} textStyle={{color:"black", lineHeight:15}}/>
                                                </View>
                                            </View> 
                                            ))}
                                    </View>)     
                                )}
                        </View>
                        <View style={{flexDirection:"row" , justifyContent: 'space-evenly', alignItems:'center', width:"100%",height:230}}>
                            <View style={{width:270,height:220,flexDirection:"row",justifyContent:'center', alignItems:'center',borderColor:"black",borderRadius:10, borderStyle:"solid",borderWidth: 1}}>
                                <Card.Image source={{uri:profile.urlToImg}} style={{width:210,height:210}} resizeMode="contain">
                                </Card.Image>
                            </View>
                            <View style={{flexDirection:"column", alignItems:'center',justifyContent:"space-around", height:220}}> 
                                <View style={{width:70,height:70}}> 
                                    <Image source={{ uri: enceinte}} style={{borderColor:"black",borderRadius:10, borderStyle:"solid",borderWidth: 1,width:"100%",height:"100%"}}>
                                        <Icon name={recommended1} type='ionicon' color={recommended1Color} />
                                    </Image>
                                </View>
                                <View style={{width:70,height:70}}> 
                                    <Image source={{ uri: allaitement}} style={{borderColor:"black",borderRadius:10, borderStyle:"solid",borderWidth: 1,width:"100%",height:"100%"}}>
                                    <Icon name={recommended2} type='ionicon' color={recommended2Color} />
                                    </Image>
                                </View>
                                <View style={{width:70,height:70}}> 
                                    <Image source={{ uri: allergies}} style={{borderColor:"black",borderRadius:10, borderStyle:"solid",borderWidth: 1,width:"100%",height:"100%"}}>
                                    <Icon name={recommended3} type='ionicon' color={recommended3Color} />    
                                    </Image>
                                </View>
                            </View>
                        </View>
                        <View>
                                <Badge status='warning' value={text} badgeStyle={{backgroundColor: color}} textStyle={{color:textColor, lineHeight:15}}/>
                        </View>
                        <Text style={{marginTop:10,marginBottom: 10}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel varius felis. Nam sed lectus ut nulla molestie eleifend. Duis quis massa enim. Fusce quis ultrices justo. Suspendisse nec nunc ipsum. Suspendisse sodales tellus quis orci ornare consectetur. 
                        </Text>
                        <Button
                            icon={<Ionicons name="cart-outline" size={25} color="#FFF" />}
                            buttonStyle={{backgroundColor:"#8AA78B", borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title=' Ajouter au panier' 
                            onPress={()=> {
                                console.log("********************* add to basket")
                                props.addToBasket({name:profile.drugName,img:profile.urlToImg})
                               }
                              }
                        />              
                    </Card>
                    
                </View>    
                )})}  
                <View style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{marginTop:10,marginBottom: 10, fontSize:18}}>
                        Nouvelle recherche 
                    </Text>    
                    <Button
                        icon={<Ionicons name="arrow-undo-outline" size={30} color="rgba(255,255,255,1)" />}
                        type="outline"
                        buttonStyle={{width:350, backgroundColor:"rgba(138, 167, 139,0.75)", borderRadius: 10, borderWidth:5 ,borderColor:"#8AA78B", marginTop:10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title=' Reset'
                        titleStyle={{color:"rgba(255,255,255,1)", fontSize:27}} 
                        onPress={()=> {
                            setMedocTab([])
                            setInput1("")
                        }}
                    />
            </View>
            </ScrollView>
        </View> 
    );}
};


function mapDispatchToProps(dispatch) {
    return {
      addToBasket: function (medoc) {
        dispatch({ type: 'addToBasket', objMedoc: medoc})
      }
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(Medoc);

