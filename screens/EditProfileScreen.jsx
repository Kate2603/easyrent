import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";
import CustomButton from "../components/CustomButton";
import SectionTitle from "../components/SectionTitle";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { COLORS } from "../constants/colors";

export default function EditProfileScreen() {
  const { user } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user.fullName || "");
  const [avatarUri, setAvatarUri] = useState(user.avatar || "");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const backgroundColor =
    theme === "light" ? COLORS.lightBackground : COLORS.darkBackground;
  const textColor = theme === "light" ? COLORS.lightText : COLORS.darkText;

  const pickImage = async () => {
    // Запит дозволу
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Помилка", "Потрібен дозвіл на доступ до галереї");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      // Зберігаємо локальну копію аватара
      const localUri = result.assets[0].uri;
      const fileName = localUri.split("/").pop();
      const newPath = FileSystem.documentDirectory + fileName;

      try {
        await FileSystem.copyAsync({
          from: localUri,
          to: newPath,
        });
        setAvatarUri(newPath);
      } catch (error) {
        Alert.alert("Помилка", "Не вдалося зберегти фото локально");
        setAvatarUri(localUri); // Якщо копіювання не вийшло, використовуємо оригінал
      }
    }
  };

  const saveProfileToStorage = async (profile) => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
    } catch (error) {
      console.error("Помилка збереження профілю в AsyncStorage:", error);
    }
  };

  const handleSave = () => {
    if (!fullName || !avatarUri) {
      Alert.alert("Помилка", "Усі поля обов’язкові");
      return;
    }

    const updatedUser = { fullName, avatar: avatarUri };

    dispatch(updateUser(updatedUser));
    saveProfileToStorage(updatedUser);

    Alert.alert("Успіх", "Профіль оновлено");
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SectionTitle>✏️ Редагування профілю</SectionTitle>

      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { borderColor: textColor }]}>
            <Text style={{ color: textColor }}>Обрати фото</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Ім’я"
        placeholderTextColor="#888"
        style={[styles.input, { color: textColor, borderColor: textColor }]}
      />

      <CustomButton title="Зберегти" onPress={handleSave} isActive />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    width: "100%",
  },
});
