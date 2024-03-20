import { useQuery } from "@tanstack/react-query";
import getUsers from "../../../lib/api/getUsers";
import PageBase from "@/components/PageBase";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ChannelsPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  if (isLoading) {
    return (
      <motion.div
        className="flex flex-col w-full justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AiOutlineLoading3Quarters className="h-[15rem] w-[15rem] animate-spin" />
        <p className="text-2xl font-bold">Loading Channels</p>
      </motion.div>
    );
  }
  return (
    <PageBase>
      <h1 className="text-3xl font-bold mb-5">Channels</h1>
      <div className="flex flex-col mr-3">
        {users?.map((user) => (
          <Link to={`/channel/${user._id}`}>
            <div className="flex flex-row border-y py-5" key={user._id}>
              <img
                src={user.imageURL}
                alt="Channel Avatar"
                className="h-[10rem] w-[10rem] rounded-full aspect-square object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-wider">
                  {user.firstName} {user.lastName}
                </h1>
                <small className="text-gray-500">{user.userName}</small>
                <br />
                {/* TODO: Handle Subsribe */}
                {/* TODO: handle Already Subscribed */}
                <Button className="my-2">Subscribe</Button>
                <br />
                <p>
                  <span className="font-bold">{user.subscriberCount}</span>{" "}
                  {user.subscriberCount === 1 ? "subscriber" : "subscribers"}
                </p>
                <p className="line-clamp-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  debitis beatae excepturi fugiat minima quas saepe voluptatem
                  facere quisquam nesciunt adipisci reiciendis explicabo dolor
                  tempora laborum aut pariatur neque hic optio dolore!
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageBase>
  );
}
