import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import * as WebBrowser from 'expo-web-browser' 
import useWarmUpBrowser from '../hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({strategy: "oauth_google"}) 

    const onPress = React.useCallback(async () => {
        try{
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow()
            if (createdSessionId) {
                setActive({session: createdSessionId})
            }
            else {
               // Use signin or signup for next step
            }
        } catch (error) {
            console.log("OAuth error",error)
        }
    }, [])
  
    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 80 }}
            contentContainerStyle={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <View>
                <Image source={require('../assets/images/login.jpg')}
                style={{width: 220, height: 400, borderRadius: 20, borderWidth: 5, borderColor: '#000'}}/>
            </View>

            <View style={styles.subContainer}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: 'outfit-bold',
                    textAlign: 'center'
                }}>Your Ultimate <Text style={{color: Colors.PRIMARY}}>
                Community Business Directory</Text> App
                </Text>
                <Text style={{
                    fontSize: 15,
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    marginVertical: 15,
                    color: Colors.GRAY
                }}>Find your favourite business near you and post your own business to your community</Text>
                <TouchableOpacity onPress={onPress} style={styles.btn}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: 'outfit'
                    }}>Let's Get Started</Text>
                </TouchableOpacity>
            </View>
                
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -10
    }, 
    btn:{
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 15
    }
})