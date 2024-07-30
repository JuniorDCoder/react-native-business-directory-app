import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function PopularBusinessCard({business}) {

  const router = useRouter()
  return (
    <TouchableOpacity style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
    }}
    onPress={() => router.push(`/businessdetail/${business.id}`)}
    >
      <Image source={require('../../assets/images/login.jpeg')} 
      style={{
        width: 200,
        height: 130,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
      }}
      />
      <View style={{
        marginTop: 7,
        gap: 5
      }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 15,
        }}>{business?.name}
        </Text>
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 13,
            color: Colors.GRAY
        }}>{business?.address}
        </Text>

        <View style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5
            }}>
                <Image source={require('../../assets/images/icons/star.png')} 
                    style={{
                        width: 15,
                        height: 15,
                    }}
                />
                <Text style={{fontFamily: 'outfit'}}>4.5</Text>
            </View>
            <Text style={{
                fontFamily: 'outfit',
                color: 'white',
                backgroundColor: Colors.PRIMARY,
                padding: 5,
                fontSize: 10,
                borderRadius: 5
            }}>{business?.category}</Text>
        </View>
      </View>
        
    </TouchableOpacity>
  )
}