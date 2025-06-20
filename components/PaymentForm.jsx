import React from "react";
import { View, TextInput, Text, StyleSheet, Switch } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Має бути 16 цифр")
    .required("Це поле має бути заповнене"),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Формат MM/YY")
    .required("Це поле має бути заповнене"),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "Має бути 3 цифри")
    .required("Це поле має бути заповнене"),
});

const PaymentForm = ({ onSubmit }) => {
  const { theme } = useTheme();

  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const borderColor = theme === "light" ? "#ccc" : "#555";
  const placeholderColor = theme === "light" ? "#999" : "#aaa";
  const inputBackground =
    theme === "light" ? COLORS.lightBackground : COLORS.darkCard;
  const switchThumbColor =
    theme === "light" ? COLORS.primaryLight : COLORS.primaryDark;
  const switchTrackColor =
    theme === "light"
      ? { true: "#cce0ff", false: "#ddd" }
      : { true: "#335577", false: "#555" };
  const errorColor = theme === "light" ? "red" : "#ff6b6b";

  return (
    <Formik
      initialValues={{
        cardNumber: "",
        expiry: "",
        cvv: "",
        securePayment: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (onSubmit) onSubmit(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <Text style={[styles.label, { color: textColor }]}>Номер картки</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor,
                color: textColor,
                backgroundColor: inputBackground,
              },
            ]}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor={placeholderColor}
            keyboardType="numeric"
            value={values.cardNumber}
            onChangeText={handleChange("cardNumber")}
            onBlur={handleBlur("cardNumber")}
          />
          {touched.cardNumber && errors.cardNumber && (
            <Text style={[styles.error, { color: errorColor }]}>
              {errors.cardNumber}
            </Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            Термін дії (MM/YY)
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor,
                color: textColor,
                backgroundColor: inputBackground,
              },
            ]}
            placeholder="MM/YY"
            placeholderTextColor={placeholderColor}
            value={values.expiry}
            onChangeText={handleChange("expiry")}
            onBlur={handleBlur("expiry")}
          />
          {touched.expiry && errors.expiry && (
            <Text style={[styles.error, { color: errorColor }]}>
              {errors.expiry}
            </Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>CVV</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor,
                color: textColor,
                backgroundColor: inputBackground,
              },
            ]}
            placeholder="***"
            placeholderTextColor={placeholderColor}
            keyboardType="numeric"
            secureTextEntry
            value={values.cvv}
            onChangeText={handleChange("cvv")}
            onBlur={handleBlur("cvv")}
          />
          {touched.cvv && errors.cvv && (
            <Text style={[styles.error, { color: errorColor }]}>
              {errors.cvv}
            </Text>
          )}

          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: textColor }]}>
              Безпечна оплата
            </Text>
            <Switch
              value={values.securePayment}
              onValueChange={(value) => setFieldValue("securePayment", value)}
              thumbColor={values.securePayment ? switchThumbColor : "#ccc"}
              trackColor={switchTrackColor}
            />
          </View>

          <CustomButton title="Оплатити" onPress={handleSubmit} isActive />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingVertical: 24,
    gap: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PaymentForm;
