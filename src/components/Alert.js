import { useContext } from "react";
import NotesContext from "../context/NotesContext";

const Alert = () => {
  const notesContext = useContext(NotesContext);
  const { alert } = notesContext;

  return (
    <div
      className={`p-4 rounded ${alert ? alert.bgColor  : ''} } ${alert ? alert.textColor : ''} `}
      role="alert"
    >
      {alert ? alert.message : ""}
    </div>
  );
};

export default Alert;
