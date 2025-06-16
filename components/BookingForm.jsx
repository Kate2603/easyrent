import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";

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
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(form);
  };

  return (
    <View style={styles.container}>
      <SectionTitle>📝 Форма бронювання</SectionTitle>

      {[
        { key: "city", placeholder: "Місто" },
        { key: "date", placeholder: "Дата заїзду" },
        {
          key: "guests",
          placeholder: "Кількість гостей",
          keyboardType: "numeric",
        },
        { key: "name", placeholder: "Ім'я" },
        { key: "phone", placeholder: "Телефон", keyboardType: "phone-pad" },
        { key: "email", placeholder: "Email", keyboardType: "email-address" },
      ].map(({ key, placeholder, keyboardType }) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={placeholder}
          value={form[key]}
          keyboardType={keyboardType || "default"}
          onChangeText={(text) => handleChange(key, text)}
        />
      ))}

      <CustomButton title="Перейти до оплати" onPress={handleSubmit} isActive />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 12,
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default BookingForm;
