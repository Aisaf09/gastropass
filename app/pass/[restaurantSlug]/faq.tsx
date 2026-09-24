import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Does this work on my phone?",
    answer:
      "Yes. It works with Apple Wallet on iPhone and Google Wallet on Android. If your device doesn't support either, you'll get a simple web card instead — it works the same way, just opened from a link.",
  },
  {
    question: "What information do you collect?",
    answer:
      "Just your name and phone number, used only to track your points at this restaurant. Nothing is shared with anyone else.",
  },
  {
    question: "Do I need to download an app?",
    answer:
      "No. Your card lives in your phone's built-in wallet, or on a simple web page — there's nothing to install from an app store.",
  },
  {
    question: "Can I use this card at other restaurants?",
    answer:
      "This card is specific to this restaurant's loyalty program. Each restaurant using GastroPass issues its own card.",
  },
];

export function FAQ() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-20">
      <div className="mb-8 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
          FAQ
        </span>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Good to know
        </h2>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-6 backdrop-blur-md">
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
