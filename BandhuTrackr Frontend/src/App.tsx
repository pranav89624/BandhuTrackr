import Home from "./pages/Home";
import { ErrorBoundary } from "./components";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
