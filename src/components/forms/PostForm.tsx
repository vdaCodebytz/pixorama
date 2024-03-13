import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/formValidations";
import { PostFormProps } from "@/types";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/mutations";
import { useAuthContext } from "@/context/AuthContext";
import Loader from "../shared/Loader";

const PostForm = ({ post, action }: PostFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { mutateAsync: createPost, isPending: isPosting } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });
      if (!updatedPost) {
        toast({
          title: "Something went wrong. Please try again",
          variant: "destructive",
        });
        return;
      }
      navigate(`/posts/${post.$id}`);
      return;
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });
    if (!newPost) {
      toast({
        title: "Something went wrong.Please try again",
        variant: "destructive",
      });
      return;
    }
    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (seperated by a comma ",")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Eg. #Art, #Education"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4 md:flex-row md:justify-end md:it">
          <Button type="button" className="shad-button_dark_4 ">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPosting || isUpdating}
            className="shad-button_primary whitespace-nowrap"
          >
            {isPosting || isUpdating ? (
              <>
                <Loader />
                Loading..
              </>
            ) : (
              <>{action}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default PostForm;
