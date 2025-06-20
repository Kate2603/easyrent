import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { setBookingData } from "../redux/bookingFormSlice";
import CustomButton from "./CustomButton";
import SectionTitle from "./SectionTitle";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

const fields = [
  { key: "city", placeholder: "Місто" },
  { key: "date", placeholder: "Дата заїзду" },
  { key: "guests", placeholder: "Кількість гостей", keyboardType: "numeric" },
  { key: "name", placeholder: "Ім'я" },
  { key: "phone", placeholder: "Телефон", keyboardType: "phone-pad" },
  { key: "email", placeholder: "Email", keyboardType: "email-address" },
];

const validationSchema = Yup.object().shape({
  city: Yup.string().required("Це поле має бути заповнене"),
  date: Yup.string().required("Це поле має бути заповнене"),
  guests: Yup.string().required("Це поле має бути заповнене"),
  name: Yup.string().required("Це поле має бути заповнене"),
  phone: Yup.string().required("Це поле має бути заповнене"),
  email: Yup.string()
    .email("Невірний email")
    .required("Це поле має бути заповнене"),
});

export default function BookingForm({ onSubmit }) {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;

  const initialValues = Object.fromEntries(fields.map(({ key }) => [key, ""]));

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <SectionTitle>📝 Форма бронювання</SectionTitle>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(setBookingData(values));
            onSubmit?.(values);
          }}
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
              {fields.map(({ key, placeholder, keyboardType }) => (
                <View key={key} style={styles.inputWrapper}>
                  <TextInput
                    placeholder={placeholder}
                    keyboardType={keyboardType || "default"}
                    style={[
                      styles.input,
                      {
                        color: textColor,
                        borderColor: textColor,
                        backgroundColor:
                          theme === "light"
                            ? COLORS.lightCard
                            : COLORS.darkCard,
                      },
                      touched[key] && errors[key] && styles.inputError,
                    ]}
                    placeholderTextColor={theme === "light" ? "#999" : "#aaa"}
                    value={values[key]}
                    onChangeText={handleChange(key)}
                    onBlur={handleBlur(key)}
                  />
                  {touched[key] && errors[key] && (
                    <Text style={styles.errorText}>{errors[key]}</Text>
                  )}
                </View>
              ))}

              <CustomButton
                title="Перейти до оплати"
                onPress={handleSubmit}
                isActive
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
