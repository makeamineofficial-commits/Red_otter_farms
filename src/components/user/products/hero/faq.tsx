import { Product } from "@/types/product";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = {
  question: string;
  answer: string;
};

export default function ProductFAQs({ product }: { product: Product }) {
  const faqs: FAQ[] = product.faqs ?? [];

  // Don't render if no FAQs
  if (!faqs.length) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 space-y-4">
      {/* Section Title */}
      <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`} className="border-b!">
            <AccordionTrigger className="text-left ">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
