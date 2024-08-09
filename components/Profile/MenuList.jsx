import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter, useNavigation } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {

    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('../../assets/images/icons/add.gif'),
            path: 'business/add-business'
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('../../assets/images/icons/info.png'),
            path: 'business/my-business'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('../../assets/images/icons/share.gif'),
            path: 'share'
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('../../assets/images/icons/logout.gif'),
            path: 'logout'
        }
    ]
    const { signOut } = useAuth()

    const router = useNavigation()

    const onMenuClick = (item) => {
        if(item.path === 'logout') {
            signOut()
            return
        }
        if(item.path === 'share') {
            Share.share({
                message: 'Download Business Directory App by JuniorDCoder'
            })
            return
        }
        router.push(item.path)
    }
  return (
    <View style={{
        marginTop: 50
    }}>
      <FlatList
      numColumns={2}
        data={menuList}
        renderItem={({item, index}) => (
            <TouchableOpacity 
            onPress={() => onMenuClick(item)}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                flex: 1,
                padding: 10,
                borderWidth: 1,
                margin: 10,
                borderRadius: 15,
                backgroundColor: 'white',
                borderColor: Colors.PRIMARY
            }}>
                <Image source={item.icon} style={{
                width: 50,
                height: 50,
                }} />
                <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 16,
                flex: 1
                }}>{item.name}</Text>
            </TouchableOpacity>                    
        )}
      />
        <Text style={{
            fontFamily: 'outfit',
            textAlign: 'center',
            marginTop: 50,
            color: Colors.GRAY
        }}>Developed by JuniorDCoder @ {new Date().getFullYear()}</Text>
    </View>
  )
}