import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function MapScreen() {

  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [addPOI, setAddPOI] = useState(false);
  const [listPOI, setListPOI] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [titrePOI, setTitrePOI] = useState();
  const [descPOI, setDescPOI] = useState();
  const [tempPOI, setTempPOI] = useState();

  useEffect(() => {
    async function askPermissions() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 0.10 },
          (location) => {
            setCurrentLatitude(location.coords.latitude)
            setCurrentLongitude(location.coords.longitude);
          }
        );
      }
    }
    askPermissions();

    AsyncStorage.getItem('POI', (err, value) => {
      if (value) {
        var POI = JSON.parse(value);
        setListPOI(POI);
      }
    });
  }, []);

  var selectPOI = (e) => {
    if (addPOI) {
      setAddPOI(false);
      setIsVisible(true);
      setTempPOI({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude });
    }
  }

  var handleSubmit = () => {
    setListPOI([...listPOI, { longitude: tempPOI.longitude, latitude: tempPOI.latitude, titre: titrePOI, description: descPOI }]);
    AsyncStorage.setItem("POI", JSON.stringify([...listPOI, { longitude: tempPOI.longitude, latitude: tempPOI.latitude, titre: titrePOI, description: descPOI }]))
    setIsVisible(false);
    setTempPOI();
    setDescPOI();
    setTitrePOI();
  }

  // var markerPOI = listPOI.map((POI, i) => {
  //   return <Marker key={i} pinColor="blue" coordinate={{ latitude: POI.latitude, longitude: POI.longitude }}
  //     title={POI.titre}
  //     description={POI.description}
  //   />
  // });
  // var isDisabled = false;
  // if (addPOI) {
  //   isDisabled = true;
  // }






  return (
    <View style={{ flex: 1 }} >
      
      <MapView
        onPress={(e) => { selectPOI(e) }}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 43.295100,
          longitude: 5.379820,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker key={"currentPos"}
          pinColor="red"
          title="Bonjour"
          description="Je suis la"
          coordinate= {{ latitude: currentLatitude, longitude: currentLongitude }}
        />
        {markerPOI}


        <Marker
            pinColor="black"
            title="Client"
            description=" Sonnez quand vous êtes en bas !"
            coordinate={{latitude: 43.116669, longitude: 5.93333}}
          />

          <Marker
            pinColor="green"
            title="Pharmacie Idéale"
            description="La Commande est prête !"
            coordinate={{latitude: 43.604652, longitude: 1.444209}}
          />

      </MapView>
      {/* <Button
        disabled={isDisabled}
        title="Add POI"
        icon={
          <Icon
            name="map-marker"
            size={20}
            color="#ffffff"
          />
        }
        buttonStyle={{ backgroundColor: "#eb4d4b" }}
        type="solid"
        onPress={() => setAddPOI(true)} /> */}
    </View>
  );
}