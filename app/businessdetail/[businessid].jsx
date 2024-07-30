import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import GradientLoader from '../../components/GradientLoader'
import Intro from '../../components/BusinessDetail/Intro'
import ActionButton from '../../components/BusinessDetail/ActionButton'
import About from '../../components/BusinessDetail/About'
import Reviews from '../../components/BusinessDetail/Reviews'

export default function BusinessDetail() {

    const { businessid } = useLocalSearchParams()
    const [business, setBusiness] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getBusinessDetailById()
    }, []);

    const getBusinessDetailById = async () => {

        setLoading(true); // Set loading to true before fetching data
        
        // fetch business detail by id
        const docSnap = await getDoc(doc(db, 'BusinessList', businessid));

        if(docSnap.exists()){
            setBusiness({id: docSnap.id,... docSnap.data()})

            setLoading(false); // Set loading to false after fetching data
        }
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading ? (
                <FlatList
                    data={Array.from({ length: 4 })} 
                    renderItem={({ index }) => <GradientLoader width={350} height={130} key={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) :
            (<View>

                {/* intro */}
                <Intro business={business}/>

                {/* Action Buttons */}

                <ActionButton business={business}/>

                {/* About Section */}
                <About business={business}/>

                {/* Reviews */}
                <Reviews business={business}/>
            </View>)
        }
    </ScrollView>
  )
}