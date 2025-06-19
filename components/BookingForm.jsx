import React from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { setBookingData } from "../redux/bookingFormSlice";
import CustomButton from "./CustomButton";
import SectionTitle from "./SectionTitle";

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

  const initialValues = Object.fromEntries(fields.map(({ key }) => [key, ""]));

  return (
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
        <View style={styles.container}>
          <SectionTitle>📝 Форма бронювання</SectionTitle>

          <FlatList
            data={fields}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder={item.placeholder}
                  keyboardType={item.keyboardType || "default"}
                  style={[
                    styles.input,
                    touched[item.key] && errors[item.key] && styles.inputError,
                  ]}
                  value={values[item.key]}
                  onChangeText={handleChange(item.key)}
                  onBlur={handleBlur(item.key)}
                />
                {touched[item.key] && errors[item.key] && (
                  <Text style={styles.errorText}>{errors[item.key]}</Text>
                )}
              </View>
            )}
          />

          <CustomButton
            title="Перейти до оплати"
            onPress={handleSubmit}
            isActive
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 12,
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
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
