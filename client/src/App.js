import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import EditMateriel from "./pages/EditMateriel";
import ViewMateriel from "./pages/ViewMateriel";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center"></ToastContainer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Outlet />}>
            <Route path="/" element={<Home />} />
            <Route path="/addContact" element={<AddEdit />} />
            <Route path="/update/:num_materiel" element={<EditMateriel />} />
            <Route path="/view/:num_materiel" element={<ViewMateriel />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

