import React from "react";
import "./styles/Sidebar.css";
import { Note } from "../types/Types";

type Props = {
  onAddNote: () => void;
  onDeleteNote: (id?: string) => void;
  notes: Note[];
  activeNote?: string;
  setActiveNote: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Sidebar = ({ onAddNote, onDeleteNote, notes, activeNote, setActiveNote }: Props) => {
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          <div
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            key={note.id}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}>削除</button>
            </div>
            <p>{note.content}</p>
            <small>
              {new Date(note.modDate).toLocaleDateString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
