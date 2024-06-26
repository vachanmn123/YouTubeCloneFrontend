import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./routes/home";
import AboutPage from "./routes/about";
import ErrorPage from "./error-page";
import Helmet from "react-helmet";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Footer from "./components/Footer";
import WatchVideoPage from "./routes/watch";
import ChannelPage from "./routes/channel";
import ChannelsPage from "./routes/channels";
import { useQuery } from "@tanstack/react-query";
import getAuthUser from "./lib/getAuthuser";
import UploadPage from "./routes/upload";

function App() {
  const location = useLocation();
  const screenWidth = window.innerWidth;
  const [sideBarOpen, setSideBarOpen] = useState(
    screenWidth > 768 ? true : false
  );

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getAuthUser,
  });

  window.onresize = () => {
    if (window.innerWidth > 768) {
      setSideBarOpen(true);
    } else {
      setSideBarOpen(false);
    }
  };

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
        <NavBar
          isOpen={sideBarOpen}
          setIsOpen={setSideBarOpen}
          user={currentUser}
        />
        <div
          className={`mt-[5rem] ${
            sideBarOpen ? "ml-[17rem]" : "ml-[1rem]"
          } transition-all max-w-[calc(100%-4rem)] mx-auto overflow-x-hidden overflow-y-scroll min-h-[calc(100vh-12rem)]`}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/watch/:id" element={<WatchVideoPage />} />
            <Route path="channel/:id" element={<ChannelPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </AnimatePresence>
    </>
  );
}

export default App;
