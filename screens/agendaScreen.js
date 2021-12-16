import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Header, Button } from 'react-native-elements'
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';

import {connect} from 'react-redux';

const timeToString = (time) => {

 const date = new Date(time);
  return date.toISOString().split('T')[0];
};


function Schedule(props){

  const [id, setID] = useState('')
  const [info, setInfo] = useState([])
  const [email, setEmail] = useState('')  
  const [items, setItems] = useState( { 
    
  });

      



    


  const miseEnFormeDate = ((event, i) => {
    
    var newdate = event._doc.date.substr(0, 10)
    
            
                                                              
    var test = items.hasOwnProperty(newdate)
    if(test){
      var aCopy = items
      aCopy[newdate].push({name: event._doc.description +" / "+ event.name ,id:event._doc._id})
      setItems(aCopy)
      
    }else{
      Object.assign(items,{[newdate] : [{name:event._doc.description +" / "+ event.name , id:event._doc._id}]})
    }
    
  
  })

    

  useEffect(() => {
    setEmail(props.pseudo.users.email)
    console.log('test pour docteir ' , email)
    

    const findArticlesWishList = async () => {
      const dataWishlist = await fetch('https://arcane-sierra-33789.herokuapp.com/recepRdv', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `email=${email}&status=${props.pseudo.users.status}`
        
      })
      
      const body = await dataWishlist.json()
      
      // console.log(body)
      setInfo(body)
            var tab = body.tab.map((event, i) => (miseEnFormeDate(event, i)))
    }
  
    findArticlesWishList()
  },[email])


  // var handleClickinfo = async (item) =>{
  //   console.log("test de retour de l'info ", item)
  //   setID(item)
  //   props.onSubmitId(id)
  //    }
    

  const renderItem = (item) => {
    
    console.log("console de  id",item)       
      
    
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
              <Text>{item.name}</Text>
              
              
              
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  

  return (
    <View style={{flex: 1}}>
        <Header
            placement="left"
            backgroundColor="#727679"
            
            centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
            
        />
      <Agenda
        items={items}
        // loadItemsForMonth={loadItems}
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
)(Schedule);