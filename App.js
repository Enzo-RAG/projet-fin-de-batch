import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
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

// pages rdv
import PatientRdv from './screens/PatientRdv';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import pseudo from './reducers/pseudo';
import basket from './reducers/basket.reducer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

var users =1
const store = createStore(combineReducers({pseudo,basket}));

const BottomNavigator = () => {
  console.log("Passé par le bottom Nav")
  if (users==1 || users==4){return (                     // Si médecin ou patient
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
  }else if(users ==2){return (                // Si Pharmacien
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

  }else if(users ==3) {                       // si livreur
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
  }else {                                     // Sinon
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
  
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="HomeLog" component={HomLog} />
          <Stack.Screen name="Forgotpass" component={ForgotPass} />
          <Stack.Screen name="PatientRdv" component={PatientRdv} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


/*
          
          
          <Stack.Screen name="PatientHome" component={PatientHome} />
          <Stack.Screen name="PatientPresciption" component={PatientPresciption} />
          <Stack.Screen name="Algo254" component={Searchtest} />
          <Stack.Screen name="agenda" component={agenda} />
          <Stack.Screen name="DocHome" component={Dochome} />
          <Stack.Screen name="DocPrescriprion" component={DocPrescriprion} />
          

*/