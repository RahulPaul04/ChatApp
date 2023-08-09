import React from 'react'
import {View,SafeAreaView,StyleSheet,Text} from 'react-native'


const Calls = ()=>{
    return(
        <SafeAreaView style={Styles.container}>
            <Text>This is the Call Screen</Text>
        </SafeAreaView>

    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
      },
})

export default Calls