import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text, Image } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import logo from "../assets/logo.png";

export default function SplashScreen() {
  const { backgroundColor, textColor } = useThemeColors();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.Image
        source={logo}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Animated.Text
        style={[styles.text, { color: textColor, opacity: fadeAnim }]}
      >
        Завантаження EasyRent...
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
});
