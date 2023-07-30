import { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {
  //initial note value
  let initialNotes = [];

  //state variable & setState function to manage notes state
  const [allnotes, setAllNotes] = useState(initialNotes);

  //common uri
  const host = "http://localhost:5000";

  //state variable & setState function to manage alert state
  const [alert, setAlert] = useState(null);

  //show alert and hide alert management using setTimeout
  const showAlert = (message, bgColor, textColor) => {
    setAlert({
      message: message,
      bgColor: bgColor,
      textColor: textColor
    });
    setTimeout(() => setAlert(null), 1500);
  };

  //Fetching all notes from DB
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token")},
    });

    const allNotesRes = await response.json();
    setAllNotes(allNotesRes);
  };

  //Add note function
  const addnote = async (Title, Description, Tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token")
          },
      body: JSON.stringify({ Title, Description, Tag }),
    });

    const note = await response.json();
    setAllNotes(allnotes.concat(note));
  };

  //Delete note function
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token")
         },
    });

    await response.json();
    
    //filtering notes using note Id
    const newNotes = allnotes.filter((note) => {
      showAlert("Note deleted Successfully", "bg-green-500", "text-white");
      return note._id !== id;
    });
    setAllNotes(newNotes);
  };

  //Editing an existing note
  const editNote = async (id, Title, Description, Tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token")
      },
      body: JSON.stringify({ Title, Description, Tag }),
    });

    await response.json();

    const updatedNote = allnotes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          Title,
          Description,
          Tag,
        };
      }
      return note;
    });
    setAllNotes(updatedNote);
  };

  return (
    <NotesContext.Provider
      value={{ allnotes, addnote, deleteNote, editNote, getNotes, alert, showAlert }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
