import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import axios from 'axios';
import { API_KEY } from "@env"


export default class App extends React.Component {

  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      
      // Send to API and get weather
      this.getWeather(latitude, longitude);
      // this.getForcast(latitude, longitude);

    } catch (error) {
      Alert.alert("Error", "Can't find the location");
    }
  }

  getWeather = async (latitude, longitude) => {
    const { 
      data: { 
        main,
        weather,
        name
      } 
    } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

    const {
      data: {
        daily
      }
    } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${API_KEY}&units=metric`);

    this.setState({
      condition: weather[0].main,
      main,
      name,
      dailyObj: daily,
      isLoading: false
    });
  }

  // getForcast = async (latitude, longitude) => {
  //   const {
  //     data: {
  //       daily
  //     }
  //   } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${API_KEY}&units=metric`);
  //   console.log("getForcast()@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  //   console.log(daily)
  //   this.setState({
  //     dailyObj: daily,
  //     isLoading: false
  //   });
  // }

  render() {
    const { isLoading, condition, main, name, dailyObj } = this.state;
    return isLoading ? <Loading /> : <Weather condition={condition} main={main} name={name} dailyObj={dailyObj}/>
  }
}
