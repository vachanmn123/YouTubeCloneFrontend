import PageBase from "@/components/PageBase";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getVideos from "../../../lib/api/getVideos";
import { motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import VideoCard from "@/components/VideoCard";

export default function HomePage() {
  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  return (
    <PageBase>
      <Helmet>
        <title>Home | YouTube Clone</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-5">Recommended</h1>
      {isLoading && (
        <motion.div
          className="flex flex-col w-full justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AiOutlineLoading3Quarters className="h-[15rem] w-[15rem] animate-spin" />
          <p className="text-2xl font-bold">Loading Videos</p>
        </motion.div>
      )}
      {isError && (
        <motion.div
          className="flex flex-col w-full justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MdError className="h-[15rem] w-[15rem]" />
          <p className="text-2xl font-bold">Error Fetching Videos</p>
        </motion.div>
      )}
      <motion.div
        className="flex flex-wrap gap-5 w-full justify-evenly"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        {videos?.map((video) => (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            key={video._id}
          >
            <Link to={`/watch/${video._id}`}>
              <VideoCard video={video} />
            </Link>
          </motion.span>
        ))}
      </motion.div>
    </PageBase>
  );
}
