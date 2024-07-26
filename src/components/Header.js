import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.Logo}>📱</Text>
    <Text style={styles.headerTitle}>Llama3.2</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1F8AFF',
    padding: 40,
    alignItems: 'center',
  },
  Logo: {
    padding: 10,
    
  },
  headerTitle: {
    color: 'white',
    padding:0,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;