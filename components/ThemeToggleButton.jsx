import { useTheme } from "../contexts/ThemeContext";
import { Button } from "react-native";

export default function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();
  return <Button title={`Тема: ${theme}`} onPress={toggleTheme} />;
}
