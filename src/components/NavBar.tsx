import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import SideBar from "./SideBar";

export default function NavBar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
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
          <button className="text-white">Sign In</button>
        </div>
      </div>
      {isOpen && <SideBar />}
    </>
  );
}
