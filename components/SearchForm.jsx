import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SectionTitle from "./SectionTitle";
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";

export default function SearchForm({
  initialCity = "",
  initialAddressLine1 = "",
  initialPropertyType = "",
  onSubmit,
}) {
  const [city, setCity] = useState(initialCity);
  const [addressLine1, setAddressLine1] = useState(initialAddressLine1);
  const [propertyType, setPropertyType] = useState(initialPropertyType);

  const { theme } = useTheme();
  const strings = useStrings();

  const textColor = theme === "light" ? "#222" : "#eee";
  const borderColor = theme === "light" ? "#ccc" : "#555";
  const placeholderColor = theme === "light" ? "#999" : "#aaa";
  const backgroundColor = theme === "light" ? "#fff" : "#222";

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ city, addressLine1, propertyType });
    }
  };

  return (
    <View>
      <SectionTitle>{strings.searchParameters}</SectionTitle>

      <TextInput
        style={[
          styles.input,
          { borderColor, color: textColor, backgroundColor },
        ]}
        placeholder={strings.city}
        placeholderTextColor={placeholderColor}
        value={city}
        onChangeText={setCity}
        onEndEditing={handleSubmit}
        accessibilityLabel={strings.city}
      />

      <TextInput
        style={[
          styles.input,
          { borderColor, color: textColor, backgroundColor },
        ]}
        placeholder={strings.propertyType}
        placeholderTextColor={placeholderColor}
        value={propertyType}
        onChangeText={setPropertyType}
        onEndEditing={handleSubmit}
        accessibilityLabel={strings.propertyType}
      />

      <TextInput
        style={[
          styles.input,
          { borderColor, color: textColor, backgroundColor },
        ]}
        placeholder={strings.address}
        placeholderTextColor={placeholderColor}
        value={addressLine1}
        onChangeText={setAddressLine1}
        onEndEditing={handleSubmit}
        accessibilityLabel={strings.address}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
