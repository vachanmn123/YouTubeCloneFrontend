import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <h1>Home Page</h1>
      <div className="w-[25rem] h-[25rem] bg-blue-500"></div>
      <Link to="/about">Go to About</Link>
    </motion.div>
  );
}
