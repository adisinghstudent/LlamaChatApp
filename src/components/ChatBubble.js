import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ChatBubble = ({ message, isUser }) => (
  <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
    {!isUser && <BubbleTail isUser={isUser} />}
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
      <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
        {message.content}
      </Text>
    </View>
    {isUser && <BubbleTail isUser={isUser} />}
  </View>
);

const BubbleTail = ({ isUser }) => (
  <Svg width={15} height={15} viewBox="0 0 15 15" style={isUser ? styles.userTail : styles.assistantTail}>
    <Path
      d="M15 0 L0 15 L0 0 Z"
      fill={isUser ? '#1F8AFF' : '#E5E5EA'}
    />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  assistantContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: 10,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#1F8AFF',
   
    
  },
  assistantBubble: {
    backgroundColor: '#E5E5EA',
    
  },
  userText: {
    color: '#FFFFFF',
    
  },
  assistantText: {
    color: '#000000',
  },
  messageText: {
    fontSize: 16,
  },
  userTail: {
    marginRight: -10,
    marginTop: 10,
    transform: [{ scaleX: -2 }],
    transform: [{ scaleY: 0 }],
  },
  assistantTail: {
    marginLeft: -10,
    marginTop: 10,
    transform: [{ scaleX: -2 }],
    transform: [{ scaleY: 0 }],
  },
});

export default ChatBubble;