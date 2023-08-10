import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';

const Chat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, addMessage] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendView = (text) => (
    <View style={styles.send} >
      <Text style={{fontSize:20,padding:2}}>{text}</Text>
    </View>
  );

  const receiveView = (text) => (
    <View style={styles.receive}>
      <Text style={{ fontSize: 20, padding: 2 }}>{text}</Text>
    </View>
  );

  

  socket.onmessage = function (e) {
    console.log(e)
    const data = JSON.parse(e.data);
    const messageData = data["message"];
    const sender = data["sender"];
    console.log(messageData)
    addMessage([...messages,receiveView(messageData)])
  };

  const messageSend = () => {
    const msg = message;
    socket.send(JSON.stringify({
      "message": msg,
      "sender": 7012186017,
      "receiver": 7012186017
    }));
    addMessage([...messages, sendView(msg)])
    setMessage("");
  };

  const renderViews = () => {
    return messages.map((msg, index) => (
      <View key={index} style={styles.msgContainer}>
        {msg}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureScrollView style={styles.scroll} ref={scrollRef}>
        <View style={styles.messageArea}>
          {renderViews()}
        </View>
      </GestureScrollView>
      <View style={styles.message}>
        <TextInput
          style={styles.input}
          placeholder="Enter Message"
          value={message}
          onChangeText={text => setMessage(text)} />
        <Button title="Send" onPress={messageSend} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  messageArea: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  message: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    borderRadius: 10,
    height: 40,
    backgroundColor: 'grey',
    marginRight: 5,
    padding: 5,
  },
  send: {
    backgroundColor: 'skyblue',
    padding: 5,
    width: 'auto',
    borderRadius: 10,
    marginLeft: 'auto',
    marginBottom: 5,
    
  },
  receive:{
    backgroundColor: 'lightgreen',
    padding: 5,
    width: 'auto',
    borderRadius: 10,
    marginRight:'auto',
    marginBottom: 5,
    
  },
  msgContainer: {
    
  },
});

export default Chat;
