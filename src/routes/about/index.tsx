import PageBase from "@/components/PageBase";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <PageBase>
      <h1>About Page</h1>
      <div className="w-[25rem] h-[25rem] bg-red-500"></div>
      <Link to="/">Go to Home</Link>
    </PageBase>
  );
}
