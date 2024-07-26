import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, isUser }) => (
  <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
    <Text style={styles.messageText}>{message.content}</Text>
    <Text style={styles.timestamp}>{message.timestamp}</Text>
  </View>
);

const styles = StyleSheet.create({
  bubble: {
    padding: 6,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '65%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#1F8AFF',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#808080',
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 2,
  },
});

export default ChatBubble;