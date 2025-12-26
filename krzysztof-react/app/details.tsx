// app/details.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useNotes } from '../store/NotesContext'
import { Ionicons } from '@expo/vector-icons'

export default function DetailsScreen() {
	const { id } = useLocalSearchParams()
	const { notes, deleteNote } = useNotes()
	const router = useRouter()

	const note = notes.find(n => n.id.toString() === id)

	if (!note) {
		return (
			<View style={styles.center}>
				<Text>Nie znaleziono notatki.</Text>
			</View>
		)
	}

	const handleDelete = () => {
		Alert.alert('Usuń', 'Czy na pewno?', [
			{ text: 'Anuluj', style: 'cancel' },
			{
				text: 'Usuń',
				style: 'destructive',
				onPress: () => {
					deleteNote(note.id)
					router.back()
				},
			},
		])
	}

	return (
		<View style={styles.container}>
			<Text style={styles.date}>{note.date}</Text>
			<Text style={styles.title}>{note.title}</Text>

			{note.location && (
				<View style={styles.locationBadge}>
					<Ionicons name="location-sharp" size={16} color="#fff" />
					<Text style={styles.locationText}>
						GPS: {note.location.latitude.toFixed(4)}, {note.location.longitude.toFixed(4)}
					</Text>
				</View>
			)}

			<View style={styles.divider} />
			<Text style={styles.body}>{note.body}</Text>

			<TouchableOpacity style={styles.deleteButton} onPress={handleDelete} accessibilityLabel="Usuń tę notatkę">
				<Ionicons name="trash-outline" size={24} color="red" />
				<Text style={styles.deleteText}>Usuń notatkę</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: '#fff' },
	center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	date: { color: '#888', marginBottom: 5 },
	title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
	locationBadge: {
		flexDirection: 'row',
		backgroundColor: '#34C759',
		padding: 6,
		borderRadius: 4,
		alignSelf: 'flex-start',
		alignItems: 'center',
		marginBottom: 15,
	},
	locationText: { color: 'white', marginLeft: 5, fontSize: 12, fontWeight: '600' },
	divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
	body: { fontSize: 16, lineHeight: 24, color: '#333' },
	deleteButton: { flexDirection: 'row', marginTop: 40, alignItems: 'center', padding: 10 },
	deleteText: { color: 'red', fontSize: 16, marginLeft: 10, fontWeight: '500' },
})
