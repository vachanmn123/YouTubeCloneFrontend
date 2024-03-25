import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import SideBar from "./SideBar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { User } from "lib/api/getuser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBar({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: User | undefined | null;
}) {
  return (
    <>
      <div className="flex fixed top-0 bg-black w-full p-5 z-[99999]">
        <div className="flex items-center gap-5">
          <button onClick={() => setIsOpen(!isOpen)}>
            <HamburgerMenuIcon className="h-8 w-8 text-white" />
          </button>
          <h1 className="text-white text-2xl font-bold">YouTube Clone</h1>
        </div>
        <div className="flex items-center gap-5 ml-auto">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={user.imageURL.length > 0 ? user.imageURL : "/avatar.png"}
                  alt="avatar"
                  className={`h-8 w-8 rounded-full ${
                    user.imageURL.length > 0 ? "" : "invert"
                  }`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-5 mr-5">
                <DropdownMenuLabel>
                  <span className="text-md font-bold">
                    {user.firstName} {user.lastName}
                  </span>
                  <br />
                  <small className="text-xs font-light">{user.userName}</small>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={`/channel/${user._id}`}>Your Channel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/auth/logout"}>Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to={"/auth/login"}>
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
      {isOpen && <SideBar />}
    </>
  );
}
