import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/ROUTES";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;

  const handleRegister = () => {
    if (!fullName || !email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля");
      return;
    }

    // Мокове збереження користувача
    dispatch(
      loginSuccess({
        user: {
          fullName,
          email,
          avatar: "https://i.pravatar.cc/150?u=" + email,
        },
        token: "mock-token-" + Date.now(),
      })
    );

    navigation.navigate(ROUTES.HOME_STACK);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle>📝 Реєстрація</SectionTitle>

      <TextInput
        placeholder="Повне ім’я"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="#999"
        style={[styles.input, { color: textColor, borderColor: textColor }]}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, { color: textColor, borderColor: textColor }]}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
        secureTextEntry
        style={[styles.input, { color: textColor, borderColor: textColor }]}
      />

      <CustomButton title="Зареєструватись" onPress={handleRegister} isActive />

      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.HOME)}>
        <Text style={[styles.link, { color: textColor }]}>
          Вже маєш акаунт? Увійти
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline",
  },
});
