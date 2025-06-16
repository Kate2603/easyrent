import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";

export default function ProfileScreen() {
  const navigation = useNavigation();

  // Тестові дані
  const user = {
    name: "Катерина Величко",
    email: "kateryna.velychko@example.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  };

  const handleEditProfile = () => {
    Alert.alert("Редагування профілю", "Ця функція ще не реалізована");
  };

  const handleLogout = () => {
    Alert.alert("Вийти з акаунту?", "Ви впевнені, що хочете вийти?", [
      { text: "Скасувати", style: "cancel" },
      { text: "Вийти", onPress: () => navigation.navigate(ROUTES.LANDING) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <SectionTitle>{user.name}</SectionTitle>
      <View style={styles.emailBox}>
        <SectionTitle>{user.email}</SectionTitle>
      </View>

      <CustomButton title="Редагувати профіль" onPress={handleEditProfile} />

      <CustomButton title="Вийти" onPress={handleLogout} isActive={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  emailBox: {
    marginBottom: 32,
  },
});
