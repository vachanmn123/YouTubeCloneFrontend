import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./routes/signup";
import ErrorPage from "./error-page";
import LoginPage from "./routes/login";
import LogoutPage from "./routes/logout";

export default function Auth() {
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
        <div className="m-5 flex flex-col items-center justify-center h-screen w-screen">
          <Routes location={location} key={location.pathname}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
      </AnimatePresence>
    </>
  );
}
