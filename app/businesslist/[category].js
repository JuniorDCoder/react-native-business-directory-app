import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import GradientLoader from '../../components/GradientLoader';

export default function BusinessListByCategory() {
    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(true); // State variable for loading status

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
            headerLeft: () => (
                <TouchableOpacity style={{ padding: 10, fontFamily: 'outfit-bold' }} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, category]);

    useEffect(() => {
        getBusinessList();
    }, []);

    const getBusinessList = async () => {
        setLoading(true); // Set loading to true before fetching data
        // fetch business list by category
        const q = query(collection(db, 'BusinessList'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const businesses = [];
        querySnapshot.forEach((doc) => {
            businesses.push({ id: doc.id, ...doc.data() });
        });
        setBusinessList(businesses);
        setLoading(false); // Set loading to false after fetching data
    };

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <FlatList
                    data={Array.from({ length: businessList.length + 2 })}
                    renderItem={({ index }) => <GradientLoader key={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : businessList.length > 0 ? (
                <FlatList
                    onRefresh={getBusinessList}
                    refreshing={loading}
                    data={businessList}
                    renderItem={({ item }) => (
                        <BusinessListCard business={item} key={item.id} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'outfit-bold',
                        color: Colors.GRAY,
                        textAlign: 'center',
                        marginTop: '50%',
                    }}
                >
                    No businesses found
                </Text>
            )}
        </View>
    );
}