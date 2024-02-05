"use client";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const OPTIONS: Option[] = [
  { label: "ATOM Staker", value: "atomstaker" },
  { label: "JUNO Staker", value: "junostaker" },
  { label: "OSMO Staker", value: "osmostaker" },
  { label: "TIA Staker", value: "tiastaker" },
  { label: "STARS Staker", value: "starsstaker" },
  { label: "Bad Kids", value: "badkid" },
];

const verificationFormSchema = z.object({
  project_name: z
    .string()
    .min(2, {
      message: "Project Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Project Name must not be longer than 30 characters.",
    }),
  claim_url: z
    .string({
      required_error: "Please insert the web page claim URL.",
    })
    .url(),
  description: z.string().min(4),
  targets: z.any(),
});

type VerificationFormValues = z.infer<typeof verificationFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<VerificationFormValues> = {
  project_name: "",
  claim_url: "",
  description: "",
  targets: [],
};

export function RequestVerificationForm() {
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: VerificationFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Crypto Kittens" {...field} />
              </FormControl>
              <FormDescription>Ufficial name of the project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="claim_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Claim URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://" {...field} />
              </FormControl>
              <FormDescription>
                Browser URL where is possible to do the claim
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="max-w-md">
          <FormField
            control={form.control}
            name="targets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Targets</FormLabel>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={OPTIONS}
                    placeholder="ATOM Stakers, JUNO Stakers, OSMO Stakers ..."
                    creatable
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  If you know, tell us which criteria is required to get the
                  airdrop
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                More information about this airdrop, i.e. useful links, blog
                posts, X page
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Request Verification</Button>
      </form>
    </Form>
  );
}
