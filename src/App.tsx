import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { Note } from "./types/Types";

function App() {
  const initialNotes = JSON.parse(localStorage.getItem("notes") ?? "[]");
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeNote, setActiveNote] = useState<string | undefined>("");

  useEffect(() => {
    //ローカルストレージにノートを保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (notes[0]) {
      setActiveNote(notes[0].id);
    }
  }, []);

  const onAddNote = () => {
    // console.log("新しくノートが追加されました");
    const newNote = {
      id: uuid(),
      title: "",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  // console.log(notes);

  const onDeleteNote = (id?: string) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote: Note) => {
    //修正された新しいノートの配列を返す。
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });

    // console.log(updatedNote);
    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
