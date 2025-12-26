// app/(tabs)/index.tsx
import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useNotes } from '../../store/NotesContext'
import { Ionicons } from '@expo/vector-icons'

export default function NotesListScreen() {
	const { notes, loading } = useNotes()
	const router = useRouter()

	if (loading) {
		return <ActivityIndicator size="large" style={styles.center} />
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Moje Notatki</Text>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => router.push('/add')}
					accessibilityLabel="Dodaj nową notatkę">
					<Ionicons name="add" size={30} color="#fff" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={notes}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.card}
						onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
						accessibilityLabel={`Otwórz notatkę: ${item.title}`}>
						<View style={styles.cardHeader}>
							<Text style={styles.cardTitle} numberOfLines={1}>
								{item.title}
							</Text>
							{item.location && <Ionicons name="location-sharp" size={16} color="green" />}
						</View>
						<Text style={styles.cardDate}>{item.date}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
	center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	title: { fontSize: 28, fontWeight: 'bold' },
	addButton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#007AFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	list: { paddingHorizontal: 20 },
	card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
	cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	cardTitle: { fontSize: 18, fontWeight: '600', flex: 1 },
	cardDate: { color: '#888', marginTop: 5, fontSize: 12 },
})
