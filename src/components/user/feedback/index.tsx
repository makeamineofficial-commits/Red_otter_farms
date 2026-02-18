"use client";

import { useState } from "react";
import { Send, MessageCircle, Mail, FileText, CheckCircle } from "lucide-react";
import { z } from "zod";
import { feedback } from "@/actions/user/feedback/send.action";
const feedbackSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  body: z.string().min(10, "Message must be at least 10 characters"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    email: "",
    subject: "",
    body: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FeedbackFormData, string>>
  >({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = feedbackSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FeedbackFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FeedbackFormData;

        if (field) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    await feedback(result.data);
    console.log("Feedback submitted:", result.data);

    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ email: "", subject: "", body: "" });
    }, 3000);
  };

  const updateFormData = (field: keyof FeedbackFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error on change
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-forest text-white py-20 px-4 flex items-center justify-center flex-col">
        <div className="text-center">
          <div className="  text-xs uppercase tracking-[4px] mb-2">
            Share Your Thoughts
          </div>
          <h2 className="font-dream-orphans text-5xl tracking-[3px] mb-4">
            Send Us Feedback
          </h2>
          <p className="  text-lg">
            Questions, suggestions, or just want to say hi? We'd love to hear
            from you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {isSubmitted ? (
          /* Success */
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-forest rounded-full mb-8">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="font-dream-orphans text-forest text-5xl tracking-[3px] mb-4">
              Thank You!
            </h2>
            <p className=" text-[#1b1a21] text-lg max-w-xl mx-auto">
              We've received your feedback and will get back to you soon.
            </p>
          </div>
        ) : (
          /* Form */
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 font-bold uppercase text-sm mb-3">
                  <Mail className="w-5 h-5 text-[#d7262d]" />
                  Email Address *
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="w-full border-2 border-forest rounded-lg px-6 py-4 text-lg focus:border-[#d7262d]"
                  placeholder="your.email@example.com"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="flex items-center gap-2 font-bold uppercase text-sm mb-3">
                  <FileText className="w-5 h-5 text-[#d7262d]" />
                  Subject *
                </label>

                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => updateFormData("subject", e.target.value)}
                  className="w-full border-2 border-forest rounded-lg px-6 py-4 text-lg focus:border-[#d7262d]"
                  placeholder="What's this about?"
                />

                {errors.subject && (
                  <p className="text-red-500 text-sm mt-2">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-2 font-bold uppercase text-sm mb-3">
                  <MessageCircle className="w-5 h-5 text-[#d7262d]" />
                  Your Message *
                </label>

                <textarea
                  value={formData.body}
                  onChange={(e) => updateFormData("body", e.target.value)}
                  rows={8}
                  className="w-full border-2 border-forest rounded-lg px-6 py-4 text-lg focus:border-[#d7262d] resize-none"
                  placeholder="Tell us what's on your mind..."
                />

                <p className="text-sm mt-2 text-[#1b1a21]/60">
                  {formData.body.length} characters
                </p>

                {errors.body && (
                  <p className="text-red-500 text-sm mt-1">{errors.body}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#d7262d] text-white font-bold uppercase py-5 rounded-[10px] hover:bg-[#b81f25] transition-all hover:scale-[1.02] flex items-center justify-center gap-3 text-lg"
                >
                  <Send className="w-6 h-6" />
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
