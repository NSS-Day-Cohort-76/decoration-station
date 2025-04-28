import { createRoot } from "react-dom/client";
import "./index.css";
import DecorationStation from "./components/DecorationStation.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DecorationStation />
  </BrowserRouter>
);
