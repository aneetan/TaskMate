import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Login from "./pages/Login";
import './App.css';
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserLayout from "./components/layout/UserLayout";
import { ProtectedRoute } from "./config/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route element={<ProtectedRoute/>}>
            <Route element={<UserLayout/>}>
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="upcoming" element={<div>Upcoming</div>} />
                <Route path="today" element={<div> Today </div>} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;