import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const BlinkingText = ({ text, duration, textStyle }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration / 2,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: duration / 2, 
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTimeout(fadeOut, duration / 2); 
        fadeIn();
    }, duration); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={styles.styleText}>{text}</Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
    styleText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        margin:2,
        padding:4
    }
})



export default BlinkingText;
