import { Outlet, Route, Routes } from "react-router-dom";
import "./DecorationStation.css";
import { NavBar } from "./nav/NavBar.jsx";
import { DecorationForm } from "./forms/DecorationForm.jsx";
import { DecorationFormEdit } from "./forms/DecorationFormEdit.jsx";
import { ItemList } from "./item/ItemList.jsx";
import { ItemDetails } from "./item/ItemDetails.jsx";

function DecorationStation() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<ItemList />} />
        <Route path="new" element={<DecorationForm />} />
        <Route path="items">
          <Route index element={<ItemList />} />
          <Route path=":id" element={<ItemDetails />} />
          <Route path=":id/edit" element={<DecorationFormEdit />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default DecorationStation;
