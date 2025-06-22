import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { useThemeColors } from "../hooks/useThemeColors";
import { useStrings } from "../hooks/useStrings";

export default function SuccessScreen() {
  const navigation = useNavigation();
  const { backgroundColor, textColor, cardColor } = useThemeColors();
  const { strings } = useStrings();
  const t = strings.successScreen;

  const handleReturn = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROUTES.LANDING }],
      })
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle style={{ color: textColor }}>{t.title}</SectionTitle>

      <View style={[styles.messageBox, { backgroundColor: cardColor }]}>
        <Text style={[styles.message, { color: textColor }]}>{t.message}</Text>
      </View>

      <CustomButton title={t.returnButton} onPress={handleReturn} isActive />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  messageBox: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
    width: "100%",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});
