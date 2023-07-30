import React, { useContext, useState } from "react";
import NotesContext from "../context/NotesContext";

const AddNote = () => {
  const notecontext = useContext(NotesContext);

  //destructuring addnote function from noteState to add new note in the DB
  const { addnote, showAlert } = notecontext;

  //state to add and update new notes
  const [currNote, setCurrNote] = useState({
    Title: "",
    Description: "",
    Tag: "",
  });

  //function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    addnote(currNote.Title, currNote.Description, currNote.Tag);
    showAlert("Note added Successfully", "bg-green-500", "text-white");
    setCurrNote({
      Title: "",
      Description: "",
      Tag: "",
    });
  };

  //function to store changed values in the curreNote State variable
  const onChangeInput = (e) => {
    setCurrNote({ ...currNote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className="backdrop-blur-lg p-4 rounded-md shadow-md max-w-md mx-auto border-2 border-slate-400">
        <div className="mb-4 mt-6">
          <label
            htmlFor="Title"
            className="block text-white text-sm font-bold mb-2"
          >
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={currNote.Title}
            onChange={onChangeInput}
            className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Description"
            className="block text-white text-sm font-bold mb-2"
          >
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            id="Description"
            name="Description"
            value={currNote.Description}
            onChange={onChangeInput}
            rows="4"
            className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="Tag"
            className="block text-white text-sm font-bold mb-2"
          >
            Tag
          </label>
          <input
            type="text"
            id="Tag"
            name="Tag"
            value={currNote.Tag}
            onChange={onChangeInput}
            className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            onClick={onSubmit}
            className={`${
              currNote.Title.length < 3 || currNote.Description.length < 3
                ? "bg-gray-300 hover:bg-gray-300 text-black"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            disabled={
              currNote.Title.length <= 3 || currNote.Description.length < 3
            }
          >
            Add Note
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNote;
