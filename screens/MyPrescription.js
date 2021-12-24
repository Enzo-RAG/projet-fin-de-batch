
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import * as Linking from "expo-linking"

import { Button, Input, Header, Image, Card, Text } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications



function MyPrescription(props) {

  const [info, setInfo] = useState([])

  const [doc, setDoc] = useState([])
  const [count, setCount] = useState([])
  const [count2, setCount2] = useState('')
  const [number, setNumber] = useState('')
  const [prise, setPrise] = useState('')
  const [duree, setDuree] = useState('')
  const [autre, setAutre] = useState('')
  const [response, setResponse] = useState([])
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [ant, setAnt] = useState('')
  const [tel, setTel] = useState('')

  useEffect(() => {
    const findRecepMyPrescription = async () => {
      const dataRecepMyPrescription = await fetch('https://helpills1.herokuapp.com/recepMyprescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${props.id}`

      })
      const body = await dataRecepMyPrescription.json()
      setInfo(body.prescription)
      setCount(body.prescription.prescription)
      setCount2(body.prescription.prescription.length)
      addMedicament()
      setDate(body.prescription.date.substr(0, 10))
      setDescription(body.prescription.description)
      console.log("tet", body.prescription.description)
    }
    findRecepMyPrescription()
  }, [response])

  useEffect(() => {

    if (props.pseudo.users.status == 1) {
      const findSearchUser = async () => {
        var rawresponse = await fetch('https://helpills1.herokuapp.com/searchuser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `email=${info.medecinId}`
        })
        var user = await rawresponse.json()
        setDoc(`Docteur.${user.users.nom}`)
        setAnt(user.users.antecedent)


      }
      findSearchUser()
    } else {
      const findSearchUser = async () => {
        var rawresponse = await fetch('https://helpills1.herokuapp.com/searchuser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `email=${info.patientId}`
        })
        var user = await rawresponse.json()

        setDoc(`Patient.${user.users.nom}`)
        setAnt(user.users.antecedent)
        setTel(user.users.telephone)

      }
      findSearchUser()
    }

  }, [count])




  var ordonance = () => {

    if (count2 != 0 && props.pseudo.users.status == 1) {

      return (
        <Card containerStyle={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>

          <Card.Title> Ordonance du  {date}</Card.Title>
          <Card.Divider />

          {count.map((info3, i) => {

            return (
              <View>
                <Text h4> Medicament {i + 1}</Text>
                <Text style={{ marginBottom: 10 }}>
                  Medicament :{info3.autre}

                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Quantité : {info3.number}

                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Prise : {info3.prise}

                </Text>
                <Text style={{ marginBottom: 10 }}>
                  durée: {info3.duree} /jour

                </Text>
                <Button
                  icon={<Ionicons name="cart-outline" size={25} color="#FFF" />}
                  buttonStyle={{ backgroundColor: "#8AA78B", borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                  title=' Add to basket'
                  onPress={() => {
                    console.log("********************* add to basket")
                    props.addToBasket({ name: info3.autre, img: 'https://picsum.photos/200' })
                  }
                  }
                />
              </View>
            )
          })}

        </Card>)
    } else if (count2 != 0) {
      return (
        <Card containerStyle={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>

          <Card.Title> Ordonance du  {date}</Card.Title>
          <Card.Divider />

          {count.map((info3, i) => {

            return (
              <View>
                <Text h4> Medicament {i + 1}</Text>
                <Text style={{ marginBottom: 10 }}>
                  Medicament :{info3.autre}

                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Quantité : {info3.number}

                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Prise : {info3.prise}

                </Text>
                <Text style={{ marginBottom: 10 }}>
                  durée: {info3.duree} /jour

                </Text>
              </View>
            )
          })}

        </Card>)
    } else {

      return (
        <Card containerStyle={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>

          <Card.Title> Aucun Ordonnance </Card.Title>
        </Card>)

    }
  }






  var addMedicament = () => {
    if (props.pseudo.users.status == 4) {

      return (
        <View style={styles.container}>
          <View style={styles2.container}>
            <Input
              containerStyle={{ marginBottom: 5, width: '70%' }}
              inputStyle={{ marginLeft: 10 }}
              placeholder='Nombre de Boite'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color="#F0F0F0"
                />
              }
              onChangeText={(val) => setNumber(val)}
            />
            <Input
              containerStyle={{ marginBottom: 5, width: '70%' }}
              inputStyle={{ marginLeft: 10 }}
              placeholder='Prise'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color="#F0F0F0"
                />
              }
              onChangeText={(val) => setPrise(val)}
            />
            <Input
              containerStyle={{ marginBottom: 5, width: '70%' }}
              inputStyle={{ marginLeft: 10 }}
              placeholder='Duree / jour'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color="#F0F0F0"
                />
              }
              onChangeText={(val) => setDuree(val)}
            />
            <Input
              containerStyle={{ marginBottom: 5, width: '70%', }}
              inputStyle={{ marginLeft: 10 }}
              placeholder='Nom du Medicament'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color="#F0F0F0"
                />
              }
              onChangeText={(val) => setAutre(val)}
            />
            <Button
              containerStyle={{ width: '70%' }}
              title="Ajouter Le Medicament"
              type="solid"
              buttonStyle={{ backgroundColor: "#8AA78B" }}
              onPress={() => { addprescription() }}
            />
          </View>
        </View>)
    }
  }


  var addprescription = async () => {
    const dataAddPrescription = await fetch('https://helpills1.herokuapp.com/addprescription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `id=${props.id}&number=${number}&prise=${prise}&duree=${duree}&autre=${autre}`

    })
    const body = await dataAddPrescription.json()
    setResponse(body)

  }

  var numTelephone = function () {
    Linking.openURL(`tel:${tel}`)
  }

  var appelPatient = () => {
    if (props.pseudo.users.status == 4) {
      return (
        <View style={styles2.container}>
          <Text h4> Antécédent :</Text>
          <Text h4>{ant}</Text>
          <Button
            containerStyle={{ marginBottom: 25, width: '70%' }}
            title="Appel RDV"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B", color: "redr" }}
            onPress={() => { numTelephone() }}
          />


        </View>

      )
    }
  }
  const logo = "https://res.cloudinary.com/dz0ooeuqq/image/upload/v1639665258/rectangle_gris_q6cwqy.png"

  return (
    <View style={styles.container}
    >
      {/* EMAIL */}

      <Header
        placement="left"
        backgroundColor="#727679"
      // centerComponent={{ text: 'Helpills', style: { color: '#F0F0F0' } }}
      >
        <Image
          containerStyle={{ marginBottom: 10, marginTop: 10, }}
          source={{ uri: logo }}
          style={{ width: 200, height: 50 }}

        />
      </Header>
      <ScrollView style={styles3.container}>

        <View style={styles.container}>
          <Image
            containerStyle={{ marginBottom: 10, marginTop: 10 }}
            source={{ uri: 'https://picsum.photos/200' }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text h2 style={{ color: "#727679" }}> {props.pseudo.users.nom}</Text>
        </View>
        <View style={styles.container} backgroundColor="#727679">
          <Text h3 style={{ color: "#F0F0F0", alignItems: 'center', justifyContent: 'center' }}> RDV du {date}  </Text>
          <Text h3 style={{ color: "#F0F0F0", alignItems: 'center', justifyContent: 'center' }}>  {doc}  </Text>
          <View style={styles.container}>
            <Text h4 > Description Des Symptomes :</Text>
            <Text h4> {description}</Text>
          </View>
          {appelPatient()}

          {addMedicament()}
          {ordonance()}
          <Text></Text>
          <Button
            containerStyle={{ marginBottom: 25, width: '100%', alignItems: 'center', justifyContent: 'center', }}
            title="Go home page"
            type="solid"
            buttonStyle={{ backgroundColor: "#8AA78B", color: "redr" }}
            onPress={() => props.navigation.navigate(`BottomNavigator${props.pseudo.users.status}`, { screen: 'Home' })}
          />
          <Text></Text>
          <Text></Text>



        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  },
});

const styles2 = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0'
  },
});
const styles3 = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#727679'
  },
});


function mapStateToProps(state) {
  return { pseudo: state.pseudo, id: state.id }
}
function mapDispatchToProps(dispatch) {
  return {
    addToBasket: function (medoc) {
      dispatch({ type: 'addToBasket', objMedoc: medoc })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPrescription);

