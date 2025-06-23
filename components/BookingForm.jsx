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
import { useStrings } from "../hooks/useStrings";
import { useThemeColors } from "../hooks/useThemeColors";

const fields = [
  { key: "city", placeholderKey: "city" },
  { key: "date", placeholderKey: "date" },
  { key: "guests", placeholderKey: "guests", keyboardType: "numeric" },
  { key: "name", placeholderKey: "name" },
  { key: "phone", placeholderKey: "phone", keyboardType: "phone-pad" },
  { key: "email", placeholderKey: "email", keyboardType: "email-address" },
];

export default function BookingForm({ onSubmit }) {
  const dispatch = useDispatch();
  const { strings } = useStrings();

  const {
    backgroundColor,
    cardColor,
    textColor,
    placeholderColor,
    primaryColor,
  } = useThemeColors();

  const validationSchema = Yup.object().shape({
    city: Yup.string().required(strings.errors.required),
    date: Yup.string().required(strings.errors.required),
    guests: Yup.number()
      .typeError(strings.errors.required)
      .required(strings.errors.required),
    name: Yup.string().required(strings.errors.required),
    phone: Yup.string().required(strings.errors.required),
    email: Yup.string()
      .email(strings.errors.invalidEmail)
      .required(strings.errors.required),
  });

  const initialValues = Object.fromEntries(fields.map(({ key }) => [key, ""]));

  const handleSubmit = (values) => {
    dispatch(setBookingData(values));
    if (typeof onSubmit === "function") {
      onSubmit(values);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionTitle accessibilityRole="header" style={{ color: textColor }}>
          {strings.formTitle}
        </SectionTitle>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
              {fields.map(({ key, placeholderKey, keyboardType }) => (
                <View key={key} style={styles.inputWrapper}>
                  <TextInput
                    placeholder={strings[placeholderKey]}
                    placeholderTextColor={placeholderColor}
                    keyboardType={keyboardType || "default"}
                    returnKeyType="done"
                    value={values[key]}
                    onChangeText={handleChange(key)}
                    onBlur={handleBlur(key)}
                    style={[
                      styles.input,
                      {
                        color: textColor,
                        borderColor:
                          touched[key] && errors[key]
                            ? "red"
                            : placeholderColor,
                        backgroundColor: cardColor,
                      },
                    ]}
                    accessibilityLabel={strings[placeholderKey]}
                    selectionColor={primaryColor}
                  />
                  {touched[key] && errors[key] && (
                    <Text style={styles.errorText}>{errors[key]}</Text>
                  )}
                </View>
              ))}

              <CustomButton
                title={strings.submit}
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
  scroll: {
    padding: 16,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
