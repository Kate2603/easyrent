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
import { useThemeColors } from "../hooks/useThemeColors";
import { useStrings } from "../hooks/useStrings";

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { strings } = useStrings();

  const { backgroundColor, textColor, placeholderColor, borderColor } =
    useThemeColors();

  // Локальні кольори для помилок і посилань (можна винести в COLORS)
  const errorColor = "#FF3B30";
  const linkColor = "#007AFF";

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(strings.errors.required),
    email: Yup.string()
      .email(strings.errors.invalidEmail)
      .required(strings.errors.required),
    password: Yup.string()
      .min(4, strings.minPassword)
      .required(strings.errors.required),
  });

  const handleRegister = (values) => {
    const { fullName, email } = values;

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
      <SectionTitle style={{ color: textColor }}>
        {strings.register}
      </SectionTitle>

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
              placeholder={strings.name}
              placeholderTextColor={placeholderColor}
              style={[
                styles.input,
                { color: textColor, borderColor: borderColor },
              ]}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
              autoCapitalize="words"
              accessibilityLabel={strings.name}
            />
            {touched.fullName && errors.fullName && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.fullName}
              </Text>
            )}

            <TextInput
              placeholder={strings.email}
              placeholderTextColor={placeholderColor}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                { color: textColor, borderColor: borderColor },
              ]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              accessibilityLabel={strings.email}
            />
            {touched.email && errors.email && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.email}
              </Text>
            )}

            <TextInput
              placeholder={strings.password || "Пароль"}
              placeholderTextColor={placeholderColor}
              secureTextEntry
              style={[
                styles.input,
                { color: textColor, borderColor: borderColor },
              ]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              accessibilityLabel={strings.password || "Пароль"}
            />
            {touched.password && errors.password && (
              <Text style={[styles.error, { color: errorColor }]}>
                {errors.password}
              </Text>
            )}

            <CustomButton
              title={strings.register}
              onPress={handleSubmit}
              isActive={dirty && isValid}
              accessibilityLabel={strings.register}
            />

            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={[styles.link, { color: linkColor }]}>
                {strings.login}
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
    fontSize: 13,
  },
  link: {
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
  },
});
