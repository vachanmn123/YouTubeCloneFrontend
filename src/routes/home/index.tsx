import PageBase from "@/components/PageBase";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <PageBase>
      <Helmet>
        <title>Home | YouTube Clone</title>
      </Helmet>
      <h1>Home Page</h1>
      <div className="w-[25rem] h-[25rem] bg-blue-500"></div>
      <Link to="/about">Go to About</Link>
    </PageBase>
  );
}
