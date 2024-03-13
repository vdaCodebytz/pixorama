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
import { SignupSchema } from "@/lib/formValidations";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateNewAccount } from "@/lib/react-query/mutations";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  let { mutateAsync: createNewAcc, isPending: isCreatingAcc } =
    useCreateNewAccount();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    try {
      const newUser = await createNewAcc(values);
      if (newUser.status === "error") {
        throw new Error(newUser.message);
      }

      toast({
        title: "Account created successfully",
        description: "Redirecting to signin page",
      });
      form.reset();

      navigate("/sign_in");
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
    <>
      <Form {...form}>
        <div className="w-3/5 sm:w-420 flex-center flex-col">
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Create a new account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            To use snapgram, Please enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light">Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="shad-input" />
                  </FormControl>
                  <FormMessage className="text-red font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light">Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="shad-input" />
                  </FormControl>
                  <FormMessage className="text-red font-light" />
                </FormItem>
              )}
            />
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
            <Button type="submit" className="shad-button_primary w-full mt-4">
              {isCreatingAcc ? "Loading..." : "Submit"}
            </Button>
          </form>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign_in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
};
export default SignupForm;
