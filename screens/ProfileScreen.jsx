import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { logout } from "../redux/userSlice";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";
import { useStrings } from "../hooks/useStrings";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { strings } = useStrings();

  const { user } = useSelector((state) => state.user);

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const secondaryTextColor = theme === "light" ? "#555" : "#aaa";
  const avatarBorderColor =
    theme === "light" ? COLORS.lightAvatarBorder : COLORS.darkAvatarBorder;

  // Якщо користувач не авторизований або гість — редірект на логін
  useEffect(() => {
    if (!user || user.role === "guest") {
      navigation.navigate(ROUTES.LOGIN);
    }
  }, [user, navigation]);

  // Далі код для авторизованого користувача

  const handleEditProfile = () => {
    navigation.navigate(ROUTES.PROFILE_TAB, {
      screen: ROUTES.EDIT_PROFILE,
    });
  };

  const handleLogout = () => {
    Alert.alert(
      strings.logoutConfirmTitle || "Вийти з акаунту?",
      strings.logoutConfirmMessage || "Ви впевнені?",
      [
        {
          text: strings.cancel || "Скасувати",
          style: "cancel",
        },
        {
          text: strings.logout || "Вийти",
          onPress: () => {
            dispatch(logout());
            navigation.navigate(ROUTES.LANDING);
          },
          style: "destructive",
        },
      ]
    );
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
          <SectionTitle>{user?.fullName || strings.unknownUser}</SectionTitle>
          <Text style={[styles.email, { color: secondaryTextColor }]}>
            {user?.email || strings.noEmail}
          </Text>
        </View>
      ),
    },
    {
      key: "edit",
      render: () => (
        <CustomButton
          title={strings.editProfile || "Редагувати профіль"}
          onPress={handleEditProfile}
        />
      ),
    },
    {
      key: "logout",
      render: () => (
        <CustomButton
          title={strings.logout || "Вийти"}
          onPress={handleLogout}
          isActive
        />
      ),
    },
  ];

  // Поки user === undefined (завантаження), можна показати спінер або пустий екран
  if (!user || user.role === "guest") {
    return null; // або можна показати ActivityIndicator
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <FlatList
        style={{ backgroundColor }}
        contentContainerStyle={[styles.container, { backgroundColor }]}
        data={data}
        renderItem={({ item }) => item.render()}
      />
    </SafeAreaView>
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
