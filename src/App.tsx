import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./routes/home";
import AboutPage from "./routes/about";
import ErrorPage from "./error-page";

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <h1>Header</h1>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <p>Footer</p>
      </AnimatePresence>
    </>
  );
}

export default App;
