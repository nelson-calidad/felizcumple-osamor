import React, { useState } from "react";
import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface BirthdayLetterProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
  loveLetterImg: string;
}

export default function BirthdayLetter({
  onTriggerFloating,
  loveLetterImg,
}: BirthdayLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = (e: React.MouseEvent) => {
    setIsOpen((prev) => !prev);
    onTriggerFloating(
      e.clientX,
      e.clientY,
      isOpen ? "La carta quedo guardada otra vez" : "Se abrio la carta para vos",
    );
  };

  return (
    <div id="letter-section" className="relative flex h-full flex-col items-center justify-center py-6 md:min-h-[41rem] md:py-8 xl:py-10">
      <div className="mb-6 text-center md:mb-8">
        <span className="rounded-full border border-[#4DB6A3]/20 bg-[#EAFDF9] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-teal-700">
          Solo para vos
        </span>
        <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-gray-800">
          La carta que queria dejarte
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
          Una cartita guardada aca, con todo lo que me nace decirte cuando pienso en vos.
        </p>
      </div>

      <div className="relative flex min-h-[300px] w-full max-w-lg items-center justify-center sm:min-h-[340px] md:flex-1">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white via-[#F8FFFD] to-[#EAFDF9]/70 shadow-[0_30px_70px_rgba(77,182,163,0.12)]" />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: -110, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="absolute z-20 w-11/12 max-w-md rounded-[2rem] border border-[#4DB6A3]/20 bg-[linear-gradient(180deg,#fffdf9_0%,#ffffff_62%,#f7fffd_100%)] p-5 shadow-[0_30px_60px_rgba(27,77,67,0.16)] md:p-8"
            >
              <div className="absolute right-4 top-4 text-teal-300">
                <Heart className="h-5 w-5 fill-teal-500/10" />
              </div>

              <div className="mb-4 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-100">
                <img
                  src={loveLetterImg}
                  alt="letter decoration"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="max-h-[420px] space-y-4 overflow-y-auto pr-1 font-serif text-sm leading-relaxed text-[#374151] md:max-h-[520px] md:text-base">
                <p className="font-mono text-[13px] font-bold uppercase tracking-wide text-[#1B4D43]">
                  17 de junio - 12:00 AM
                </p>
                <h3 className="font-sans text-xl font-extrabold tracking-tight text-gray-800">
                  Amorcito, mi Flor Lihue hermosa
                </h3>

                <p>
                  Hoy cumplis 26 anitos y quiero decirte lo mucho que te amo y lo feliz que me hace
                  tenerte en mi vida. Sos una persona hermosa, buena, tierna, mi princesa, mi
                  companera, la que me alegra los dias con una mirada, un abrazo o simplemente
                  estando.
                </p>
                <p>
                  Gracias por existir, por elegirme, por dejarme amarte y por compartir tantas
                  cosas lindas conmigo: nuestros mates, las series coreanas, las hamburguesas, los
                  lomitos, los mimos de siempre y todos esos momentos que para mi valen un monton.
                </p>
                <p>
                  Quiero que sepas que voy a acompanarte siempre en lo que decidas, en tus suenos,
                  en tus proyectos, en tus dias buenos y tambien en los dificiles. Siempre voy a
                  estar para vos, cuidandote, apoyandote y amandote como te mereces.
                </p>
                <p>
                  Te amo muchisimo, mi linda, mi hermosa, mi Flor. Ojala este nuevo ano te traiga
                  muchas cosas lindas, porque vos mereces todo lo bueno del mundo.
                </p>
                <p className="font-sans text-base font-semibold text-[#1B4D43]">
                  Feliz cumple, amorcito mio. Te amo hasta la palmera y mucho mas.
                </p>
                <p className="block pt-2 text-right font-mono text-xs font-medium italic text-gray-500">
                  Con todo mi amor,
                  <br />
                  <span className="font-sans text-sm font-bold not-italic text-gray-800">
                    Tu amorcito
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ y: isOpen ? 80 : 0 }}
          className="relative h-44 w-[18rem] cursor-pointer rounded-b-2xl border-2 border-[#4DB6A3]/25 shadow-xl sm:h-48 sm:w-80"
          onClick={handleOpenEnvelope}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#E7FAF6] to-[#D5EFEA] shadow-inner">
            <div className="absolute bottom-0 left-0 right-0 h-0 w-0 border-b-[96px] border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-white/50" />
            <div className="absolute bottom-0 left-0 right-0 h-0 w-0 border-l-[160px] border-l-white/40 border-r-[160px] border-r-white/45 border-t-[96px] border-t-white/30" />
          </div>

          <motion.div
            animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 10 : 30 }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[-2px] right-[-2px] top-0 z-30 flex h-24 items-center justify-center rounded-t-xl border-l-2 border-r-2 border-t-2 border-[#4DB6A3]/25 bg-[#F2FDFB]"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="absolute bottom-[-22px] left-1/2 flex h-11 w-11 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-[#3AA28F] bg-[#4DB6A3] shadow-lg"
            >
              <Heart className="h-5 w-5 animate-pulse fill-white text-white" />
            </motion.div>
          </motion.div>

          <div className="absolute -bottom-8 left-10 right-10 -z-10 h-4 rounded-full bg-black/10 blur-md" />
        </motion.div>
      </div>
    </div>
  );
}
