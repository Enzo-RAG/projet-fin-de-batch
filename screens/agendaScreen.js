import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Header, Button } from 'react-native-elements'
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';

const timeToString = (time) => {

 const date = new Date(time);
  return date.toISOString().split('T')[0];
};


function Schedule(props){

  const [info, setInfo] = useState([])  
  const [items, setItems] = useState( { 
    '2021-06-23': [{name: 'item 2 - any js object', height: 80}],
    '2021-06-24': [],
    '2021-06-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
  });

      // console.log('#############################infor#########################',info.tab[0])

  


  const miseEnFormeDate = ((event, i) => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", event)
    var newdate = event._doc.date.substr(0, 10)
    console.log('console.log I', i)
            
                                                              
    var test = items.hasOwnProperty(newdate)
    if(test){
      var aCopy = items
      aCopy[newdate].push({name: event._doc.description +" "+ event.name+" "+ i, height: 80})
      setItems(aCopy)
      
    }else{
      Object.assign(items,{[newdate] : [{name:event._doc.description +" "+ event.name+" " + i, height: 80}]})
    }
    
  
  })


  useEffect(() => {
    const findArticlesWishList = async () => {
      const dataWishlist = await fetch('https://arcane-sierra-33789.herokuapp.com/recepRdv')
      const body = await dataWishlist.json()
      console.log('testtttttttttttttttttttttttttttttttttttttt', body.tab, body.tab)
      // console.log(body)
      setInfo(body)
      var tab = body.tab.map((event, i) => (miseEnFormeDate(event, i)))
    }
  
    findArticlesWishList()
  },[])


  const numbers = [info];
//  ////console.log(numbers)
  // const doubled = numbers.map((number, i) => number.articles[2].Photo);
  // ////console.log(doubled);
  // ////console.log('mapre retour') 
  
    
  




  // const loadItems = (day) => {
  //   setTimeout(() => {
  //     for (let i = 0; i < 1; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);
  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: 'Item for ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 1)),
  //           });
  //         }
  //       }
  //     }
  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1);
  // };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}} onPress={() => {props.navigation.navigate('Forgotpass')}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              
              <Avatar.Text label="J" />
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
        selected={'2021-05-16'}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Schedule;