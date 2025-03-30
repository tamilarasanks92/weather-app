import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch(error) {
        console.error(error)
    }
}

export const getData = async (key: string) => {
    try {
        const response = await AsyncStorage.getItem(key)
        return response
    } catch(error) {
        console.error(error)
    }
}