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
} from "@/components/ui/form";
import { useMutation } from "convex/react";
import ButtonWithLoader from "@/components/ButtonWithLoader";
import { api } from "../../../../convex/_generated/api";
import { Textarea } from "@/components/ui/textarea";
import { useOrganization } from "@clerk/nextjs";

type ComponentProps = {
  handleCloseOnCreateNote: () => void;
};

const formSchema = z.object({
  text: z
    .string()
    .min(2, {
      message: "Note must contain at least 2 characters",
    })
    .max(1000),
});

function NewNoteForm({ handleCloseOnCreateNote }: ComponentProps) {
  const createNote = useMutation(api.notes.createNote);
  const organization = useOrganization();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createNote({
      text: values.text,
      orgId: organization.organization?.id,
    });

    handleCloseOnCreateNote();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                {/* //!TODO add a counting characters feature */}
                <Textarea placeholder="Text of your note" {...field} rows={9} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonWithLoader
          isLoading={form.formState.isSubmitting}
          loadingText={"Creating..."}
        >
          Create Note
        </ButtonWithLoader>
      </form>
    </Form>
  );
}

export default NewNoteForm;
