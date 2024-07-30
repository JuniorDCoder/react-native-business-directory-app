import { View, Text, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import { query, collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router'
import GradientLoader from '../GradientLoader'

export default function Category({explore=false, onCategorySelect}) {

    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(true);

    const router = useRouter()
    useEffect(() => {
        getCategoryList()
    }, [])

    const getCategoryList = async () => {
        setLoading(true)
        setCategoryList([])
        const q=query(collection(db, 'Category'))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setCategoryList(prev=>[...prev, doc.data()])
            setLoading(false)
        })
    }

    const onCategoryPressHandler = (item) => {
        if(!explore){

          router.push('/businesslist/'+item.name)
        }
        else{
          onCategorySelect(item.name)
        }
    }
  return (
    <View>
      {!explore && <View style={{
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
        }}>#Category
        
        </Text>
        <Text style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-medium',
        }}>View All</Text>
      </View>}
      
        {loading ? (
          <FlatList
            style={{
              paddingLeft: 20,
          }}  
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={Array.from({ length: 7 })}
            renderItem={({ index }) => <GradientLoader width={90} height={90} key={index} />}
            keyExtractor={(item, index) => index.toString()}
        />
        ) : (
          <FlatList 
            data={categoryList}
            style={{
                paddingLeft: 20,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
            <CategoryItem 
                category={item}
                key={index}
                onCategoryPress={(category) => {
                  onCategoryPressHandler(item)
                }
                }
            />
            )}
         />
        )}
        
    </View>
  )
}