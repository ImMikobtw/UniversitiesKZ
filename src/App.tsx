import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddUniversityPage from './pages/AddUniversityPage';

const ProtectedRoute = ({ children, requiresAuth = true }: { children: React.ReactNode; requiresAuth?: boolean }) => {
  const { isAuthenticated } = useAuth();
  if (requiresAuth) {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }
  return !isAuthenticated ? children : <Navigate to="/main" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute requiresAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute requiresAuth={false}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/*"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-university"
            element={
              <ProtectedRoute>
                <AddUniversityPage />
              </ProtectedRoute>
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