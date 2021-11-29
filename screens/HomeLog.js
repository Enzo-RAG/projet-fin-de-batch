import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground, Text, View  } from 'react-native';

import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import  {Dropdown}  from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
// Dropdown
const data = [
  { label: 'patient', value: '1' },
  { label: 'livreur', value: '2' },
  { label: 'pharmacien', value: '3' },
  { label: 'docteur', value: '4' },
  // { label: 'Item 5', value: '5' },

];

export default function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    // Dropdown
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    console.log(value)
    // Dropdown
    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles2.label, isFocus && { color: 'green' }]}>
            Vous etes ?
          </Text>
        );
      }
      return null;
    };
  


    

    var infoplus = () =>  {      
      if(value == 1){
        console.log(value)
        return(
        <Input
        containerStyle = {{marginBottom: 25, width: '70%'}}
        inputStyle={{marginLeft: 10}}
        placeholder='antecedant medico'
        leftIcon={
            <Icon
            name='user'
            size={24}
            color="#eb4d4b"
            />
        }
        onChangeText={(val) => setPseudo(val)}
    />
        )}else if(value == 2){
      return(
          <Input
          containerStyle = {{marginBottom: 25, width: '70%'}}
          inputStyle={{marginLeft: 10}}
          placeholder='num de plac imatriculation'
          leftIcon={
              <Icon
              name='user'
              size={24}
              color="#eb4d4b"
              />
          }
          onChangeText={(val) => setPseudo(val)}
      />
          )
      }else if(value == 3){
        return(
            <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='num de pharmacien'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#eb4d4b"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />
            )
        }else if(value == 4){
          return(
              <Input
              containerStyle = {{marginBottom: 25, width: '70%'}}
              inputStyle={{marginLeft: 10}}
              placeholder='num de docteur'
              leftIcon={
                  <Icon
                  name='user'
                  size={24}
                  color="#eb4d4b"
                  />
              }
              onChangeText={(val) => setPseudo(val)}
          />
              )
          }
          return null

        }

  
    
    return (

    <View>
      <Text style={styles1.container}>Helppills</Text>


    <ImageBackground  style={styles2.container}>
        
          
    
        
        
        
        {/* NOM */}
        <Input
            containerStyle = {{marginBottom: 50, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Nom'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#eb4d4b"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />
              {/* prenom */}
            <Input
            containerStyle = {{marginBottom: 50, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='prenom'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#eb4d4b"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />    
         {/* Email */}
         <Input
            containerStyle = {{marginBottom: 50, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Email'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color="#eb4d4b"
                />
            }
            onChangeText={(val) => setPseudo(val)}
        />   
        {/* Dropdown */}
        <View style={styles2.container}>
        {renderLabel()}
        <Dropdown
          style={[styles2.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles2.placeholderStyle}
          selectedTextStyle={styles2.selectedTextStyle}
          inputSearchStyle={styles2.inputSearchStyle}
          iconStyle={styles2.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'vous etes ?' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles2.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />



      </View>
        {infoplus()}
        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="Inscription"
            type="solid"
            onPress={() => {props.navigation.navigate('Home')}}
        />

    </ImageBackground>


    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    
    marginTop: 20,
    color: 'red',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});

const styles2 = StyleSheet.create({
  container: {
    
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});


