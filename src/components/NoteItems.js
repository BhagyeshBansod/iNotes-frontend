import React, { useContext, useState, useRef  } from "react";
import ReactDOM from "react-dom";
import NotesContext from "../context/NotesContext";
import UpdatePopup from "./UpdatePopup";


const NoteItems = (props) => {
  const { note } = props;

  // Access 'deleteNote' function from the NotesContext
  const notecontext = useContext(NotesContext);
  const { deleteNote } = notecontext;

  //State variable to check the state of the modal 
  const [isOpen, setIsOpen] = useState(false);

  //using useref to take reference values from note and pass as object to updatePopup
  const formRef = useRef({});

  //function to set note values as object and opening modal
  const openModal = () => {
    formRef.current = {
      noteData: {
        eTitle: note.Title || "",
        eDescription: note.Description || "",
        eTag: note.Tag || "",
      },
    };
    setIsOpen(!isOpen);
  };

  //created popup using createportal
  const UpdatePopups = isOpen
    ? ReactDOM.createPortal(
        <UpdatePopup openModal= {openModal}  formRef= {formRef} note = {note}/>,
        document.getElementById("popup")
      )
    : "";

  return (
    <>
      <div className="flex" >
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transform transition duration-300 hover:-translate-y-1 mr-4 mb-4">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="font-bold text-xl mb-2">{note.Title}</div>
              <i
                className="fa-solid fa-trash-can ml-4"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i className="fa-solid fa-file-pen ml-4" onClick={openModal}></i>
            </div>
            <p className="text-gray-700 text-base">{note.Description}</p>
          </div>
        </div>
      </div>
      {UpdatePopups}
    </>
  );
};

export default NoteItems;
