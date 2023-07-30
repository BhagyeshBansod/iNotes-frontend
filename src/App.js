import { RouterProvider } from "react-router-dom";
import NotesState from "./context/NotesState";
import { router } from "./Routes/Router";

const App = () => {
  return (
    <>
      <NotesState>
        <RouterProvider router={router} />
      </NotesState>
    </>
  );
};

export default App;
