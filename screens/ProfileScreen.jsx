import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { logout } from "../redux/userSlice";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { user } = useSelector((state) => state.user);

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const secondaryTextColor = theme === "light" ? "#555" : "#aaa";
  const avatarBorderColor =
    theme === "light" ? COLORS.lightAvatarBorder : COLORS.darkAvatarBorder;

  const handleEditProfile = () => {
    navigation.navigate(ROUTES.PROFILE_TAB, {
      screen: ROUTES.EDIT_PROFILE,
    });
  };

  const handleLogout = () => {
    Alert.alert("Вийти з акаунту?", "Ви впевнені?", [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Вийти",
        onPress: () => {
          dispatch(logout());
          navigation.navigate(ROUTES.LANDING);
        },
        style: "destructive",
      },
    ]);
  };

  const data = [
    {
      key: "header",
      render: () => (
        <View style={styles.header}>
          <Image
            source={{ uri: user?.avatar || "https://i.pravatar.cc/150" }}
            style={[styles.avatar, { borderColor: avatarBorderColor }]}
          />
          <SectionTitle>{user?.fullName || "Користувач"}</SectionTitle>
          <Text style={[styles.email, { color: secondaryTextColor }]}>
            {user?.email || "no-email@example.com"}
          </Text>
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
      style={{ backgroundColor }}
      contentContainerStyle={[styles.container, { backgroundColor }]}
      data={data}
      renderItem={({ item }) => item.render()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
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
    borderWidth: 2,
  },
  email: {
    fontSize: 16,
    marginTop: 8,
  },
});
