import React, { useRef } from "react";
import { View, TextInput, Text, StyleSheet, Switch } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInputMask } from "react-native-masked-text";
import CustomButton from "./CustomButton";
import { useStrings } from "../hooks/useStrings";
import { useThemeColors } from "../hooks/useThemeColors";

export default function PaymentForm({ onSubmit }) {
  const { strings } = useStrings();
  const {
    textColor,
    cardColor,
    primaryColor,
    // можна додати інші, якщо потрібно
  } = useThemeColors();

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
                borderColor: cardColor,
                backgroundColor: cardColor,
                color: textColor,
              },
            ]}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor={primaryColor}
            keyboardType="numeric"
          />
          {touched.cardNumber && errors.cardNumber && (
            <Text style={[styles.error, { color: "red" }]}>
              {errors.cardNumber}
            </Text>
          )}

          <Text style={[styles.label, { color: textColor }]}>
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
                borderColor: cardColor,
                backgroundColor: cardColor,
                color: textColor,
              },
            ]}
            placeholder="MM/YY"
            placeholderTextColor={primaryColor}
            keyboardType="numeric"
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
            onChangeText={handleChange("cvv")}
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
