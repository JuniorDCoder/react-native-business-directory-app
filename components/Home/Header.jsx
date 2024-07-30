import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function Header() {

    const { user } = useUser()
  return (
    <View style={{
        padding: 20,
        padddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }}>
      <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 10
      }}>
        <Image source={{uri: user?.imageUrl}} style={{
            width: 45,
            height: 45,
            borderRadius: 22.5, // Half of width/height to make it fully
        }} />
        <View>
        <Text style={{
            color: 'white',
        }}>Welcome, </Text>
        <Text style={{
            fontSize1: 20,
            fontFamily: 'outfit-medium',
            color: 'white',
        }}>{user?.fullName}</Text>
        </View>
      </View>
      <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            backgroundColor: 'white',
            marginHorizontal: 10,
            marginTop: 10,
            borderRadius: 10,
      }}>
        <Ionicons name="search-sharp" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder="Search..." style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Colors.PRIMARY
        }}></TextInput>
      </View>
    </View>
  )
}