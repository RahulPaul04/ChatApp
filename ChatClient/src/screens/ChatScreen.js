import React from 'react'
import {View,SafeAreaView,StyleSheet,Text,Image,TouchableHighlight} from 'react-native'
import Chat from './Chats'
import {useNavigation} from '@react-navigation/native'

const Chats = ({nav})=>{
    const navigation = useNavigation()

    const toChatScreen = ()=>{
        navigation.navigate('ChatScreen')
    }
    return(
        <SafeAreaView style={Styles.container}>
            <View>
            <Image
                source={require('../../assets/Avatar.jpg')} 
                style={Styles.image}/>
            </View>
            <TouchableHighlight underlayColor="white"  style={Styles.Name} onPress={toChatScreen}>
                <View >
                    <Text>Somthing</Text>
                </View>
            </TouchableHighlight>
                <View style={Styles.notification}>
                    <Text>Somthing</Text>
                </View>
            
        </SafeAreaView>

    )
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        backgroundColor:"grey"
    },
    image:{
        width:80,
        height:80
    },
    Name:{
        height:80,
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    notification:{
        height:80,
        widht:80,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Chats