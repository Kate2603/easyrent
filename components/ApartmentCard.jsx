import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import SectionTitle from "./SectionTitle";
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";
import { COLORS } from "../constants/colors";
import { formatDate } from "../utils/dateUtils";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ApartmentCard = React.memo(({ apartment, onPress }) => {
  const { theme } = useTheme();
  const { strings, locale } = useStrings();
  const [expanded, setExpanded] = useState(false);

  const backgroundColor =
    theme === "light" ? COLORS.lightCard : COLORS.darkCard;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const shadowColor = "#000";

  // useCallback для стабілізації функції між рендерами
  const handleToggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
    if (onPress) onPress();
  }, [onPress]);

  const createdAtFormatted = formatDate(apartment.createdAt, locale);

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={[styles.card, { backgroundColor, shadowColor }]}
      activeOpacity={0.9}
    >
      <SectionTitle>
        {apartment.formattedAddress || strings.noAddress}
      </SectionTitle>

      <Text style={[styles.text, { color: textColor }]}>
        {strings.type}: {apartment.propertyType || strings.unknown}
      </Text>

      {expanded && apartment.yearBuilt && (
        <Text style={[styles.text, { color: textColor }]}>
          {strings.yearBuilt}: {apartment.yearBuilt}
        </Text>
      )}

      <Text style={[styles.text, { color: textColor }]}>
        {strings.publishedOn}: {createdAtFormatted}
      </Text>

      {expanded && apartment.squareFootage && (
        <Text style={[styles.text, { color: textColor }]}>
          {strings.area}: {apartment.squareFootage} {strings.sqMeters}
        </Text>
      )}
    </TouchableOpacity>
  );
});

export default ApartmentCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 16,
    marginTop: 4,
  },
});
