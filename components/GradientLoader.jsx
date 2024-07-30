import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientLoader = ({ width = 350, height = 120, marginLeft = 20 }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: width,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -width,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX, width]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ overflow: 'hidden', width, height, marginLeft, marginTop: 15, borderRadius: 10, backgroundColor: '#e0e0e0' }}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }}>
          <LinearGradient
            colors={['#e0e0e0', '#c0c0c0', '#e0e0e0']}
            style={{ width: '200%', height: '100%' }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default GradientLoader;