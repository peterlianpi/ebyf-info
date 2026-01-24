"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const feedbackSchema = z.object({
  message: z.string().min(1, "Feedback message is required"),
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  anonymous: z.boolean(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function FeedbackForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      message: "",
      name: "",
      email: "",
      phone: "",
      anonymous: false,
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setLoading(true);

    const domain = process.env.NEXT_PUBLIC_API_URL;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (process.env.NEXT_PUBLIC_API_KEY) {
      headers["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY;
    }

    try {
      const response = await fetch(`${domain}/api/feedback`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          anonymous: data.anonymous,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      toast.success("Feedback submitted successfully!");
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit feedback.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button variant="outline" size='lg' aria-label="Open feedback form">
          Give Feedback
        </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md max-md:w-82.5 rounded-lg" role="dialog" aria-labelledby="feedback-title">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <h2 id="feedback-title" className="text-lg font-semibold">
              Submit Your Feedback
            </h2>

            <FormField
              control={form.control}
              name="anonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-describedby="anonymous-description"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="anonymous">Submit Anonymously</FormLabel>
                    <p id="anonymous-description" className="text-sm text-muted-foreground">
                      Your personal information will not be collected if anonymous.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {!form.watch("anonymous") && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name..." autoComplete="name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email..."
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number..."
                          autoComplete="tel"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your feedback here..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Please provide detailed feedback to help us improve.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
