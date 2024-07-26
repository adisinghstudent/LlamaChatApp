import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import LoadingIndicator from '../components/LoadingIndicator';
import Header from '../components/Header';
import { getAIResponse } from '../services/AIService';
import { saveMessages, loadMessages } from '../utils/storage';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const route = useRoute();
  const { userName } = route.params || { userName: 'User' };
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    loadMessages().then(setMessages);
  }, []);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (input.trim()) {
      const userMessage = {
        role: 'user',
        content: `${input.trim()}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const aiResponse = await getAIResponse(input.trim());
        const assistantMessage = {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        // Handle error (e.g., show an error message to the user)
      } finally {
        setIsLoading(false);
      }
    }
  }, [input, userName]);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Header />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} isUser={message.role === 'user'} />
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <LoadingIndicator />
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          onSubmitEditing={sendMessage}
          keyboardType="default"
          returnKeyType="send"
          enablesReturnKeyAutomatically={true}
          editable={!isLoading}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={isLoading}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 0,
  },
  sendButton: {
    backgroundColor: '#1F8AFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginVertical: 5,
  },
});

export default ChatScreen;