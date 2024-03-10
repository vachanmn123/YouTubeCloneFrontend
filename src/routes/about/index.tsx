import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <h1>About Page</h1>
      <div className="w-[25rem] h-[25rem] bg-red-500"></div>
      <Link to="/">Go to Home</Link>
    </motion.div>
  );
}
