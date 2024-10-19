"use client";
import React, { FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ButtonWithLoader from "../ButtonWithLoader";

type ComponentProps = {
  docId: Id<"documents">;
};

//to have extra client validation, we bring the form schema to use it in the intput form
const formSchema = z.object({
  questionText: z
    .string()
    .min(2, {
      message: "write your question",
    })
    .max(200),
});

function ChatQuestionForm({ docId }: ComponentProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sendMessage({
      query: values.questionText,
      docId: docId,
    });
    form.reset();
  }

  const sendMessage = useAction(api.documents.sendQuestion);
  //   const makeQuery = async (e: FormEvent<HTMLFormElement>) => {
  //     // e.preventDefault();
  //     // const form = e.target as HTMLFormElement;
  //     // const formData = new FormData(form);
  //     // const queryText = formData.get("chat") as string;
  //     // console.log("queryText", queryText);
  //     // //Send msg to convex
  //     // const messageSent = await sendMessage({
  //     //   query: queryText,
  //     //   docId: docId,
  //     // });
  //     // console.log("messageSentResponse:", messageSent);
  //   };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 gap-1 items-end"
      >
        <FormField
          control={form.control}
          name="questionText"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  placeholder="ask anything about this document"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonWithLoader
          isLoading={form.formState.isSubmitting}
          loadingText={"submitting question"}
        >
          Submit Question
        </ButtonWithLoader>
      </form>
    </Form>
  );
}

export default ChatQuestionForm;
