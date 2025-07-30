import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import './App.css';
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserLayout from "./components/layout/UserLayout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route element={<UserLayout/>}>
            <Route path="dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;