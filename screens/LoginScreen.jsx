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
import { useThemeColors } from "../hooks/useThemeColors";
import { useStrings } from "../hooks/useStrings";
import { loginUser } from "../services/authService";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colors = useThemeColors();
  const { strings } = useStrings();
  const t = strings.loginScreen;
  const errorColor = "#FF3B30";

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t.errors.invalidEmail)
      .required(t.errors.required),
    password: Yup.string()
      .min(4, t.errors.minPassword)
      .required(t.errors.required),
  });

  const handleLogin = async (values, { setErrors, setSubmitting }) => {
    try {
      const normalizedEmail = values.email.trim().toLowerCase();
      console.log("handleLogin - normalizedEmail:", normalizedEmail);
      console.log(
        "handleLogin - password received:",
        values.password ? "****" : "(empty)"
      );

      const user = await loginUser({
        email: normalizedEmail,
        password: values.password,
      });
      console.log("handleLogin - user found:", user);

      dispatch(
        loginSuccess({
          user: {
            fullName: user.fullName,
            email: user.email,
            avatar: "https://i.pravatar.cc/150?u=" + user.email,
          },
          token: "mock-token",
        })
      );

      navigation.navigate(ROUTES.HOME_TAB);
    } catch (error) {
      console.log("handleLogin - login error:", error.message);
      setErrors({ password: error.message });
      setSubmitting(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <SectionTitle style={{ color: colors.textColor }}>{t.title}</SectionTitle>
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
          isValid,
          dirty,
        }) => (
          <>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.cardColor,
                  borderColor: colors.borderColor,
                  color: colors.textColor,
                },
              ]}
              placeholder={t.email}
              placeholderTextColor={colors.placeholderColor}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
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
                  backgroundColor: colors.cardColor,
                  borderColor: colors.borderColor,
                  color: colors.textColor,
                },
              ]}
              placeholder={t.password}
              placeholderTextColor={colors.placeholderColor}
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

            <CustomButton
              title={t.submit}
              onPress={handleSubmit}
              isActive={dirty && isValid}
              accessibilityLabel={t.submit}
              activeBgColor={colors.primaryColor}
              activeTextColor={colors.chipActiveText}
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
