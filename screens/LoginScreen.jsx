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
import { useStrings } from "../hooks/useStrings";
import { COLORS } from "../constants/colors";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { strings } = useStrings();
  const t = strings.loginScreen;

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const inputBgColor = theme === "light" ? "#fff" : "#222";
  const borderColor = theme === "light" ? "#ccc" : "#555";
  const placeholderColor = theme === "light" ? "#999" : "#aaa";
  const errorColor = "#FF3B30";

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t.errors.invalidEmail)
      .required(t.errors.required),
    password: Yup.string()
      .min(4, t.errors.minPassword)
      .required(t.errors.required),
  });

  const handleLogin = (values) => {
    const { email } = values;

    dispatch(
      loginSuccess({
        user: {
          fullName: strings.unknownUser,
          email,
          avatar: "https://i.pravatar.cc/150?u=" + email,
        },
        token: "mock-token",
      })
    );

    navigation.navigate(ROUTES.HOME_TAB);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle style={{ color: textColor }}>{t.title}</SectionTitle>

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
              placeholder={t.email}
              placeholderTextColor={placeholderColor}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
              accessibilityLabel={t.email}
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
              placeholder={t.password}
              placeholderTextColor={placeholderColor}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              returnKeyType="done"
              autoComplete="password"
              onSubmitEditing={() => handleSubmit()}
              accessibilityLabel={t.password}
            />
            {touched.password && errors.password && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.password}
              </Text>
            )}

            <CustomButton
              title={t.submit}
              onPress={handleSubmit}
              isActive
              accessibilityLabel={t.submit}
            />
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
    fontSize: 16,
  },
  error: {
    marginBottom: 10,
    fontSize: 13,
  },
});
