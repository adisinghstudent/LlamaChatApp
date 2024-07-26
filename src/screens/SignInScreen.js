import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { signInWithApple } from '../services/AppleSignIn';

const SignInScreen = ({ navigation }) => {
  const handleSignIn = async () => {
    try {
      await signInWithApple();
      navigation.navigate('Chat');
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in with Apple" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;

// WARN  [2024-07-26T03:35:32.781Z]  @firebase/auth: Auth (10.12.2): 
// You are initializing Firebase Auth for React Native without providing
// AsyncStorage. Auth state will default to memory persistence and will not
// persist between sessions. In order to persist auth state, install the package
// "@react-native-async-storage/async-storage" and provide it to
// initializeAuth:

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });