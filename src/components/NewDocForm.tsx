"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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
import { Id } from "../../convex/_generated/dataModel";
import { useOrganization } from "@clerk/nextjs";

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
  file: z.instanceof(File),
});

function NewDocForm({ setIsOpen }: ComponentProps) {
  const organization = useOrganization();
  console.log("organization", organization);
  const createDocument = useMutation(api.documents.createDocument);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const postUrl = await generateUploadUrl();
    // NOTE create utils function to check file type and ensure is the one we want
    try {
      const response = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": values.file.type },
        body: values.file,
      });

      if (!response.ok) {
        throw new Error(
          "There was a problem processing the file on the server"
        );
      }
      if (response.ok) {
        const { storageId } = await response.json();
        // new Promise((resolve) => setTimeout(resolve, 2000));
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log("values:::", values);
        console.log(
          "organization.organization?.id:::",
          organization.organization?.id
        );
        // await createDocument({ title: values.title });

        await createDocument({
          title: values.title,
          // storageId: storageId as string,
          storageId: storageId as Id<"_storage">,
          orgId: organization.organization?.id,
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    }
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
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept=".xml, .doc, .txt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
                />
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
