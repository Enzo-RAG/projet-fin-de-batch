import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Header } from 'react-native-elements'
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';







const timeToString = (time) => {

 const date = new Date(time);
  return date.toISOString().split('T')[0];
};




function Schedule(){
  const [info, setInfo] = useState([])

  // console.log(info.articles[0].date)
  // console.log(info.articles[0].description)
  console.log('test2134####################################')
  const [items, setItems] = useState( info.map((number, i) => {number.articles.date 
    // '2017-06-23': [{name: 'item 2 - any js object', height: 80}],
    // '2017-06-24': [],
    // '2017-06-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
  }));

  useEffect(() => {
    const findArticlesWishList = async () => {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
      const dataWishlist = await fetch('https://frozen-scrubland-67920.herokuapp.com/recepRdv')
      console.log("#######################################################")
      const body = await dataWishlist.json()
      setInfo(body)
      console.log('##############################test##################################')
      // props.saveArticles(body.articles)
    }
  
    findArticlesWishList()
  },[])

  const numbers = [info];
//  console.log(numbers)
  // const doubled = numbers.map((number, i) => number.articles[2].Photo);
  // console.log(doubled);
  // console.log('mapre retour') 
  
    
  




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
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
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
        selected={'2017-05-16'}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Schedule;