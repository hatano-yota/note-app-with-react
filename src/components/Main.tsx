import { Note } from "../types/Types";
import "./styles/Main.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  activeNote?: Note;
  onUpdateNote: (updatedNote: Note) => void;
};

const Main = ({ activeNote, onUpdateNote }: Props) => {
  const onEditNote = (key: string, value: string) => {
    onUpdateNote({
      ...activeNote,
      //プロパティが重複しているやつは置き換わる(更新される)
      [key]: value,
      modDate: Date.now(),
    });
  };

  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>;
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          placeholder="タイトル"
          value={activeNote.title}
          onChange={(e) => onEditNote("title", e.target.value)}
        />
        <textarea
          id="content"
          placeholder="ノート内容を記入"
          value={activeNote.content}
          onChange={(e) => onEditNote("content", e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">{activeNote.content ?? ""}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
