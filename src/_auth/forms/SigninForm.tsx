import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/lib/formValidations";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignIn } from "@/lib/react-query/mutations";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: signIn, isPending: isSigningIn } = useSignIn();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    try {
      const session = await signIn(values);
      form.reset();
      if (!session) {
        throw new Error("Something went wrong");
      }

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
  }

  return (
    <Form {...form}>
      <div className="w-3/5 sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign In to Pixorama
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Pixorama, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="shad-input " />
                </FormControl>
                <FormMessage className="text-red font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light">Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" className="shad-input" />
                </FormControl>
                <FormMessage className="text-red font-light" />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary w-full mt-4 ">
            {isSigningIn ? (
              <>
                <Loader /> Loading
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
        <p className="text-small-regular text-light-2 text-center mt-2">
          New to Pixorama?
          <Link
            to="/sign_up"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </Form>
  );
};
export default SigninForm;
