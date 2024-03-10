import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Helmet } from "react-helmet";

export default function ErrorPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12">
      <Helmet>
        <title>404 | YouTube Clone</title>
      </Helmet>
      <h1 className="text-5xl">404 - Page not Found</h1>
      <img
        src="https://http.cat/404"
        alt="404 Cat"
        className="w-full h-[30rem]"
      />
      <p>How did you get here? This is not the page you are looking for.</p>
      <Link to="/">
        <Button>Go back to Home</Button>
      </Link>
    </div>
  );
}
