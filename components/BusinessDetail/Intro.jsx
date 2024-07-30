import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'

export default function Intro({business}) {
  return (
    <View>
        <View style={{
            position: 'absolute',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 20,
            marginTop: 10,
        }}>

            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle" size={50} color="white" />
            </TouchableOpacity>
        
        <Ionicons name="heart-outline" size={50} color="white" />
        </View>
       <Image source={require('../../assets/images/login.jpeg')}
            style={{
                width: '100%',
                height: 340,
            }}
        />
        <View style={{
            padding: 20,
            marginTop: -20,
            backgroundColor: 'white',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
        }}>
            <Text style={{
                fontSize: 26,
                fontFamily: 'outfit-bold',
            }}>{business?.name}</Text>
            <Text style={{
                fontSize: 18,
                fontFamily: 'outfit',
            }}>{business?.address}</Text>
        </View>
    </View>
  )
}