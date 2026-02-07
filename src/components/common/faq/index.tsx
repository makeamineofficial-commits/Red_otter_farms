"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  value: FaqItem[];
  onChange: (value: FaqItem[]) => void;
};

export function FaqArrayField({ value = [], onChange }: Props) {
  const [faqs, setFaqs] = useState<FaqItem[]>(value);

  // Sync when form resets/updates
  useEffect(() => {
    setFaqs(value);
  }, [value]);

  const addFaq = () => {
    const updated = [...faqs, { question: "", answer: "" }];

    setFaqs(updated);
    onChange(updated);
  };

  const updateQuestion = (idx: number, val: string) => {
    const updated = faqs.map((item, i) =>
      i === idx ? { ...item, question: val } : item,
    );

    setFaqs(updated);
    onChange(updated);
  };

  const updateAnswer = (idx: number, val: string) => {
    const updated = faqs.map((item, i) =>
      i === idx ? { ...item, answer: val } : item,
    );

    setFaqs(updated);
    onChange(updated);
  };

  const removeFaq = (idx: number) => {
    const updated = faqs.filter((_, i) => i !== idx);

    setFaqs(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-4 w-full">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border rounded-xl p-4 flex flex-col gap-2 relative">
          {/* Header */}
          <div className="flex items-center justify-between ">
            <p className="font-medium text-sm opacity-70">FAQ #{idx + 1}</p>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeFaq(idx)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>

          {/* Question */}
          <Input
            value={faq.question}
            onChange={(e) => updateQuestion(idx, e.target.value)}
            placeholder="Enter question"
          />

          {/* Answer */}
          <Textarea
            value={faq.answer}
            onChange={(e) => updateAnswer(idx, e.target.value)}
            placeholder="Enter answer"
            rows={3}
          />
        </div>
      ))}

      {/* Add Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addFaq}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add FAQ
      </Button>
    </div>
  );
}
