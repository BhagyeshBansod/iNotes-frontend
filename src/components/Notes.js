import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotesContext from "../context/NotesContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";

const Notes = () => {
  const notesContext = useContext(NotesContext);
  const { allnotes, getNotes } = notesContext;

  //useNavigate hook to redirect to specified page
  let navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("token")){
      getNotes();
    }
    else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      <div className="flex flex-wrap justify-left items-center ml-4 mt-4">
        {allnotes.length === 0 && "No notes to display"}
        {allnotes.map((note) => {
          return <NoteItems key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
