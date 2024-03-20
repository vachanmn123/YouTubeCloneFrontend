import { useParams } from "react-router-dom";
import getUser from "../../../lib/api/getuser";
import { useQuery } from "@tanstack/react-query";
import PageBase from "../../components/PageBase";
import { Button } from "@/components/ui/button";
import ChannelPageVideos from "@/components/ChannelPageVideos";

export default function ChannelPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    // @ts-expect-error - This is a bug in the react-query types
    queryFn: () => getUser(id),
  });
  return (
    <PageBase>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4 mr-3">
          <div className="flex md:flex-row flex-col items-center gap-4">
            <img
              src={user?.imageURL}
              alt="Channel Avatar"
              className="h-[25rem] w-[25rem] rounded-full aspect-square object-contain"
            />
            <div>
              <h1 className="text-5xl font-bold tracking-wider">
                {user?.firstName} {user?.lastName}
              </h1>
              {/* TODO: Handle Subscribe */}
              {/* TODO: Handle already subscribed */}
              <Button className="mt-2">Subscribe</Button>
              <br />
              <small className="text-gray-500">{user?.userName}</small>
              <p>
                <span className="font-bold">{user?.subscriberCount}</span>{" "}
                {user?.subscriberCount === 1 ? "subscriber" : "subscribers"}
              </p>
              <p className="mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas repellat fugit excepturi facere omnis ad non ex cumque
                optio quisquam, sapiente vitae repudiandae vel illo magni,
                quaerat dignissimos enim illum consequuntur eligendi.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Videos</h2>
          {/* @ts-expect-error - This undefined case has been handled by the loader */}
          <ChannelPageVideos user={user} />
        </div>
      )}
    </PageBase>
  );
}
