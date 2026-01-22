import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Form validation function
  const validateForm = () => {
    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty.");
      return false;
    }

    if (!anonymous && email && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    setEmailError(""); // Reset email error if valid
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

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
          name,
          email,
          phone,
          message: feedback,
          anonymous,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      toast.success("Feedback submitted successfully!");
      setFeedback("");
      setName("");
      setEmail("");
      setPhone("");
      setAnonymous(false);
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
        <Button variant="outline" aria-label="Open feedback form">
          Give Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-md:w-82.5 rounded-lg" role="dialog" aria-labelledby="feedback-title">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="w-full space-y-4">
          <h2 id="feedback-title" className="text-lg font-semibold">
            Submit Your Feedback
          </h2>

          <fieldset className="space-y-4">
            <legend className="sr-only">Privacy Options</legend>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={anonymous}
                onCheckedChange={(checked) => setAnonymous(!!checked)}
                aria-describedby="anonymous-description"
              />
              <Label htmlFor="anonymous">Submit Anonymously</Label>
            </div>
            <p id="anonymous-description" className="text-sm text-muted-foreground">
              Your personal information will not be collected if anonymous.
            </p>
          </fieldset>

          {!anonymous && (
            <fieldset className="space-y-4">
              <legend className="sr-only">Optional Contact Information</legend>

              <div className="space-y-2">
                <Label htmlFor="feedback-name">Name</Label>
                <Input
                  id="feedback-name"
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-email">Email (Optional)</Label>
                <Input
                  id="feedback-email"
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                {emailError && (
                  <p id="email-error" className="text-destructive text-sm" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-phone">Phone (Optional)</Label>
                <Input
                  id="feedback-phone"
                  type="tel"
                  placeholder="Enter your phone number..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </fieldset>
          )}

          <div className="space-y-2">
            <Label htmlFor="feedback-message">Feedback <span className="text-destructive">*</span></Label>
            <Textarea
              id="feedback-message"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              aria-describedby="feedback-help"
              rows={4}
            />
            <p id="feedback-help" className="text-sm text-muted-foreground">
              Please provide detailed feedback to help us improve.
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading || !feedback.trim()}
            className="w-full"
            aria-describedby={!feedback.trim() ? "submit-error" : undefined}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {!feedback.trim() && (
            <p id="submit-error" className="sr-only" role="alert">
              Feedback message is required
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
