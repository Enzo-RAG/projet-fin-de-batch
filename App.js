import React from 'react';



import HomeScreen from './screens/HomeScreens';
import HomLog from './screens/HomeLog';
import PatientHome from './screens/PatientHome';
import PatientPresciption from './screens/PatientPrescription';
import ForgotPass from './screens/Forgotpassword';
import Searchtest from './screens/algolia';
import agenda from './screens/agendaScreen';
import Dochome from './screens/docHome';
import DocPrescriprion from './screens/DocPrescription';
import PatientRdv from './screens/PatientRdv';



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import pseudo from './reducers/pseudo';

const store = createStore(combineReducers({pseudo}));

const Stack = createStackNavigator();




export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="HomeLog" component={HomLog} />
          <Stack.Screen name="Forgotpass" component={ForgotPass} />
          <Stack.Screen name="PatientHome" component={PatientHome} />
          <Stack.Screen name="PatientPresciption" component={PatientPresciption} />
          <Stack.Screen name="Algo254" component={Searchtest} />
          <Stack.Screen name="agenda" component={agenda} />
          <Stack.Screen name="DocHome" component={Dochome} />
          <Stack.Screen name="DocPrescriprion" component={DocPrescriprion} />
          <Stack.Screen name="PatientRdv" component={PatientRdv} />
          

  
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
