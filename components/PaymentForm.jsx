import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Switch } from "react-native";
import CustomButton from "./CustomButton";

const PaymentForm = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [securePayment, setSecurePayment] = useState(false);

  const handlePayment = () => {
    if (onSubmit) {
      onSubmit({ cardNumber, expiry, cvv, securePayment });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Номер картки</Text>
      <TextInput
        style={styles.input}
        placeholder="0000 0000 0000 0000"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <Text style={styles.label}>Термін дії (MM/YY)</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/YY"
        value={expiry}
        onChangeText={setExpiry}
      />

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        placeholder="***"
        keyboardType="numeric"
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Безпечна оплата</Text>
        <Switch
          value={securePayment}
          onValueChange={setSecurePayment}
          thumbColor={securePayment ? "#006FFD" : "#ccc"}
          trackColor={{ true: "#cce0ff", false: "#ddd" }}
        />
      </View>

      <CustomButton title="Оплатити" onPress={handlePayment} />
    </View>
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
