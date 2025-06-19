import React from "react";
import { View, TextInput, Text, StyleSheet, Switch } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";

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
          <Text style={styles.label}>Номер картки</Text>
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            value={values.cardNumber}
            onChangeText={handleChange("cardNumber")}
            onBlur={handleBlur("cardNumber")}
          />
          {touched.cardNumber && errors.cardNumber && (
            <Text style={styles.error}>{errors.cardNumber}</Text>
          )}

          <Text style={styles.label}>Термін дії (MM/YY)</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={values.expiry}
            onChangeText={handleChange("expiry")}
            onBlur={handleBlur("expiry")}
          />
          {touched.expiry && errors.expiry && (
            <Text style={styles.error}>{errors.expiry}</Text>
          )}

          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="***"
            keyboardType="numeric"
            secureTextEntry
            value={values.cvv}
            onChangeText={handleChange("cvv")}
            onBlur={handleBlur("cvv")}
          />
          {touched.cvv && errors.cvv && (
            <Text style={styles.error}>{errors.cvv}</Text>
          )}

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Безпечна оплата</Text>
            <Switch
              value={values.securePayment}
              onValueChange={(value) => setFieldValue("securePayment", value)}
              thumbColor={values.securePayment ? "#006FFD" : "#ccc"}
              trackColor={{ true: "#cce0ff", false: "#ddd" }}
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
    marginHorizontal: 16,
    paddingVertical: 24,
    gap: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
    color: "#222",
  },
  error: {
    fontSize: 12,
    color: "red",
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
    color: "#333",
    fontWeight: "500",
  },
});

export default PaymentForm;
