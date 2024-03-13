import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      className="flex flex-col mt-5 w-full h-20 bg-black z-[9999]"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-black p-5 text-white text-center">
        <h1 className="text-2xl font-bold">YouTube Clone</h1>
        <p className="text-sm">
          Made with ❤️ by{" "}
          <a
            href="https://www.vachanmn.tech/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Vachan MN
          </a>
        </p>
      </div>
    </motion.div>
  );
}
