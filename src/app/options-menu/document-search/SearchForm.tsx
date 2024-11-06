"use client";
import ButtonWithLoader from "@/components/ButtonWithLoader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "convex/react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ComponentProps = {
  setDocsAndNotes: (record: typeof api.search.searchAction._returnType) => void;
};

//to have extra client validation, we bring the form schema to use it in the intput form
const formSchema = z.object({
  search: z
    .string()
    .min(2, {
      message: "write your question",
    })
    .max(200),
});

function SearchForm({ setDocsAndNotes }: ComponentProps) {
  const searchAction = useAction(api.search.searchAction);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await searchAction({
      search: values.search,
    }).then(setDocsAndNotes);
    //REVIEW double chek if it works because we can pass the setter directy, because the callback takes as parameter the resolved promise
    //     .then((records) => {
    //   setDocsAndNotes(records!);
    // });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 gap-1 items-end"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  placeholder="use a Vector Search to do a search in all your documents and notes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonWithLoader
          isLoading={form.formState.isSubmitting}
          loadingText={"searching..."}
        >
          Submit Question
        </ButtonWithLoader>
      </form>
    </Form>
  );
}

export default SearchForm;
