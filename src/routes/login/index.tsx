import PageBase from "@/components/PageBase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import loginFlow, { LoginFlowReturnStatus } from "@/lib/loginFlow";
import { checkAuth } from "@/lib/checkAuth";
import { useQueryClient } from "@tanstack/react-query";

type loginInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const qClinet = useQueryClient();
  const navigate = useNavigate();
  const loggedIn = checkAuth();
  if (loggedIn) {
    navigate("/");
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<loginInputs>();
  const onSubmit: SubmitHandler<loginInputs> = async (data) => {
    try {
      const status = await loginFlow(data);
      if (status.status == LoginFlowReturnStatus.error) {
        setError("root", {
          type: "manual",
          message: status.message ? status.message : "An error occurred",
        });
        return;
      }
      qClinet.invalidateQueries({
        queryKey: ["currentUser"],
      });
    } catch (error) {
      setError("root", {
        type: "manual",
        // @ts-expect-error - error is a string
        message: error.message,
      });
    }
  };

  if (isSubmitSuccessful) {
    navigate("/");
  }

  return (
    <PageBase>
      <div className="grid md:grid-cols-10 grid-cols-1 h-screen w-screen items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center md:col-span-3 w-screen md:w-full">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-600">Login to YouTube clone!</p>
        </div>
        <form
          className="flex flex-col items-center justify-center col-span-7 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.root && (
            <div className="flex gap-5 w-full max-w-sm bg-red-100 items-center justify-center rounded-xl p-5">
              <MdErrorOutline className="text-red-500 text-2xl" />
              <p className="text-red-500 text-sm">{errors.root.message}</p>
            </div>
          )}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
            <Input
              id="username"
              placeholder="Username"
              {...register("username", { required: true })}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          <div>
            Don't have an account?
            <a href="/auth/signup" className="text-blue-500 underline mx-1">
              Register now!
            </a>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 5">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageBase>
  );
}
