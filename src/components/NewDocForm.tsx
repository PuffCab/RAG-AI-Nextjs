"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Loader } from "lucide-react";
import ButtonWithLoader from "./ButtonWithLoader";

type ComponentProps = {
  setIsOpen: (a: boolean) => void;
};

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(50),
});

function NewDocForm({ setIsOpen }: ComponentProps) {
  const createDocument = useMutation(api.documents.createDocument);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    new Promise((resolve) => setTimeout(resolve, 2000));
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await createDocument({ title: values.title });
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of the Document" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonWithLoader
          isLoading={form.formState.isSubmitting}
          loadingText={"Uploading"}
        >
          Upload
        </ButtonWithLoader>
      </form>
    </Form>
  );
}

export default NewDocForm;
