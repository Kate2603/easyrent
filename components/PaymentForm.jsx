import React, { useRef } from "react";
import { View, TextInput, Text, StyleSheet, Switch } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { useStrings } from "../hooks/useStrings";
import { useThemeColors } from "../hooks/useThemeColors";

export default function PaymentForm({ onSubmit }) {
  const { strings } = useStrings();
  const { textColor, cardColor, primaryColor, warningText } = useThemeColors();

  const cvvRef = useRef(null);

  const formatCardNumber = (text) =>
    text
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 2) return cleaned;
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
  };

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
          <Text style={[styles.label, { color: textColor, marginBottom: 4 }]}>
            {strings.cardNumber}
          </Text>
          <TextInput
            value={formatCardNumber(values.cardNumber)}
            onChangeText={(text) =>
              setFieldValue("cardNumber", text.replace(/\D/g, ""))
            }
            onBlur={handleBlur("cardNumber")}
            style={[
              styles.input,
              {
                borderColor: cardColor,
                backgroundColor: cardColor,
                color: textColor,
                marginBottom: touched.cardNumber && errors.cardNumber ? 0 : 14,
              },
            ]}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor={primaryColor}
            keyboardType="number-pad"
            maxLength={19}
          />
          {touched.cardNumber && errors.cardNumber && (
            <Text
              style={[styles.error, { color: warningText, marginBottom: 14 }]}
            >
              {errors.cardNumber}
            </Text>
          )}

          <Text style={[styles.label, { color: textColor, marginBottom: 4 }]}>
            {strings.expiry}
          </Text>
          <TextInput
            value={formatExpiry(values.expiry)}
            onChangeText={(text) => {
              const formatted = formatExpiry(text);
              setFieldValue("expiry", formatted);
              if (formatted.length === 5 && cvvRef.current) {
                cvvRef.current.focus();
              }
            }}
            onBlur={handleBlur("expiry")}
            style={[
              styles.input,
              {
                borderColor: cardColor,
                backgroundColor: cardColor,
                color: textColor,
                marginBottom: touched.expiry && errors.expiry ? 0 : 14,
              },
            ]}
            placeholder="MM/YY"
            placeholderTextColor={primaryColor}
            keyboardType="number-pad"
            maxLength={5}
          />
          {touched.expiry && errors.expiry && (
            <Text
              style={[styles.error, { color: warningText, marginBottom: 14 }]}
            >
              {errors.expiry}
            </Text>
          )}

          <Text style={[styles.label, { color: textColor, marginBottom: 4 }]}>
            {strings.cvv}
          </Text>
          <TextInput
            ref={cvvRef}
            value={values.cvv}
            onChangeText={(text) => {
              const clean = text.replace(/\D/g, "").slice(0, 3);
              setFieldValue("cvv", clean);
            }}
            onBlur={handleBlur("cvv")}
            style={[
              styles.input,
              {
                borderColor: cardColor,
                backgroundColor: cardColor,
                color: textColor,
                marginBottom: touched.cvv && errors.cvv ? 0 : 14,
              },
            ]}
            placeholder="***"
            placeholderTextColor={primaryColor}
            keyboardType="number-pad"
            maxLength={3}
            secureTextEntry
          />
          {touched.cvv && errors.cvv && (
            <Text
              style={[styles.error, { color: warningText, marginBottom: 14 }]}
            >
              {errors.cvv}
            </Text>
          )}

          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: textColor }]}>
              {strings.securePayment}
            </Text>
            <Switch
              value={values.securePayment}
              onValueChange={(val) => setFieldValue("securePayment", val)}
              thumbColor={values.securePayment ? primaryColor : cardColor}
              trackColor={{ true: cardColor, false: cardColor }}
            />
          </View>

          <CustomButton title={strings.pay} onPress={handleSubmit} isActive />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: { fontSize: 14, fontWeight: "600" },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  error: { fontSize: 12 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: { fontSize: 16, fontWeight: "500" },
});
