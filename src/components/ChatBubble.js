import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, isUser }) => (
  <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
    <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
      {message.content}
    </Text>
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
    backgroundColor: '#F1F1F1',
  },
  userText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  assistantText: {
    fontSize: 16,
    color: '#000000', // Changed to black for contrast
  },
  timestamp: {
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 2,
  },
});

export default ChatBubble;
