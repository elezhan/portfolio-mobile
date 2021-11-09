import { AsyncStorage } from 'react-native';

export const storeNumber = async (data) => {
  const { hisownnumber } = data;
  try {
    await AsyncStorage.setItem('hisownnumber', hisownnumber);
  } catch (error) {
    // Error saving data
  }
};

export const retrieveNumber = async () => {
  try {
    const value = await AsyncStorage.getItem('hisownnumber');
    if (value !== null) {
      return { hisownnumber: value };
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const checkIfNumberStored = async () => {
  try {
    const value = await AsyncStorage.getItem('hisownnumber');
    if (value !== null) {
      return { submitted: true };
    } else {
      return { submitted: false };
    }
  } catch (error) {
    // Error retrieving data
  }
};
