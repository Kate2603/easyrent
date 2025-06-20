import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import LandingScreen from "../screens/LandingScreen";
import FiltersScreen from "../screens/FiltersScreen";
import HomeTabs from "./HomeTabs";
import ProfileStack from "./ProfileStack";

import { ROUTES } from "../constants/ROUTES";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const user = {
    name: "Катерина Величко",
    avatar: "https://i.pravatar.cc/150?img=47",
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.userInfoSection}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(ROUTES.PROFILE_TAB, {
              screen: ROUTES.PROFILE,
            })
          }
        >
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{user.name}</Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Вийти"
        onPress={() => props.navigation.navigate(ROUTES.LANDING)}
        labelStyle={{ fontWeight: "700", color: "#FF3B30" }}
      />
    </DrawerContentScrollView>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.HOME_TAB}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#006FFD",
        drawerInactiveTintColor: "#AFAFAF",
        drawerLabelStyle: { fontSize: 16, fontWeight: "700", color: "#000" },
        drawerStyle: { backgroundColor: "#F6F6F6" },
      }}
    >
      <Drawer.Screen
        name={ROUTES.HOME_TAB}
        component={HomeTabs}
        options={{ drawerLabel: "Головна" }}
      />
      <Drawer.Screen
        name={ROUTES.FILTERS}
        component={FiltersScreen}
        options={{ drawerLabel: "Фільтри" }}
      />
      <Drawer.Screen
        name={ROUTES.PROFILE_TAB}
        component={ProfileStack}
        options={{ drawerLabel: "Профіль" }}
      />
      <Drawer.Screen
        name={ROUTES.LANDING}
        component={LandingScreen}
        options={{ drawerLabel: "Вітаємо" }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    padding: 20,
    backgroundColor: "#F6F6F6",
    marginBottom: 10,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "#006FFD",
  },
});
