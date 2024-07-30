// components/GradientLoader.js
import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientLoader = ({width = 350, height = 120, marginLeft=20}) => {
    return (
        <View style={{ flex: 1}}>
            <LinearGradient
                colors={['#e0e0e0', '#c0c0c0', '#e0e0e0']}
                style={{
                width,
                height,
                borderRadius: 10,
                marginLeft: marginLeft,
                marginTop: 15,
                backgroundColor: '#e0e0e0',
                            
            }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
            </LinearGradient>
        </View>
    );
};

export default GradientLoader;
