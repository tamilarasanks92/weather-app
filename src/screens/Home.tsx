import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {fetchData} from '../services/ApiService';
import {Card, Text, Avatar} from 'react-native-paper';
import {getData, setData} from '../storage/asyncStorage';
import {Weather} from '../utils/types';
import {useWeatherData} from '../context/WeatherContext';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');
  const {weatherData, setWeatherData} = useWeatherData();

  useEffect(() => {
    console.log('Access key: ', Config.REACT_APP_ACCESS_KEY);
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    const response = (await getData('city')) ?? '';
    setCity(response);
    // fetchWeatherData(response);
  };

  const fetchWeatherData = async (city: string) => {
    if (city !== '') {
      setLoading(true);
      try {
        const response = await fetchData(city);
        const weather: Weather = {
          cityName: response?.location?.name,
          condition: response?.current?.weather_descriptions[0],
          temperature: response?.current?.temperature,
          icon: response?.current?.weather_icons[0],
        };
        setWeatherData(weather);
        await setData('city', city);
      } catch (error) {
        Alert.alert('Error', 'City not found. Please enter valid city');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (city: string) => {
    if (city === '') {
      Alert.alert('Invalid City', 'Enter a city');
      return;
    }
    await fetchWeatherData(city);
  };

  const LeftContent = () => (
    <Avatar.Image size={24} source={{uri: weatherData.icon}} />
  );

  return (
    <LinearGradient colors={['#00BFFF', '#1E90FF']} style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          justifyContent: 'space-between',
          width: '80%',
        }}>
        <InputField
          testID="search-city"
          style={styles.inputField}
          placeholder="Enter city"
          value={city}
          onChangeText={value => setCity(value)}
        />
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          {loading ? (
            <ActivityIndicator animating={loading} size="small" />
          ) : (
            <Button
              testID="submit"
              name={'Fetch'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={() => handleSubmit(city)}
            />
          )}
        </View>
      </View>
      {weatherData.cityName !== '' && (
        <Card testID='weather' style={{width: '80%', marginTop: 10}}>
          <Card.Title title={weatherData.cityName} left={LeftContent} />
          <Card.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text variant="bodyMedium">{weatherData.condition}</Text>
            <Text variant="titleLarge">{weatherData.temperature}</Text>
          </Card.Content>
        </Card>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  inputField: {
    flex: 0.7,
    borderColor: 'black',
    borderWidth: 1,
    width: '50%',
    borderRadius: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Home;
