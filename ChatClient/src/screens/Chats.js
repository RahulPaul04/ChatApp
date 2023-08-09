import React from 'react'
import { View,SafeAreaView ,Text, StyleSheet, Button,TextInput} from 'react-native'

const Chat = ({socket})=>{
    

    socket.onmessage = function(e){
        const data = Json.parse(e.data)
        const messageData = data["message"]
        const sender = data["sender"]
        
    }
    
    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.messageArea}>
            <Text>This the Chat Screen</Text>
        </View>
        <View style={styles.message}>
        <TextInput
            style={styles.input}
            placeholder="Enter Message"/>
        <Button title="Send"/>
        </View>
    </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:''
    },
    messageArea:{
        flex:1
    },
    message:{
        flexDirection:'row',
        padding:10,
    },
    input:{
        flex:1,
        fontSize:20,
        borderRadius:10,
        height:40,
        backgroundColor:'grey',
        marginRight:5
    }
})

export default Chat