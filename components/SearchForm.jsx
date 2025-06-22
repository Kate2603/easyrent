import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SectionTitle from "./SectionTitle";
import { useThemeColors } from "../hooks/useThemeColors";
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

  const { backgroundColor, textColor, cardColor } = useThemeColors();
  const strings = useStrings();

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
          {
            borderColor: cardColor,
            color: textColor,
            backgroundColor: cardColor,
          },
        ]}
        placeholder={strings.city}
        placeholderTextColor={textColor + "88"} // напівпрозорий текст
        value={city}
        onChangeText={setCity}
        onEndEditing={handleSubmit}
        accessibilityLabel={strings.city}
      />

      <TextInput
        style={[
          styles.input,
          {
            borderColor: cardColor,
            color: textColor,
            backgroundColor: cardColor,
          },
        ]}
        placeholder={strings.propertyType}
        placeholderTextColor={textColor + "88"}
        value={propertyType}
        onChangeText={setPropertyType}
        onEndEditing={handleSubmit}
        accessibilityLabel={strings.propertyType}
      />

      <TextInput
        style={[
          styles.input,
          {
            borderColor: cardColor,
            color: textColor,
            backgroundColor: cardColor,
          },
        ]}
        placeholder={strings.address}
        placeholderTextColor={textColor + "88"}
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
