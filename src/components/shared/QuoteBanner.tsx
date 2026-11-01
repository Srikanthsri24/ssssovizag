import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function QuoteBanner({ text, by = "Bhagawan Sri Sathya Sai Baba" }: { text: string; by?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto my-12 max-w-4xl overflow-hidden rounded-3xl gradient-saffron px-6 py-10 text-center text-white shadow-xl sm:px-12"
    >
      <Quote className="absolute left-4 top-4 h-10 w-10 opacity-30" />
      <Quote className="absolute bottom-4  right-4 h-10 w-10 rotate-180 opacity-30" />
      <p className="font-display text-2xl italic sm:text-3xl">"{text}"</p>
      <div className="mt-3 text-xs uppercase tracking-widest opacity-90">— {by}</div>
    </motion.div>
  );
}
