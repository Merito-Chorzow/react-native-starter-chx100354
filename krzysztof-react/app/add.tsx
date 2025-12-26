// app/add.tsx
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import * as Location from 'expo-location'
import { useNotes } from '../store/NotesContext'
import { Ionicons } from '@expo/vector-icons'

export default function AddNoteScreen() {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
	const [locLoading, setLocLoading] = useState(false)

	const { addNote } = useNotes()
	const router = useRouter()

	// Natywna funkcja: Pobranie lokalizacji
	const getLocation = async () => {
		setLocLoading(true)
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			Alert.alert('Brak uprawnień', 'Musisz zezwolić na dostęp do lokalizacji.')
			setLocLoading(false)
			return
		}

		try {
			let locationResult = await Location.getCurrentPositionAsync({})
			setLocation(locationResult.coords)
		} catch (error) {
			Alert.alert('Błąd', 'Nie udało się pobrać lokalizacji.')
		} finally {
			setLocLoading(false)
		}
	}

	const handleSave = () => {
		if (!title.trim()) {
			Alert.alert('Błąd', 'Tytuł jest wymagany.')
			return
		}
		addNote({ title, body, location: location || undefined })
		router.back()
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Tytuł</Text>
			<TextInput
				style={styles.input}
				value={title}
				onChangeText={setTitle}
				placeholder="Wpisz tytuł..."
				accessibilityLabel="Pole tytułu"
			/>

			<Text style={styles.label}>Treść</Text>
			<TextInput
				style={[styles.input, styles.textArea]}
				value={body}
				onChangeText={setBody}
				placeholder="Opis notatki..."
				multiline
			/>

			{/* Sekcja natywna */}
			<View style={styles.locationContainer}>
				<TouchableOpacity
					style={styles.locationButton}
					onPress={getLocation}
					disabled={locLoading}
					accessibilityLabel="Pobierz bieżącą lokalizację">
					{locLoading ? <ActivityIndicator color="#fff" /> : <Ionicons name="navigate" size={20} color="#fff" />}
					<Text style={styles.locationBtnText}>{location ? 'Zaktualizuj pozycję' : 'Dodaj lokalizację GPS'}</Text>
				</TouchableOpacity>

				{location && (
					<Text style={styles.coordText}>
						Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
					</Text>
				)}
			</View>

			<TouchableOpacity style={styles.saveButton} onPress={handleSave} accessibilityLabel="Zapisz notatkę">
				<Text style={styles.saveBtnText}>Zapisz Notatkę</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: '#fff' },
	label: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#333' },
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 12,
		borderRadius: 8,
		marginBottom: 20,
		fontSize: 16,
		backgroundColor: '#f9f9f9',
	},
	textArea: { height: 100, textAlignVertical: 'top' },
	locationContainer: { marginBottom: 30, alignItems: 'flex-start' },
	locationButton: {
		flexDirection: 'row',
		backgroundColor: '#34C759',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		minHeight: 44,
	},
	locationBtnText: { color: 'white', marginLeft: 8, fontWeight: '600' },
	coordText: { marginTop: 8, color: '#555', fontFamily: 'monospace' },
	saveButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', minHeight: 48 },
	saveBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
})
