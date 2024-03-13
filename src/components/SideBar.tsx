import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HomeIcon } from "@radix-ui/react-icons";
import { CiSquareInfo } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";

export default function SideBar() {
  return (
    <motion.div
      className="fixed top-0 left-0 w-64 h-full bg-black z-[9999] mt-[4rem] overflow-hidden"
      exit={{ x: "-100%" }}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ type: "tween" }}
    >
      <div className="flex flex-col gap-5 p-5 justify-start">
        <Link
          to="/"
          className="text-white text-xl font-bold flex items-center gap-3"
        >
          <HomeIcon className="h-6 w-6" /> Home
        </Link>
        <Link
          to="/about"
          className="text-white text-xl font-bold flex items-center gap-3"
        >
          <CiSquareInfo className="h-6 w-6" /> About
        </Link>
        <Link
          to="/channels"
          className="text-white text-xl font-bold flex items-center gap-3"
        >
          <FaUsers className="h-6 w-6" /> Channels
        </Link>
      </div>
    </motion.div>
  );
}
