import React, { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { logout } from "../redux/userSlice";
import { useThemeColors } from "../hooks/useThemeColors";
import { useStrings } from "../hooks/useStrings";
import LoginRequiredWrapper from "../components/LoginRequiredWrapper";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { strings } = useStrings();
  const { backgroundColor, textColor, placeholderColor, avatarBorder } =
    useThemeColors();
  const { user } = useSelector((state) => state.user);

  // 🔧 Встановлюємо заголовок
  useLayoutEffect(() => {
    navigation.setOptions({
      title: strings.profile,
    });
  }, [navigation, strings.profile]);

  const handleEditProfile = () => {
    navigation.navigate(ROUTES.PROFILE_TAB, {
      screen: ROUTES.EDIT_PROFILE,
    });
  };

  const handleLogout = () => {
    Alert.alert(strings.logoutConfirmTitle, strings.logoutConfirmMessage, [
      {
        text: strings.cancel,
        style: "cancel",
      },
      {
        text: strings.logout,
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
            style={[styles.avatar, { borderColor: avatarBorder }]}
          />
          <SectionTitle style={{ color: textColor }}>
            {user?.fullName || strings.unknownUser}
          </SectionTitle>
          <Text style={[styles.email, { color: placeholderColor }]}>
            {user?.email || strings.noEmail}
          </Text>
        </View>
      ),
    },
    {
      key: "edit",
      render: () => (
        <CustomButton title={strings.editProfile} onPress={handleEditProfile} />
      ),
    },
    {
      key: "logout",
      render: () => (
        <CustomButton title={strings.logout} onPress={handleLogout} isActive />
      ),
    },
  ];

  return (
    <LoginRequiredWrapper>
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <FlatList
          style={{ backgroundColor }}
          contentContainerStyle={[styles.container, { backgroundColor }]}
          data={data}
          renderItem={({ item }) => item.render()}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    </LoginRequiredWrapper>
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
