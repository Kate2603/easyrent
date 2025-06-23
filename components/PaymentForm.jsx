import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
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
          {/* Номер картки */}
          <Text style={[styles.label, { color: textColor }]}>
            {strings.cardNumber}
          </Text>
          <TextInput
            value={formatCardNumber(values.cardNumber)}
            onChangeText={(text) =>
              setFieldValue("cardNumber", text.replace(/\D/g, ""))
            }
            onBlur={handleBlur("cardNumber")}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor={primaryColor}
            keyboardType="number-pad"
            maxLength={19}
            style={[
              styles.input,
              {
                backgroundColor: cardColor,
                color: textColor,
                borderColor:
                  touched.cardNumber && errors.cardNumber
                    ? warningText
                    : cardColor,
              },
            ]}
          />
          {touched.cardNumber && errors.cardNumber && (
            <Text style={[styles.error, { color: warningText }]}>
              {errors.cardNumber}
            </Text>
          )}

          {/* Expiry */}
          <Text style={[styles.label, { color: textColor }]}>
            {strings.expiry}
          </Text>
          <TextInput
            value={formatExpiry(values.expiry)}
            onChangeText={(text) => {
              const formatted = formatExpiry(text);
              setFieldValue("expiry", formatted);
              if (formatted.length === 5 && cvvRef.current)
                cvvRef.current.focus();
            }}
            onBlur={handleBlur("expiry")}
            placeholder="MM/YY"
            placeholderTextColor={primaryColor}
            keyboardType="number-pad"
            maxLength={5}
            style={[
              styles.input,
              {
                backgroundColor: cardColor,
                color: textColor,
                borderColor:
                  touched.expiry && errors.expiry ? warningText : cardColor,
              },
            ]}
          />
          {touched.expiry && errors.expiry && (
            <Text style={[styles.error, { color: warningText }]}>
              {errors.expiry}
            </Text>
          )}

          {/* CVV */}
          <Text style={[styles.label, { color: textColor }]}>
            {strings.cvv}
          </Text>
          <TextInput
            ref={cvvRef}
            value={values.cvv}
            onChangeText={(text) =>
              setFieldValue("cvv", text.replace(/\D/g, "").slice(0, 3))
            }
            onBlur={handleBlur("cvv")}
            placeholder="***"
            placeholderTextColor={primaryColor}
            keyboardType="number-pad"
            maxLength={3}
            secureTextEntry
            style={[
              styles.input,
              {
                backgroundColor: cardColor,
                color: textColor,
                borderColor:
                  touched.cvv && errors.cvv ? warningText : cardColor,
              },
            ]}
          />
          {touched.cvv && errors.cvv && (
            <Text style={[styles.error, { color: warningText }]}>
              {errors.cvv}
            </Text>
          )}

          {/* Switch */}
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

          {/* Submit */}
          <CustomButton title={strings.pay} onPress={handleSubmit} isActive />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 30 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 14,
  },
  error: {
    fontSize: 12,
    marginBottom: 14,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: { fontSize: 16, fontWeight: "500" },
});
