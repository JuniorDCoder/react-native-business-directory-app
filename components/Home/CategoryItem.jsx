import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CategoryItem({category, onCategoryPress}) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
        <View style={{
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        marginRight: 15,
        borderRadius: 10,
        }}>
        <Image source={{uri: category.icon}}
         style={{
            width: 40,
            height: 40,
            borderRadius: 15,
            marginRight: 15
        }}
        />
        <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 15,
            textAlign: 'auto',
            }}
        >{category.name}</Text>
        </View>
    </TouchableOpacity>
  )
}