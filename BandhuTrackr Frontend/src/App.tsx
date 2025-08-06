import Home from "./pages/Home";
import { ErrorBoundary } from "./components";

const App = () => {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
};

export default App;
