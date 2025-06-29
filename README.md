# EasyRent

EasyRent — мобільний застосунок для оренди квартир, реалізований з використанням **React Native + React Navigation**. У цьому завданні реалізовано повноцінну **навігаційну систему** з підтримкою:

- **Stack Navigation** — для переходів між екранами.
- **Tab Navigation** — для основних розділів.
- **Drawer Navigation** — для додаткових функцій.

## 📂 Структура навігації

RootNavigator (Stack)
├── TabNavigator (Tab)
│ ├── LandingScreen
│ ├── ApartmentsListScreen
│ ├── SearchScreen
│ └── ProfileScreen
├── DetailsScreen (apartmentId)
├── BookingFormScreen
├── PaymentScreen
├── SuccessScreen
└── DrawerNavigator (Drawer)
├── SettingsScreen
├── HelpScreen
└── AboutScreen

## 🛠️ Технології

- **React Native**
- **React Navigation v6**
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `@react-navigation/drawer`
- `expo`
- `@expo/vector-icons`

## 🔄 Передача параметрів

Передача apartmentId між екранами:

navigation.navigate('DetailsScreen', { apartmentId: item.id });
Обробка параметра:

const { apartmentId } = route.params;

💅 Стилізація
Власний компонент Header.js з назвою екрану та кнопкою "Назад".

Вкладки мають іконки з @expo/vector-icons.

Drawer-меню має стилізацію

## API у EasyRent

Застосунок EasyRent взаємодіє з бекендом через REST API для:

Отримання списку квартир

Фільтрації квартир за параметрами (місто, ціна, тип, тощо)

Деталізації конкретної квартири за apartmentId

Створення бронювання

Оплати оренди

Управління профілем користувача

Основні ендпоінти
Метод URL Опис Параметри
GET /apartments Повертає список квартир query params: city, page, filters
GET /apartments/{apartmentId} Повертає деталі конкретної квартири apartmentId у шляху
POST /bookings Створення бронювання дані бронювання в тілі запиту
POST /payments Оплата бронювання дані платежу в тілі запиту
GET /user/profile Отримання даних профілю користувача —
PUT /user/profile Оновлення даних профілю нові дані профілю

Приклад запиту на отримання квартир (з Axios)

import axios from 'axios';

const API_BASE_URL = 'https://api.easyrent.example.com';

export const fetchApartments = async (filters, page) => {
const params = {
city: filters.city,
page,
// додаткові параметри фільтрації
};
const response = await axios.get(`${API_BASE_URL}/apartments`, { params });
return response.data;
};

Особливості реалізації

Використання Redux Toolkit + createAsyncThunk для асинхронних запитів.

Обробка станів завантаження, помилок і пагінації.

Підтримка фільтрів (місто, тип, ціна) через query parameters.

Зберігання отриманих даних у Redux state для глобального доступу.

Документація API
Якщо бекенд має Swagger або іншу документацію — варто надати посилання, або додати базову специфікацію OpenAPI.

Безпека
Для авторизації використовується токен (JWT), який додається в заголовок Authorization: Bearer <token>.

Ключі API (RapidAPI тощо) винесені у конфігураційні файли та не зберігаються в репозиторії.

## Реєстрація та Профіль користувача

- Користувач може зареєструватися, ввівши ім’я, email, пароль і завантажити аватар.
- Дані користувача зберігаються у Redux, а токен — в AsyncStorage для збереження сесії.
- Після реєстрації можна оновити профіль: змінити ім’я та аватар.
- Для вибору аватара використовується інтеграція з галереєю пристрою через `expo-image-picker`.
- Збереження профілю відбувається локально і через API, якщо є.

## Теми (ThemeContext)

- Застосунок підтримує світлу та темну тему.
- Користувач може переключати тему через кнопку або перемикач.
- Тема керується глобально через React Context API (`ThemeContext`).
- Стилі компонентів адаптуються під активну тему (фон, текст, кнопки).

## Навігація

- Після успішної реєстрації користувач переходить у профіль.
- Є екран редагування профілю, де можна оновити ім’я та аватар.
- Навігація реалізована через React Navigation (Stack, Tab, Drawer).

## Оптимізація продуктивності

Заміна важких залежностей
Замінено moment на dayjs — набагато легша і сучасніша бібліотека для роботи з датами.

Використовується форматування дати з локалізацією:

import dayjs from "dayjs";
dayjs().locale("uk").format("LL");

## Анімація

Додано анімацію розгортання картки квартири через LayoutAnimation в ApartmentCard.js.

Реакція на натискання відбувається плавно:

LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

## Оптимізація повторних ререндерів

Компонент ApartmentCard обгорнуто в React.memo, щоб уникнути зайвих ререндерів.

Функції onPress і handleToggle оптимізовані через useCallback.

const ApartmentCard = React.memo(({ apartment, onPress }) => { ... });

## Аналіз бандлу

Проведено аналіз розміру бандлу через source-map-explorer.

Скріншоти або Відео роботи застосунку

https://drive.google.com/file/d/1VdBzBJgKAv3BrGYVi7KI1eGQv-muiIoN/view?usp=sharing

### Запуск

npx expo start

Або

npx expo start -c

Покрокова інструкція для виправлення
🧼 КРОК 1: Очистити залежності
У терміналі в корені проєкту:

rm -rf node_modules package-lock.json
npm cache clean --force

📥 КРОК 2: Встановити залежності заново

npm install

🚿 КРОК 3: Запустити Expo з очищенням бандлера

npx expo start -c

або

rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npx expo start
