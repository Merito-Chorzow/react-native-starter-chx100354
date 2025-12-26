# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Field Notes App

Prosta aplikacja mobilna stworzona w **React Native (Expo)** umożliwiająca tworzenie notatek terenowych z wykorzystaniem geolokalizacji. Aplikacja demonstruje użycie natywnych funkcji urządzenia, komunikację z API oraz zarządzanie stanem lokalnym.

## 📱 Funkcjonalności

Aplikacja spełnia następujące założenia projektowe:

*   **Natywna funkcja (GPS):** Możliwość pobrania aktualnych współrzędnych geograficznych (szerokość i długość) i przypisania ich do notatki przy użyciu modułu `expo-location`.
*   **Komunikacja z API:**
    *   Pobieranie listy przykładowych notatek przy starcie aplikacji z publicznego API (`JSONPlaceholder`).
    *   Symulacja zapisu (dodawanie notatek do lokalnego stanu aplikacji).
*   **Widoki (Nawigacja):**
    *   **Lista notatek:** Wyświetla tytuł, datę i ikonę lokalizacji.
    *   **Szczegóły:** Pełny widok notatki z opisem i danymi GPS oraz opcją usuwania.
    *   **Dodaj notatkę:** Formularz z polami tekstowymi i przyciskiem do obsługi modułu GPS.
*   **Dostępność (Accessibility):** Elementy interaktywne posiadają odpowiednie rozmiary (~44-48px) oraz etykiety `accessibilityLabel` dla czytników ekranowych.

## 🛠 Stos technologiczny

*   **Framework:** React Native (Expo SDK 50+)
*   **Język:** TypeScript
*   **Nawigacja:** Expo Router (nawigacja oparta na plikach)
*   **Stan:** React Context API (`NotesContext`)
*   **HTTP Client:** Axios
*   **Natywne moduły:** `expo-location`
*   **Ikony:** @expo/vector-icons

## 🚀 Instalacja i uruchomienie

Wymagane jest posiadanie zainstalowanego środowiska **Node.js**.

1.  **Sklonuj repozytorium lub pobierz pliki:**
    Skopiuj pliki do folderu roboczego.

2.  **Zainstaluj zależności:**
    Otwórz terminal w folderze projektu i wpisz:
    ```
    npm install
    # lub jeśli używasz yarn
    yarn install
    ```

3.  **Uruchom serwer deweloperski:**
    ```
    npx expo start
    ```

4.  **Testowanie:**
    *   Zeskanuj kod QR za pomocą aplikacji **Expo Go** (Android/iOS).
    *   Lub naciśnij `a`, aby uruchomić na emulatorze Androida.
    *   Lub naciśnij `i`, aby uruchomić na symulatorze iOS (tylko macOS).

## ⚠️ Uprawnienia

Przy pierwszej próbie dodania lokalizacji do notatki, aplikacja poprosi o uprawnienia do użycia lokalizacji ("Allow app to access location"). Jest to wymagane do działania funkcji geotagowania.

## 📝 Uwagi

*   Domyślne dane są pobierane z `jsonplaceholder.typicode.com`. Są one nietrwałe (tylko do odczytu).
*   Nowe notatki są zapisywane w pamięci RAM urządzenia (Context API). Po całkowitym restarcie aplikacji (zabiciu procesu) dane wracają do stanu początkowego.

---
**Autor:** Krzysztof
**Data:** Grudzień 2025


