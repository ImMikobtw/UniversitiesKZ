import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddUniversityPage from "./pages/AddUniversityPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/main/*"
            element={
                <HomePage />
            }
          />
          <Route
            path="/add-university"
            element={
                <AddUniversityPage />
            }
          />
          <Route
            path="/"
            element={
                <Navigate to="/main/main" replace />
            }
          />
          <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;