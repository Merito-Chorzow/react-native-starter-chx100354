import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // lub prosta funkcja generująca ID, jeśli uuid sprawia problemy w Expo

// Definicja typu Notatki
export interface Note {
  id: string | number;
  title: string;
  body: string;
  date: string;
  location?: { latitude: number; longitude: number };
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'date'>) => void;
  deleteNote: (id: string | number) => void;
  loading: boolean;
}

const NotesContext = createContext<NotesContextType>({} as NotesContextType);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Pobieranie danych z API przy starcie
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // API Endpoint (Publiczny Mock)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        // Mapowanie danych z API do naszego formatu
        const apiNotes = response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          body: item.body,
          date: new Date().toISOString().split('T')[0],
        }));
        setNotes(apiNotes);
      } catch (error) {
        console.error("Błąd API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const addNote = (newNoteData: Omit<Note, 'id' | 'date'>) => {
    const newNote: Note = {
      id: Date.now(), // proste ID
      date: new Date().toISOString().split('T')[0],
      ...newNoteData,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string | number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, loading }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);