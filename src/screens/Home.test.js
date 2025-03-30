import {
  fireEvent,
  render,
  waitFor,
  getByTestId,
  screen,
} from '@testing-library/react-native';
import Home from './Home';
import axios from 'axios';
import {fetchData} from '../services/ApiService';

jest.mock('axios');
jest.mock('react-native-paper');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockValue = {
  location: {
    name: 'Chennai',
  },
  current: {
    weather_descriptions: [''],
    weather_icons: [''],
    temperature: 0,
  },
};

const setup = (textField, button) => {};

describe('Fetch Weather Data', () => {
  it('should render the component', () => {
    const {toJSON} = render(<Home />);
    expect(toJSON).toMatchSnapshot();
  });
  it('should fetch weather data based on city', async () => {
    axios.get.mockResolvedValueOnce({
      data: mockValue,
    });
    const {getByTestId} = render(<Home />);
    const searchTextField = getByTestId('search-city');
    fireEvent.changeText(searchTextField, 'Chennai');
    const submitButton = getByTestId('submit');
    fireEvent.press(submitButton);
    expect(axios.get).toHaveBeenCalledWith(
      `http://api.weatherstack.com/current?access_key=3ae5aebbda2745850779deb2062d8627&query=Chennai`,
    );
  });
  it('should not render the weather data due to wrong city name', () => {
    axios.get.mockResolvedValueOnce({
        data: mockValue,
      });
      const {getByTestId} = render(<Home />);
      const searchTextField = getByTestId('search-city');
      fireEvent.changeText(searchTextField, 'Chennai');
      const submitButton = getByTestId('submit');
      fireEvent.press(submitButton);
  })
});
