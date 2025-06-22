import React, { useRef } from "react";
import { View, TextInput, Text, StyleSheet, Switch } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { useStrings } from "../hooks/useStrings";
import { useThemeColors } from "../hooks/useThemeColors";

export default function PaymentForm({ onSubmit }) {
  const { strings } = useStrings();
  const { textColor, cardColor, primaryColor } = useThemeColors();

  const cvvRef = useRef(null);

  // Маскування номеру карти: додаємо пробіли кожні 4 цифри
  const formatCardNumber = (text) => {
    return text
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  // Маскування терміну дії: формат MM/YY
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
          <Text style={[styles.label, { color: textColor }]}>
            {strings.cardNumber}
          </Text>
          <TextInput
            value={formatCardNumber(values.cardNumber)}
            onChangeText={(text) => {
              // Зберігаємо лише цифри без пробілів
              setFieldValue("cardNumber", text.replace(/\D/g, ""));
            }}
            onBlur={handleBlur("cardNumber")}
            style={[
              styles.input,
              {
                borderColor: cardColor,
                backgroundColor: cardColor,
                color: textColor,
              },
            ]}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor={primaryColor}
            keyboardType="numeric"
            maxLength={19} // 16 цифр + 3 пробіли
          />
          {touched.cardNumber && errors.cardNumber && (
            <Text style={[styles.error, { color: "red" }]}>
              {errors.cardNumber}
            </Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
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
              },
            ]}
            placeholder="MM/YY"
            placeholderTextColor={primaryColor}
            keyboardType="numeric"
            maxLength={5}
          />
          {touched.expiry && errors.expiry && (
            <Text style={[styles.error, { color: "red" }]}>
              {errors.expiry}
            </Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
            {strings.cvv}
          </Text>
          <TextInput
            ref={cvvRef}
            value={values.cvv}
            onChangeText={(text) => {
              // Відфільтровуємо лише цифри, максимум 3
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
              },
            ]}
            placeholder="***"
            placeholderTextColor={primaryColor}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
          />
          {touched.cvv && errors.cvv && (
            <Text style={[styles.error, { color: "red" }]}>{errors.cvv}</Text>
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
