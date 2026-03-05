import "./App.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/router";

function App() {
  return (
    <div className="font-sans">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
