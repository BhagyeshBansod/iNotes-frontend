import React, { useState, useContext } from "react";
import NotesContext from "../context/NotesContext";

const UpdatePopup = (props) => {

  // Destructure props to access 'openModal', 'formRef', and 'note'
  const { openModal, formRef, note } = props;

  // Access 'editNote' function from the NotesContext
  const notecontext = useContext(NotesContext);
  const { editNote, showAlert } = notecontext;

  //state to add and update new notes
  const [ currNote, setCurrNote ] = useState({
    eTitle: formRef.current?.noteData?.eTitle,
    eDescription: formRef.current?.noteData?.eDescription,
    eTag: formRef.current?.noteData?.eTag,
  });

  //function to store changed values in the curreNote State variable
  const onChangeInput = (e) => {
    setCurrNote({ ...currNote, [e.target.name]: e.target.value });
  };

  //function to update an existing note in DB and UI
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNoteData = {
        Title: currNote.eTitle,
        Description: currNote.eDescription,
        Tag: currNote.eTag,
      };
      editNote(note._id, updatedNoteData.Title, updatedNoteData.Description, updatedNoteData.Tag);
    openModal();
    showAlert("Note updated Successfully", "bg-green-500", "text-white");
  };

  const handleClose = () => {
    openModal();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-1/2 p-6 rounded shadow z-10">
        <form onSubmit={handleSubmit} ref = {formRef} className="max-w-md mx-auto">
          <div className="mb-4 mt-6">
            <label
              htmlFor="eTitle"
              className="block text-black-700 text-sm font-bold mb-2"
            >
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="eTitle"
              name="eTitle"
              value={formRef.current?.noteData?.eTitle}
              onChange={onChangeInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="eDescription"
              className="block text-black-700 text-sm font-bold mb-2"
            >
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="eDescription"
              name="eDescription"
              rows="4"
              value={formRef.current?.noteData?.eDescription}
              onChange={onChangeInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="eTag"
              className="block text-black-700 text-sm font-bold mb-2"
            >
              Tag<span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              id="eTag"
              name="eTag"
              value={formRef.current?.noteData?.eTag}
              onChange={onChangeInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
            >
              Update Note
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePopup;
