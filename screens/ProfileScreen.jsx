import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const user = {
    name: "Катерина Величко",
    email: "kateryna.velychko@example.com",
    avatar: "https://i.pravatar.cc/150?img=47",
  };

  const handleEditProfile = () => {
    Alert.alert("Редагування профілю", "Ця функція ще не реалізована");
  };

  const handleLogout = () => {
    Alert.alert("Вийти з акаунту?", "Ви впевнені?", [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Вийти",
        onPress: () => navigation.navigate(ROUTES.LANDING),
        style: "destructive",
      },
    ]);
  };

  const data = [
    {
      key: "header",
      render: () => (
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <SectionTitle>{user.name}</SectionTitle>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      ),
    },
    {
      key: "edit",
      render: () => (
        <CustomButton title="Редагувати профіль" onPress={handleEditProfile} />
      ),
    },
    {
      key: "logout",
      render: () => (
        <CustomButton title="Вийти" onPress={handleLogout} isActive />
      ),
    },
  ];

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={({ item }) => item.render()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
  },
});
