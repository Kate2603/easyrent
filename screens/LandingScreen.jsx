import React, { useLayoutEffect, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { loadUserProfile } from "../redux/userSlice";
import { ROUTES } from "../constants/ROUTES";

import { useThemeColors } from "../hooks/useThemeColors";
import { useStrings } from "../hooks/useStrings";

import SectionTitle from "../components/SectionTitle";
import LocationAutoDetect from "../components/LocationAutoDetect";
import CustomButton from "../components/CustomButton";

export default function LandingScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const colors = useThemeColors();
  const { strings } = useStrings();

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: strings.landingTitle,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={24} color={colors.textColor} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors.textColor, strings.landingTitle]);

  const handleGoToRegister = () => {
    navigation.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.HOME_STACK,
      params: { screen: ROUTES.REGISTER },
    });
  };

  const handleLogin = () => {
    navigation.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.HOME_STACK,
      params: { screen: ROUTES.LOGIN },
    });
  };

  const handleSearch = () => {
    navigation.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.HOME_STACK,
      params: { screen: ROUTES.APARTMENT_LIST },
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <SectionTitle style={{ color: colors.textColor }}>
        {strings.landingTitle}
      </SectionTitle>

      {!user ? (
        <>
          <Text style={[styles.text, { color: colors.textColor }]}>
            {strings.notLoggedIn}
          </Text>

          <CustomButton
            title={strings.register}
            onPress={handleGoToRegister}
            isActive
            activeBgColor={colors.primaryColor}
            activeTextColor={colors.chipActiveText}
            style={styles.button}
          />

          <CustomButton
            title={strings.login}
            onPress={handleLogin}
            isActive
            activeBgColor={colors.primaryColor}
            activeTextColor={colors.chipActiveText}
            style={styles.button}
          />
        </>
      ) : (
        <>
          <Text style={[styles.text, { color: colors.textColor }]}>
            {strings.hello} {user.fullName || strings.unknownUser}
          </Text>

          <LocationAutoDetect />

          <CustomButton
            title={strings.searchApartments}
            onPress={handleSearch}
            isActive
            activeBgColor={colors.primaryColor}
            activeTextColor={colors.chipActiveText}
            style={styles.button}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 12,
    minWidth: 200,
  },
  menuButton: {
    marginLeft: 16,
  },
});
