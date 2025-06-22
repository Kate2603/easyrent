import React, { useRef } from "react";
import { View, TextInput, Text, StyleSheet, Switch } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInputMask } from "react-native-masked-text";
import CustomButton from "./CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";

export default function PaymentForm({ onSubmit }) {
  const { theme } = useTheme();
  const { strings } = useStrings();

  const cvvRef = useRef(null);

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, strings.errors.cardNumberLength)
      .required(strings.errors.required),
    expiry: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, strings.errors.expiryFormat)
      .required(strings.errors.required),
    cvv: Yup.string()
      .matches(/^\d{3}$/, strings.errors.cvvLength)
      .required(strings.errors.required),
  });

  const colors = {
    text: theme === "light" ? "#222" : "#eee",
    border: theme === "light" ? "#ccc" : "#555",
    placeholder: theme === "light" ? "#999" : "#aaa",
    inputBg: theme === "light" ? "#fff" : "#222",
    error: theme === "light" ? "red" : "#ff6b6b",
    thumb: theme === "light" ? "#006FFD" : "#66AAFF",
    track:
      theme === "light"
        ? { true: "#cce0ff", false: "#ddd" }
        : { true: "#335577", false: "#555" },
  };

  return (
    <Formik
      initialValues={{
        cardNumber: "",
        expiry: "",
        cvv: "",
        securePayment: false,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
          {/* Card Number */}
          <Text style={[styles.label, { color: colors.text }]}>
            {strings.cardNumber}
          </Text>
          <TextInputMask
            type={"credit-card"}
            value={values.cardNumber}
            onChangeText={(text) =>
              setFieldValue("cardNumber", text.replace(/\s/g, ""))
            }
            onBlur={handleBlur("cardNumber")}
            style={[
              styles.input,
              {
                borderColor: colors.border,
                backgroundColor: colors.inputBg,
                color: colors.text,
              },
            ]}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor={colors.placeholder}
            keyboardType="numeric"
          />
          {touched.cardNumber && errors.cardNumber && (
            <Text style={[styles.error, { color: colors.error }]}>
              {errors.cardNumber}
            </Text>
          )}

          {/* Expiry */}
          <Text style={[styles.label, { color: colors.text }]}>
            {strings.expiry}
          </Text>
          <TextInputMask
            type="custom"
            options={{ mask: "99/99" }}
            value={values.expiry}
            onChangeText={(text) => {
              setFieldValue("expiry", text);
              if (text.length === 5 && cvvRef.current) {
                cvvRef.current.focus();
              }
            }}
            onBlur={handleBlur("expiry")}
            style={[
              styles.input,
              {
                borderColor: colors.border,
                backgroundColor: colors.inputBg,
                color: colors.text,
              },
            ]}
            placeholder="MM/YY"
            placeholderTextColor={colors.placeholder}
            keyboardType="numeric"
          />
          {touched.expiry && errors.expiry && (
            <Text style={[styles.error, { color: colors.error }]}>
              {errors.expiry}
            </Text>
          )}

          {/* CVV */}
          <Text style={[styles.label, { color: colors.text }]}>
            {strings.cvv}
          </Text>
          <TextInput
            ref={cvvRef}
            value={values.cvv}
            onChangeText={handleChange("cvv")}
            onBlur={handleBlur("cvv")}
            style={[
              styles.input,
              {
                borderColor: colors.border,
                backgroundColor: colors.inputBg,
                color: colors.text,
              },
            ]}
            placeholder="***"
            placeholderTextColor={colors.placeholder}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
          />
          {touched.cvv && errors.cvv && (
            <Text style={[styles.error, { color: colors.error }]}>
              {errors.cvv}
            </Text>
          )}

          {/* Switch */}
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>
              {strings.securePayment}
            </Text>
            <Switch
              value={values.securePayment}
              onValueChange={(val) => setFieldValue("securePayment", val)}
              thumbColor={
                values.securePayment ? colors.thumb : colors.placeholder
              }
              trackColor={colors.track}
            />
          </View>

          {/* Submit */}
          <CustomButton title={strings.pay} onPress={handleSubmit} isActive />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 14 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  error: { fontSize: 12, marginTop: -8, marginBottom: 8 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: { fontSize: 16, fontWeight: "500" },
});
