import { notes } from "./notes.js";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import type { NotesType, NotesElsType, NoteObj } from "./types";

function CreateNotes(): NotesElsType {
  const arrNotes: NotesElsType = [];
  console.log(notes);

  for (const note of notes) {
    arrNotes.push(
      <Note key={note.key} title={note.title} content={note.content} />
    );
  }

  return arrNotes;
}

function App() {
  return (
    <>
      <Header />
      {/* {notes.map((noteItem: NoteObj) => (
        <Note
          key={noteItem.key}
          title={noteItem.title}
          content={noteItem.content}
        />
      ))} */}
      <CreateNotes />

      <Footer />
    </>
  );
}

export default App;
