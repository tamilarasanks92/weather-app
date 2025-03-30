import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';
import {Weather} from '../utils/types';

const initialValue = {
  cityName: '',
  temperature: 0,
  condition: '',
  icon: '',
};

interface WeatherContextInterface {
    weatherData: Weather
    setWeatherData: Dispatch<SetStateAction<Weather>>
  }

const WeatherContext = createContext<WeatherContextInterface>(({
    weatherData: initialValue,
    setWeatherData: () => {}
  }));

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}: WeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<Weather>(initialValue);
  return (
    <WeatherContext.Provider value={{weatherData, setWeatherData}}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherData = () => useContext(WeatherContext);
