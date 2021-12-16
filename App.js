import React, {useState} from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);


import { Ionicons } from '@expo/vector-icons';


// Pages => médicaments :
import Basket from './screens/Basket';
import Medoc from './screens/Medoc';
//import Searchtest from './screens/notUse/algolia';

// pages => connexion/inscription/mdp oublié :
import HomeScreen from './screens/HomeScreens';
import HomLog from './screens/HomeLog';
import ForgotPass from './screens/Forgotpassword';

// Page => home:
import Home from './screens/Home';

// page => prescription :
import Prescriptions from './screens/Prescription';
import MyPrescriptions from './screens/MyPrescription';


// pages rdv
import PatientRdv from './screens/PatientRdv';

import agenda from './screens/agendaScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import pseudo from './reducers/pseudo';
import id from './reducers/id';
import basket from './reducers/basket.reducer';
import commandes from './reducers/commandes.reducer'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

var users =1
const store = createStore(combineReducers({pseudo,basket,id,commandes}));

const BottomNavigator1 = () => {
  console.log("Passé par le bottom Nav")
  return (                     // Si médecin ou patient
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name == 'Home') {
            iconName = 'home-outline';
          }else if (route.name == 'Medoc') {
            iconName = 'bandage-outline';
          }else if (route.name == 'Basket') {
            iconName = 'cart-outline';
          }else if( route.name == 'Ordonnances'){
            iconName ="document-text-outline"
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        })}

      tabBarOptions={{
        activeTintColor: '#8AA78B',
        inactiveTintColor: '#BABABA',
        style: {
          backgroundColor: '#000000',
        }
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Ordonnances" component={Prescriptions} />
      <Tab.Screen name="Medoc" component={Medoc} />
      <Tab.Screen name="Basket" component={Basket} />

    </Tab.Navigator>
  );
  
}

const BottomNavigator2 = () => {
  return (                // Si Pharmacien
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name == 'Home') {
            iconName = 'home-outline';
          }else if (route.name == 'Medoc') {
            iconName = 'bandage-outline';
          }else if (route.name == 'Basket') {
            iconName = 'cart-outline';
          }else if( route.name == 'Commandes'){
            iconName ="document-text-outline"
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        })}

      tabBarOptions={{
        activeTintColor: '#8AA78B',
        inactiveTintColor: '#BABABA',
        style: {
          backgroundColor: '#000000',
        }
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Commandes" component={Prescriptions} />
      <Tab.Screen name="Medoc" component={Medoc} />

    </Tab.Navigator>
  );

  }
  
  const BottomNavigator3 = () => {                       // si livreur
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name == 'Home') {
              iconName = 'home-outline';
            }else if (route.name == 'Course') {
              iconName = 'compass-outline';
            }else if (route.name == 'contact') {
              iconName = 'call-outline';
            }
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          })}
  
        tabBarOptions={{
          activeTintColor: '#8AA78B',
          inactiveTintColor: '#BABABA',
          style: {
            backgroundColor: '#000000',
          }
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Course" component={Home} />
        <Tab.Screen name="contact" component={Home} />
      </Tab.Navigator>
    );
  }
  
  const BottomNavigator4 = () => {                                     // Sinon
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name == 'Home') {
              iconName = 'home-outline';
            }else if (route.name == 'Medoc') {
              iconName = 'bandage-outline';
            }else if (route.name == 'Basket') {
              iconName = 'cart-outline';
            }else if( route.name == 'Ordonnances'){
              iconName ="document-text-outline"
            }
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          })}
  
        tabBarOptions={{
          activeTintColor: '#8AA78B',
          inactiveTintColor: '#BABABA',
          style: {
            backgroundColor: '#000000',
          }
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Ordonnances" component={Prescriptions} />
        <Tab.Screen name="Medoc" component={Medoc} />
        <Tab.Screen name="Basket" component={Basket} />
  
      </Tab.Navigator>
    );
  }
  


export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreens" component={HomeScreen} />
          <Stack.Screen name="BottomNavigator1" component={BottomNavigator1} />
          <Stack.Screen name="BottomNavigator2" component={BottomNavigator2} />
          <Stack.Screen name="BottomNavigator3" component={BottomNavigator3} />
          <Stack.Screen name="BottomNavigator4" component={BottomNavigator4} />
          <Stack.Screen name="HomeLog" component={HomLog} />
          <Stack.Screen name="Forgotpass" component={ForgotPass} />
          <Stack.Screen name="PatientRdv" component={PatientRdv} />
          <Stack.Screen name="agenda" component={agenda} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MyPrescription" component={MyPrescriptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


/*
          
          
          <Stack.Screen name="PatientHome" component={PatientHome} />
          <Stack.Screen name="PatientPresciption" component={PatientPresciption} />
          <Stack.Screen name="Algo254" component={Searchtest} />
          
          <Stack.Screen name="DocHome" component={Dochome} />
          <Stack.Screen name="DocPrescriprion" component={DocPrescriprion} />
          

*/

