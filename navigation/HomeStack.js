import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ApartmentListScreen from "../screens/ApartmentListScreen";
import ApartmentDetailsScreen from "../screens/ApartmentDetailsScreen";
import LoginRequiredWrapper from "../components/LoginRequiredWrapper";
import BookingFormScreen from "../screens/BookingFormScreen";
import PaymentScreen from "../screens/PaymentScreen";
import SuccessScreen from "../screens/SuccessScreen";
import FiltersScreen from "../screens/FiltersScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

import { ROUTES } from "../constants/ROUTES";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: "Головна" }}
      />
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{ title: "Вхід" }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
        options={{ title: "Реєстрація" }}
      />
      <Stack.Screen
        name={ROUTES.APARTMENT_LIST}
        component={ApartmentListScreen}
        options={{ title: "Список квартир" }}
      />
      <Stack.Screen
        name="FiltersScreen"
        component={FiltersScreen}
        options={{ title: "Фільтри" }}
      />
      <Stack.Screen
        name={ROUTES.APARTMENT_DETAILS}
        component={ApartmentDetailsScreen}
        options={{ title: "Деталі квартири" }}
      />
      <Stack.Screen name={ROUTES.BOOKING} options={{ title: "Бронювання" }}>
        {() => (
          <LoginRequiredWrapper>
            <BookingFormScreen />
          </LoginRequiredWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={ROUTES.PAYMENT}
        component={PaymentScreen}
        options={{ title: "Оплата" }}
      />
      <Stack.Screen
        name={ROUTES.SUCCESS}
        component={SuccessScreen}
        options={{ title: "Успішно", gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ title: "Редагування профілю" }}
      />
    </Stack.Navigator>
  );
}
