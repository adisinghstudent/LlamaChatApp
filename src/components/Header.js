import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.Logo}>📱</Text>
    <Text style={styles.headerTitle}>Llama3.1</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F1F1F1',
    padding: 20,
    alignItems: 'center',
    
  },
  Logo: {
    padding: 10,
    marginTop: 35,
    
  },
  headerTitle: {
    color: 'black',
    padding:0,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;