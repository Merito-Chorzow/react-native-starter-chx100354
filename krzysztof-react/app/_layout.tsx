import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { NotesProvider } from "../store/NotesContext";

import { useColorScheme } from '@/hooks/use-color-scheme'

export const unstable_settings = {
	anchor: '(tabs)',
}

export default function RootLayout() {
	const colorScheme = useColorScheme()

	return (
		<NotesProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="add" options={{ presentation: 'modal', title: 'Nowa notatka' }} />
				<Stack.Screen name="details" options={{ title: 'Szczegóły' }} />
			</Stack>
		</NotesProvider>
	)
}
