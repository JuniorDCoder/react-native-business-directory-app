import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { db } from '../../config/FirebaseConfig'
import { where, query, getDocs, collection } from 'firebase/firestore'
import BusinessListCard from '../../components/Explore/BusinessListCard'
import GradientLoader from '../../components/GradientLoader'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'

export default function MyBusiness() {

    const { user } = useUser()
    const navigation = useNavigation()

    const [businessList, setBusinessList] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'My Businesses',
            headerShown: true,
            headerStyle: {
                backgroundColor: Colors.PRIMARY
            },
            headerTintColor: '#fff', // Set the back icon color to white
            headerTitleStyle: {
                color: '#fff' // Set the header text color to white
            }
        })
       user && getUserBusiness()
    }, [user])

    const getUserBusiness = async () => {
        setLoading(true)
        setBusinessList([])
        const q = query(collection(db, 'BusinessList'), where(
            'userEmail', '==', user?.primaryEmailAddress?.emailAddress
        ))

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            setBusinessList(prev => [...prev, {id: doc.id, ...doc.data()}])
        })
        setLoading(false)
        setRefreshing(false)
    }

    const onRefresh = () => {
        setRefreshing(true)
        getUserBusiness()
    }

    return (
        <ScrollView
            style={{ padding: 20 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
            }}>My Businesses</Text>

            {loading ? (
                <FlatList
                    data={Array.from({ length: businessList.length + 4 })}
                    renderItem={({ index }) => <GradientLoader marginLeft={0} height={300} key={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : businessList.length === 0 ? (
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, textAlign: 'center', marginTop: '50%', color: Colors.GRAY }}>
                    You do not have any businesses.
                </Text>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={businessList}
                    renderItem={({ item, index }) => (
                        <BusinessListCard business={item} key={index} />
                    )}
                />
            )}

            <View style={{ height: 50 }}></View>
        </ScrollView>
    )
}