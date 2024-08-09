import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { query, collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import GradientLoader from '../GradientLoader'

export default function Slider() {

    const [sliderList, setSliderList] = useState([])
    useEffect(() => {
        getSliderList()
    }, [])

    const [loading, setLoading] = useState(true); // State variable for loading status

    const getSliderList = async () => {
      setLoading(true);
        setSliderList([])
        const q=query(collection(db, 'Slider'))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setSliderList(prev=>[...prev, doc.data()])
            setLoading(false);
        })
    }
  return (
    <View>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 20,
        marginBottom: 5
      }}>
        #Special for you
      </Text>

      {loading ? (
       <FlatList
          style={{
            paddingLeft: 20,
        }}  
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={Array.from({ length: 3 })}
          renderItem={({ index }) => <GradientLoader width={200} key={index} />}
          keyExtractor={(item, index) => index.toString()}
      />
      ) : (
          <FlatList 
              data={sliderList}
              style={{
                  paddingLeft: 20,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                  <Image 
                      source={{ uri: item.imageURL }}
                      style={{
                          width: 300,
                          height: 150,
                          borderRadius: 15,
                          marginRight: 15,
                      }}
                  />
              )}
          />
      )}
    </View>
  )
}