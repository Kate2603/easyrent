import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { updateProfile } from "../redux/userSlice";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { user } = useSelector((state) => state.user);

  const [submitting, setSubmitting] = useState(false);

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;
  const inputBackground =
    theme === "light" ? COLORS.lightCard : COLORS.darkCard;
  const placeholderColor = theme === "light" ? "#888" : "#aaa";
  const borderColor = theme === "light" ? "#ccc" : "#555";
  const avatarBorderColor =
    theme === "light" ? COLORS.lightAvatarBorder : COLORS.darkAvatarBorder;

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Ім’я обов’язкове"),
    avatar: Yup.string()
      .url("Недійсний URL зображення")
      .required("Посилання на аватар обов’язкове"),
  });

  const handleSave = async (values) => {
    try {
      setSubmitting(true);
      dispatch(updateProfile(values));
      Alert.alert("Успіх", "Профіль оновлено!");
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося оновити профіль");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionTitle>Редагування профілю</SectionTitle>

        <Formik
          initialValues={{
            fullName: user?.fullName || "",
            avatar: user?.avatar || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: values.avatar }}
                  style={[styles.avatar, { borderColor: avatarBorderColor }]}
                />
              </View>

              <View style={styles.field}>
                <TextInput
                  placeholder="Ім’я"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  style={[
                    styles.input,
                    {
                      color: textColor,
                      backgroundColor: inputBackground,
                      borderColor,
                    },
                  ]}
                  placeholderTextColor={placeholderColor}
                  accessibilityLabel="Full name"
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.error}>{errors.fullName}</Text>
                )}
              </View>

              <View style={styles.field}>
                <TextInput
                  placeholder="Посилання на аватар"
                  value={values.avatar}
                  onChangeText={handleChange("avatar")}
                  onBlur={handleBlur("avatar")}
                  style={[
                    styles.input,
                    {
                      color: textColor,
                      backgroundColor: inputBackground,
                      borderColor,
                    },
                  ]}
                  placeholderTextColor={placeholderColor}
                  accessibilityLabel="Avatar URL"
                />
                {touched.avatar && errors.avatar && (
                  <Text style={styles.error}>{errors.avatar}</Text>
                )}
              </View>

              <CustomButton
                title="Зберегти зміни"
                onPress={handleSubmit}
                isActive
                disabled={submitting}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
  },
  field: {
    marginBottom: 16,
  },
  input: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
