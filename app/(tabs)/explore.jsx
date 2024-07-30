import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Category from '../../components/Home/Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList'
import GradientLoader from '../../components/GradientLoader'

export default function explore() {

  const [businessList, setBusinessList] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getBusinessByCategory = async (category) => {
    setLoading(true)
    setBusinessList([])
    setSearchPerformed(true);
    const q = query(collection(db, 'BusinessList'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(businesses);
    setLoading(false);
  }

  const searchBusinesses = async (query) => {
    setLoading(true);
    setBusinessList([]);
    setSearchPerformed(true);
    const querySnapshot = await getDocs(collection(db, 'BusinessList'));
    const businesses = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.category.toLowerCase().includes(query.toLowerCase()) ||
        data.name.toLowerCase().includes(query.toLowerCase()) ||
        data.address.toLowerCase().includes(query.toLowerCase()) ||
        data.contact.toLowerCase().includes(query.toLowerCase()) ||
        data.about.toLowerCase().includes(query.toLowerCase())
      ) {
        businesses.push({ id: doc.id, ...data });
      }
    });
    setBusinessList(businesses);
    setLoading(false);
  }

  useEffect(() => {
    if (searchQuery) {
      searchBusinesses(searchQuery);
    }
  }, [searchQuery]);

  return (
    <View style={{
      padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30
      }}>Explore More</Text>

      {/* Search Bar */}

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
      }}>
        <Ionicons name="search-sharp" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Colors.PRIMARY
          }}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category List */}
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category)}
      />

      {/* Business List */}

      {loading ? (
        <FlatList
          data={Array.from({ length: businessList.length + 2 })}
          renderItem={({ index }) => <GradientLoader key={index} height={250} marginLeft={5}/>}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : businessList.length > 0 ? (
        <ExploreBusinessList businessList={businessList} />
      ) : (
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'outfit-bold',
            color: Colors.GRAY,
            textAlign: 'center',
            marginTop: '50%',
          }}
        >
          {searchPerformed ? 'No businesses found' : 'Please select a category to search or enter a keyword'}
        </Text>
      )}

    </View>
  )
}