import PageBase from "@/components/PageBase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import register from "../../../lib/auth/register";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const reg = register;

type SignUpFormInputs = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      await reg(data);
    } catch (error) {
      setError("root", {
        type: "manual",
        // @ts-expect-error - error is a string
        message: error.message,
      });
    }
  };
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  if (password !== confirmPassword) {
    if (confirmPassword !== "") {
      errors.confirmPassword = {
        type: "manual",
        message: "Passwords do not match",
      };
    }
  }

  if (password === confirmPassword) {
    delete errors.confirmPassword;
  }

  if (isSubmitSuccessful) {
    navigate("/auth/login");
  }

  return (
    <PageBase>
      <div className="grid md:grid-cols-10 grid-cols-1 h-screen w-screen items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center md:col-span-3 w-screen md:w-full">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-600">Sign up to YouTube clone!</p>
        </div>
        <form
          className="flex flex-col items-center justify-center col-span-7 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 underline">
              Login
            </a>
          </div>
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
            <Label htmlFor="firstName">First Name</Label>
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
            <Input
              id="firstName"
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
            <Input
              id="lastName"
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
            <Input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 5">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageBase>
  );
}
