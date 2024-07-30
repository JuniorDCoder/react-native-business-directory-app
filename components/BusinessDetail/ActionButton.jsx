import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'

export default function ActionButton({business}) {

    const actionButtonMenu = [
        {
            id: 1,
            name: 'Call',
            icon: require('../../assets/images/icons/call.png'),
            url: 'tel:'+business?.contact
        },
        {
            id: 2,
            name: 'Location',
            icon: require('../../assets/images/icons/location.gif'),
            url: 'https://www.google.com/maps/search/?api=1&query='+business?.address
        },
        {
            id: 3,
            name: 'Website',
            icon: require('../../assets/images/icons/website.gif'),
            url: business?.website
        },
        {
            id: 4,
            name: 'Share',
            icon: require('../../assets/images/icons/share.gif'),
            url: 'sms:'+business?.website
        }
    ]

    const OnPressHandler = (item) => {
        if (item.name == 'Share') {
            Share.share({
                message: business?.name+"\n Address: "+business?.address+"\n Find more details on Business Directory App by Junior DCoder !",
            })
        }
        Linking.openURL(item.url)
    }
  return (
    <View style={{
        backgroundColor: 'white',
        padding: 20,
    }}>
        <FlatList 
            data={actionButtonMenu}
            numColumns={4}
            columnWrapperStyle={{
                justifyContent: 'space-between',
            }}
            renderItem={({item, index}) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => OnPressHandler(item)}
                >
                    <Image source={item?.icon} 
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    />
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        textAlign: 'center',
                        marginTop: 3
                    }}>{item?.name}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
  )
}