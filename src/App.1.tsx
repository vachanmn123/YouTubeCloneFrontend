import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./routes/home";
import AboutPage from "./routes/about";
import ErrorPage from "./error-page";
import Helmet from "react-helmet";

export function App() {
  const location = useLocation();
  return (
    <>
      <Helmet>
        <title>YouTube Clone</title>
        <meta
          name="description"
          content="A YouTube clone made with React and TypeScript by Vachan MN"
        />
      </Helmet>
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
