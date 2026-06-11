import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const REASONS = [
  "Porque sos hermosa.",
  "Porque sos buena.",
  "Porque me haces reir.",
  "Porque tus abrazos son mi lugar favorito.",
  "Porque me elegis.",
  "Porque me dejas cuidarte.",
  "Porque me haces sentir amado.",
  "Porque amo tus mimos.",
  "Porque con vos todo es mas lindo.",
  "Porque sos mi princesa.",
  "Porque me encanta verte feliz.",
  "Porque me acompanas.",
  "Porque sos tierna.",
  "Porque amo compartir mates con vos.",
  "Porque amo ver series con vos.",
  "Porque nuestras comidas juntos son mas ricas.",
  "Porque me das paz.",
  "Porque me motivas.",
  "Porque sos unica.",
  "Porque tenes un corazon hermoso.",
  "Porque amo tu forma de mirarme.",
  "Porque me haces extranarte.",
  "Porque me encanta estar con vos.",
  "Porque sos mi Flor.",
  "Porque te elegiria siempre.",
  "Porque te amo hasta la palmera y mucho mas.",
];

interface ReasonsToLoveProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

export default function ReasonsToLove({ onTriggerFloating }: ReasonsToLoveProps) {
  return (
    <section
      id="reasons-section"
      className="relative overflow-hidden rounded-[2rem] border border-[#ECE8E0] bg-[linear-gradient(180deg,rgba(255,251,248,0.97),rgba(240,248,245,0.94))] p-6 shadow-[0_18px_48px_rgba(27,77,67,0.08)] md:p-8"
    >
      <div className="absolute -top-10 right-0 h-36 w-36 rounded-full bg-[#FFD9E3]/50 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#D6F0E8]/70 blur-3xl" />

      <div className="relative mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/78 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#6E4944] shadow-sm">
          <Sparkles className="h-3.5 w-3.5 fill-[#E7B980]/20 text-[#B88357]" />
          26 razones
        </div>
        <h2 className="mt-4 font-serif text-3xl tracking-tight text-[#214D44] md:text-4xl">
          26 cosas por las que te amo
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#5A706A] md:text-[15px]">
          Una por cada ano tuyo.
        </p>
      </div>

      <div className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {REASONS.map((reason, index) => (
          <motion.button
            key={reason}
            type="button"
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) =>
              onTriggerFloating(
                e.clientX,
                e.clientY,
                `Razon ${index + 1}: ${reason.replace(/\.$/, "")}`,
              )
            }
            className="group cursor-pointer rounded-[1.4rem] border border-[#F0F1ED] bg-white/86 p-4 text-left shadow-[0_12px_24px_rgba(33,77,68,0.05)] transition-all hover:border-[#D6E7E1] hover:bg-white"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#B88357]">
                Razon {index + 1}
              </span>
              <Heart className="h-4 w-4 fill-[#F2C8D2] text-[#D890A4] transition-transform group-hover:scale-110" />
            </div>
            <p className="font-serif text-[16px] leading-relaxed text-[#35534C]">{reason}</p>
          </motion.button>
        ))}
      </div>

      <div className="relative mt-8 rounded-[1.8rem] border border-[#E6D9C8] bg-[linear-gradient(135deg,rgba(255,250,244,0.95),rgba(246,235,214,0.82))] px-5 py-6 text-center shadow-[0_18px_36px_rgba(110,73,68,0.10)] md:px-8">
        <p className="font-serif text-xl leading-relaxed text-[#6E4944] md:text-2xl">
          “No se como explicarte todo lo que te amo, pero si se que quiero seguir demostrandotelo todos los dias.”
        </p>
      </div>
    </section>
  );
}
