import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const weatherOptions = {
    Thunderstorm: {
      iconName: "weather-lightning",
      gradient: ["#373B44", "#4286f4"],
    },
    Drizzle: {
      iconName: "weather-hail",
      gradient: ["#89F7FE", "#66A6FF"],
    },
    Rain: {
      iconName: "weather-rainy",
      gradient: ["#00C6FB", "#005BEA"],
    },
    Snow: {
      iconName: "weather-snowy",
      gradient: ["#7DE2FC", "#B9B6E5"],
    },
    Atmosphere: {
      iconName: "weather-hail",
      gradient: ["#89F7FE", "#66A6FF"]
    },
    Clear: {
      iconName: "weather-sunny",
      gradient: ["#FF7300", "#FEF253"],
    },
    Clouds: {
      iconName: "weather-cloudy",
      gradient: ["#D7D2CC", "#304352"],
    },
    Mist: {
      iconName: "weather-hail",
      gradient: ["#4DA0B0", "#D39D38"],
    },
    Dust: {
      iconName: "weather-hail",
      gradient: ["#4DA0B0", "#D39D38"],
    },
    Haze: {
      iconName: "weather-hail",
      gradient: ["#4DA0B0", "#D39D38"],
    }
  };

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

export default function Weather({condition, main, name, dailyObj}) {

  let today = new Date();
  // condition = "Snow";

  return (
    <LinearGradient 
      colors={weatherOptions[condition].gradient}
      style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.half_container}>
        <View style={styles.view_row}>
          <Entypo name="location-pin" size={30} color="#FFFFFF" />
          <Text style={{...styles.text, ...styles.text_location}}> {name}</Text>
        </View>
        <MaterialCommunityIcons 
          name={weatherOptions[condition].iconName} 
          size={96} 
          color="#FFFFFF" />
        <Text style={{...styles.text, ...styles.text_temp}}>{main.temp.toFixed(1)}&deg;</Text>
        <View style={styles.view_row}>
        <Text style={{...styles.text, ...styles.text_detail}}>Min. {main.temp_min.toFixed(1)}&deg; </Text>
        <Text style={{...styles.text, ...styles.text_detail}}>Max. {main.temp_max.toFixed(1)}&deg; </Text>
        <Text style={{...styles.text, ...styles.text_detail}}>feels like {main.feels_like.toFixed(1)}&deg;</Text>
        </View>
      </View>
      <View style={{...styles.half_container, ...styles.bottom_container}}>
        <FlatList
          style={styles.view_flatlist}
          numColumns={5}
          columnWrapperStyle={styles.view_row}
          data={dailyObj.slice(0,5)}
          keyExtractor={(item, index) => index}
          renderItem={(item) => 
            <View style={{...styles.view_flatlist, ...styles}}>
              {/* <Text style={{color: "red"}}>{console.log("ITEM@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"), console.log(item), item.item.weather[0].main}</Text> */}
              <Text style={{...styles.text, ...styles.text_forcast}}>{DAYS[today.getDay() + (item.index)]}</Text>
              <MaterialCommunityIcons 
                name={weatherOptions[item.item.weather[0].main].iconName} 
                size={26} 
                color="#FFFFFF" />
              <Text style={{...styles.text, ...styles.text_forcast}}>{item.item.temp.day.toFixed(1)}</Text>
              <Text style={{...styles.text, ...styles.text_forcast}}>{item.item.temp.eve.toFixed(1)}</Text>
            </View>
        }
        />
      </View>
    </LinearGradient>
  )
}

Weather.propTypes = {
    main: PropTypes.object.isRequired,
    condition: PropTypes.oneOf([
        "Thunderstorm", 
        "Drizzle", 
        "Rain", 
        "Snow", 
        "Atmosphere", 
        "Clear", 
        "Clouds",
        "Mist",
        "Smoke",
        "Haze",
        "Dust",
        "Fog",
        "Sand",
        "Dust",
        "Ash",
        "Squall",
        "Tornado",
    ]).isRequired,
    name: PropTypes.string.isRequired,
    dailyObj: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    half_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottom_container: {
      justifyContent: "center",
      alignItems: "center"
    },
    view_flatlist: {
      margin: 6
    },
    view_row: {
      flexDirection: "row"
    },
    view_listrow: {
      flex: 1,
      justifyContent: "space-around"
    },
    text: {
      color: "#FFFFFF"
    },
    text_location: {
      fontSize: 24
    },
    text_temp: {
      fontSize: 32
    },
    text_detail: {
      fontSize: 14
    },
    text_forcast: {
      fontSize: 18
    },
    text_title: {
      fontSize: 44,
      marginBottom: 10
    },
    text_subtitle: {
      fontSize: 28,
    }
})