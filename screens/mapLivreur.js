import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { socket } from 'socket.io-client';

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

// useEffect(() =>{
//   socket.emit("sendPosition", { latitude: currentLatitude, longitude: currentLongitude } );
// })

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

  var muPinLocation = () =>{
    if (props.status == 2){
      <Marker
            pinColor="black"
            title="livreur"
            description="I'am comming !"
            icon={<i class="fas fa-biking"></i>}
            coordinate={{latitude: 43.116669, longitude: 5.93333}}
          />
    }else if(props.status == 3){
      <Marker
            pinColor="green"
            title="pharmasisilafamille"
            description="j'ai un max d'opioide !"
            icon={<i class="fas fa-biking"></i>}
            coordinate={{latitude: 43.116669, longitude: 5.93333}}
          />
    }else if(props.status == 4){
      <Marker
            pinColor="white"
            title="what's up doc ?"
            description="j'ai une ordonnance pour ton rhume !"
            icon={<i class="fas fa-biking"></i>}
            coordinate={{latitude: 43.116669, longitude: 5.93333}}
          />
    }
  }

  var markerPOI = listPOI.map((POI, i) => {
    return <Marker key={i} pinColor="blue" coordinate={{ latitude: POI.latitude, longitude: POI.longitude }}
      title={POI.titre}
      description={POI.description}
    />
  });
  var isDisabled = false;
  if (addPOI) {
    isDisabled = true;
  }






  return (
    <View style={{ flex: 1 }} >
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => { setIsVisible(false) }}
      >
        <View>
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder='titre'
            onChangeText={(val) => setTitrePOI(val)}

          />

          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder='description'
            onChangeText={(val) => setDescPOI(val)}

          />

          <Button
            title="Ajouter POI"
            buttonStyle={{ backgroundColor: "#eb4d4b" }}
            onPress={() => handleSubmit()}
            type="solid"
          />
        </View>
      </Overlay>

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
          title="Hello"
          description="I'am here"
          coordinate= {{ latitude: currentLatitude, longitude: currentLongitude }}
        />
        {markerPOI}


        <Marker
            pinColor="black"
            title="Hello"
            description="I'am comming !"
            icon={<i class="fas fa-biking"></i>}
            coordinate={{latitude: 43.116669, longitude: 5.93333}}
          />

          <Marker
            pinColor="green"
            title="dr Henry Thierry"
            description="I'am here to heal you !"
            icon={<i class="fas fa-biking"></i>}
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