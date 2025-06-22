import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "REGISTERED_USERS";

// Функція реєстрації користувача
export const registerUser = async ({ fullName, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUsersRaw = await AsyncStorage.getItem(USERS_KEY);
  const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

  if (existingUsers.some((u) => u.email === normalizedEmail)) {
    throw new Error("Користувач з таким email вже існує");
  }

  const newUser = { fullName, email: normalizedEmail, password };
  const updatedUsers = [...existingUsers, newUser];

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  // Повертаємо нового користувача, без диспатчу
  return newUser;
};

// Функція логіну користувача
export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUsersRaw = await AsyncStorage.getItem(USERS_KEY);
  const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

  const user = existingUsers.find(
    (u) => u.email === normalizedEmail && u.password === password
  );

  if (!user) {
    throw new Error("Невірний email або пароль");
  }

  // Повертаємо знайденого користувача, без диспатчу
  return user;
};
