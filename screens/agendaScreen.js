import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Header} from 'react-native-elements'
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';

import {connect} from 'react-redux';



function AgendaScreen(props){

  
  const [info, setInfo] = useState([])
  const [email, setEmail] = useState('')  
  const [items, setItems] = useState( { 
    
  });

  const miseEnFormeDate = ((event, i) => {
    
    var newdate = event._doc.date.substr(0, 10)
                                                             
    var test = items.hasOwnProperty(newdate)
    if(test){
      var aCopy = items
      aCopy[newdate].push({name: event.name  +" / symptomes "+event._doc.description  ,id:event._doc._id})
      setItems(aCopy)
      
    }else{
      Object.assign(items,{[newdate] : [{name:event.name +" / symptomes "+ event._doc.description  , id:event._doc._id}]})
    }
    
  
  })

    

  useEffect(() => {
    setEmail(props.pseudo.users.email)
      

    const findRecepRdv = async () => {
      const dataRecepRdv = await fetch('https://arcane-sierra-33789.herokuapp.com/recepRdv', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `email=${email}&status=${props.pseudo.users.status}`
        
      })
      
      const body = await dataRecepRdv.json()   
      setInfo(body)
            var tab = body.tab.map((event, i) => (miseEnFormeDate(event, i)))
    }
  
    findRecepRdv()
  },[email])

 
var renderItem = (item) => {if(props.pseudo.users.status == 1 ){
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}} onPress={async () => {await props.onSubmitId(item.id),props.navigation.navigate('MyPrescription')}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>RDV avec Doc.{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }else{
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}} onPress={async () => {await props.onSubmitId(item.id),props.navigation.navigate('MyPrescription')}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>RDV avec Patient {item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }}

  

  return (
    <View style={{flex: 1}}>
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
      <Agenda
        items={items}
        selected={new Date()}
        renderItem={renderItem}
      />
    </View>
  );
};



function mapStateToProps(state) {
  return { pseudo : state.pseudo }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitId: function (id) {
      dispatch({ type: 'saveId', id : id })
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AgendaScreen);