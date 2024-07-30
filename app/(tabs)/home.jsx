import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useCallback } from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'
import GradientLoader from '../../components/GradientLoader'

export default function home() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or any async operation
    setTimeout(() => {
      setRefreshing(false);
      // Add any additional logic to refresh the content here
    }, 1000);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      {refreshing ? <GradientLoader height={100} /> : <Header />}

      {/* Slider */}
      {refreshing ? <GradientLoader height={200} /> : <Slider />}

      {/* Categories */}
      {refreshing ? <GradientLoader height={150} /> : <Category />}

      {/* Popular */}
      {refreshing ? <GradientLoader height={250} /> : <PopularBusiness />}

      <View style={{ height: 50 }}></View>
    </ScrollView>
  )
}