import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveMessages = async (messages) => {
  try {
    await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages:', error);
  }
};

export const loadMessages = async () => {
  try {
    const savedMessages = await AsyncStorage.getItem('chatMessages');
    return savedMessages !== null ? JSON.parse(savedMessages) : [];
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
};