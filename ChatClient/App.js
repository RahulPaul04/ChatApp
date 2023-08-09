import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Chats from './src/screens/ChatScreen';
import Calls from './src/screens/CallScreen';
import Chat from './src/screens/Chats';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack'


const Tab = createMaterialTopTabNavigator();


export default function App() {

  const number = 7012186017
  const socket = new WebSocket(`ws://something:8000/chats/?phone=${number}`)

  const stack = createStackNavigator()


const TabNAv = ()=>{


return(
      <View style={styles.container}>
        <Text style={styles.nameStyle}>Chat</Text>
      <Tab.Navigator initialRouteName ="Chats"
        screenOptions={{
          tabBarActiveTintColor:'blue',
          tabBarLabelStyle:{fontSize :15},
          tabBarStyle:styles.tabStyles
        }}>
        <Tab.Screen name="Chats" component={Chats} options={{tabBarLabel:"Chats"}}/>
        <Tab.Screen name="Settings" component={Calls} options={{tabBarLabel:"Calls"}} />
      </Tab.Navigator>
    </View>
)
}




  return (
    <SafeAreaView style={styles.container}>
    <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="Chats" component={TabNAv} options={{headerShown:false}}/>
                <stack.Screen name ="ChatScreen" >
                  {()=><Chat socket={socket}/>}
                  </stack.Screen>
            </stack.Navigator>
      
    </NavigationContainer>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   },
  tabStyles:{
    backgroundColor:"grey",
  },
  nameStyle:{
    backgroundColor:"grey",
    paddingTop:35,
    paddingLeft:20,
    fontSize:20,
  }
});
