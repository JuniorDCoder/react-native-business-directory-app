import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { query, collection, limit, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'
import GradientLoader from '../GradientLoader'


export default function PopularBusiness() {

    const [businessList, setBusinessList] = useState([])

    useEffect(() => {
        getBusinessList()
    }, [])

    const [loading, setLoading] = useState(true); // State variable for loading status

    const getBusinessList=async () => {
        setLoading(true)
        setBusinessList([])
        const q = query(collection(db, 'BusinessList'), limit(10))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            setBusinessList(prev=>[...prev, {id: doc.id, ...doc.data()}])
            setLoading(false)
        })
    }
  return (
    <View>
        <View style={{
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center'
      }}>
        <Text style={{
            marginLeft: 20,           
            fontFamily: 'outfit-bold',
            fontSize: 20,
        }}>#Popular Business
        
        </Text>
        <Text style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-medium',
        }}>View All</Text>
        </View>
        {loading ? (
            <FlatList
            style={{
              paddingLeft: 20,
          }}  
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={Array.from({ length: 5 })}
            renderItem={({ index }) => <GradientLoader height={150} width={200} key={index} />}
            keyExtractor={(item, index) => index.toString()}
            />
        ) : (
            <FlatList 
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={businessList}
                renderItem={({item, index}) => (
                    <PopularBusinessCard 
                    business={item}
                    key={index}
                    />
                )}
                />
        )}
        
    </View>
  )
}