import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  Switch,
} from "react-native";

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
      <TextInput
        style={styles.input}
        placeholder="Номер картки"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Термін дії (MM/YY)"
        value={expiry}
        onChangeText={setExpiry}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Безпечна оплата</Text>
        <Switch value={securePayment} onValueChange={setSecurePayment} />
      </View>
      <Button title="Оплатити" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 12,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default PaymentForm;
