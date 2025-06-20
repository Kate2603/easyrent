import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Обов'язково"),
  email: Yup.string().email("Невірний email").required("Обов'язково"),
  password: Yup.string().min(4, "Мінімум 4 символи").required("Обов'язково"),
});

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const secondaryTextColor = theme === "light" ? "#555" : "#aaa";

  const placeholderColor = theme === "light" ? "#999" : "#aaa";
  const errorColor = theme === "light" ? "#FF3B30" : "#FF6B6B";
  const linkColor =
    theme === "light" ? COLORS.primaryLight : COLORS.primaryDark;

  const handleRegister = (values) => {
    const { fullName, email, password } = values;

    // Мокове збереження користувача
    dispatch(
      loginSuccess({
        user: {
          fullName,
          email,
          avatar: "https://i.pravatar.cc/150?u=" + email,
        },
        token: "mock-token-" + Date.now(),
      })
    );

    navigation.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.HOME_STACK,
      params: { screen: ROUTES.HOME },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle>📝 Реєстрація</SectionTitle>

      <Formik
        initialValues={{ fullName: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <>
            <TextInput
              placeholder="Повне ім’я"
              placeholderTextColor={placeholderColor}
              style={[
                styles.input,
                { color: textColor, borderColor: textColor },
              ]}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
              autoCapitalize="words"
            />
            {touched.fullName && errors.fullName && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.fullName}
              </Text>
            )}

            <TextInput
              placeholder="Email"
              placeholderTextColor={placeholderColor}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                { color: textColor, borderColor: textColor },
              ]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.email}
              </Text>
            )}

            <TextInput
              placeholder="Пароль"
              placeholderTextColor={placeholderColor}
              secureTextEntry
              style={[
                styles.input,
                { color: textColor, borderColor: textColor },
              ]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.password}
              </Text>
            )}

            <CustomButton
              title="Зареєструватись"
              onPress={handleSubmit}
              isActive={dirty && isValid}
            />

            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={[styles.link, { color: linkColor }]}>
                Вже маєш акаунт? Увійти
              </Text>
            </TouchableOpacity>
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
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    marginBottom: 10,
  },
  link: {
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
  },
});
