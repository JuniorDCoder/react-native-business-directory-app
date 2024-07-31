import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({ business }) {

  const { user } = useUser()

  const onDelete = () => {
    Alert.alert(
      'Do you want to delete this business?',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteBusiness()
        }
      ]
    )
  }

  const deleteBusiness = async () => {
    await deleteDoc(doc(db, 'BusinessList', business?.id))
    router.back()
    ToastAndroid.show('Business Deleted', ToastAndroid.LONG)
  }
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 20,
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={50} color="white" />
        </TouchableOpacity>

        <Ionicons name="heart-outline" size={50} color="white" />
      </View>
      {business?.imageUrl ? (
        <Image
          source={{ uri: business?.imageUrl }}
          style={{
            width: '100%',
            height: 340,
          }}
          onError={(error) => console.error('Image Load Error:', error)}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: 340,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
          }}
        >
          <Text>No Image Available</Text>
        </View>
      )}

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
      }}>

        <View
          style={{
            padding: 20,
            marginTop: -20,
            backgroundColor: 'white',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontFamily: 'outfit-bold',
            }}
          >
            {business?.name}
            
          </Text>
          
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'outfit',
            }}
          >
            {business?.address}
          </Text>
        </View>
        {user?.primaryEmailAddress?.emailAddress === business?.userEmail&& (
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="trash" size={30} color="red" />
          </TouchableOpacity>
        )}
        
      </View>
      
    </View>
  );
}