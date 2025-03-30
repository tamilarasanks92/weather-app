import axios from "axios";
import Config from 'react-native-config';

export const fetchData = async (city) => {
    try {
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${Config.REACT_APP_ACCESS_KEY}&query=${city}`)
        const data = await response.data
        if(data?.success === false) throw data?.error?.info
        return data;
    } catch(error) {
        throw error;
    }
}