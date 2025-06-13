import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

const BookingForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    city: "",
    date: "",
    guests: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(form);
  };

  return (
    <View style={styles.container}>
      {["city", "date", "guests", "name", "phone", "email"].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={
            field === "city"
              ? "Місто"
              : field === "date"
              ? "Дата"
              : field === "guests"
              ? "Кількість гостей"
              : field === "name"
              ? "Ім'я"
              : field === "phone"
              ? "Телефон"
              : "Email"
          }
          keyboardType={
            field === "guests" || field === "phone" ? "numeric" : "default"
          }
          value={form[field]}
          onChangeText={(text) => handleChange(field, text)}
        />
      ))}
      <Button title="Забронювати" onPress={handleSubmit} />
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
});

export default BookingForm;
