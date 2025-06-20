import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { ROUTES } from "../constants/ROUTES";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Невірний email").required("Обов'язково"),
  password: Yup.string().min(4, "Мінімум 4 символи").required("Обов'язково"),
});

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const inputBgColor = theme === "light" ? "#fff" : "#222";
  const borderColor = theme === "light" ? "#ccc" : "#555";
  const placeholderColor = theme === "light" ? "#999" : "#aaa";
  const errorColor = "#FF3B30";

  const handleLogin = (values) => {
    const { email } = values;

    dispatch(
      loginSuccess({
        user: {
          fullName: "Катерина Величко",
          email,
          avatar: "https://i.pravatar.cc/150?u=kateryna",
        },
        token: "mock-token",
      })
    );

    navigation.navigate(ROUTES.HOME_TAB);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle>Увійти</SectionTitle>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor,
                  color: textColor,
                },
              ]}
              placeholder="Email"
              placeholderTextColor={placeholderColor}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
              returnKeyType="next"
            />
            {touched.email && errors.email && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.email}
              </Text>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor,
                  color: textColor,
                },
              ]}
              placeholder="Пароль"
              placeholderTextColor={placeholderColor}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={() => handleSubmit()}
            />
            {touched.password && errors.password && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.password}
              </Text>
            )}

            <CustomButton title="Увійти" onPress={handleSubmit} isActive />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  error: {
    marginBottom: 10,
    fontSize: 13,
  },
});
