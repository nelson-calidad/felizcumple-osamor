import React, { useEffect, useState } from "react";
import { CheckCircle2, Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface BirthdayLetterProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
  loveLetterImg: string;
}

const STORAGE_KEY = "flor-birthday-replies";

export default function BirthdayLetter({
  onTriggerFloating,
  loveLetterImg,
}: BirthdayLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [savedReplies, setSavedReplies] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setSavedReplies(parsed.filter((item): item is string => typeof item === "string"));
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReplies));
  }, [savedReplies]);

  const handleOpenEnvelope = (e: React.MouseEvent) => {
    setIsOpen((prev) => !prev);
    onTriggerFloating(
      e.clientX,
      e.clientY,
      isOpen ? "La cartita quedó guardada otra vez" : "Se abrió la carta para vos",
    );
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedReply = replyText.trim();
    if (!trimmedReply) return;

    setSavedReplies((prev) => [trimmedReply, ...prev].slice(0, 5));
    setIsSent(true);
    onTriggerFloating(window.innerWidth / 2, window.innerHeight / 2, "Llegó un mensajito de vuelta");

    setTimeout(() => {
      setIsSent(false);
      setReplyText("");
    }, 4500);
  };

  return (
    <div id="letter-section" className="relative flex flex-col items-center justify-center py-6 md:py-10">
      <div className="mb-6 text-center md:mb-8">
        <span className="rounded-full bg-teal-100 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-teal-700">
          Especialmente para vos
        </span>
        <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-gray-800">
          La Carta de Cumpleaños
        </h2>
        <p className="mx-auto mt-1 max-w-md text-xs text-gray-500">
          Tocá el sello del sobre para abrir una carta hecha con amor, ternura y todo lo que me
          hacés sentir.
        </p>
      </div>

      <div className="relative flex min-h-[300px] w-full max-w-lg items-center justify-center sm:min-h-[340px]">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#EAFDF9]/45 to-transparent" />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: -110, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="absolute z-20 w-11/12 max-w-md rounded-2xl border border-[#4DB6A3]/25 bg-white p-5 shadow-2xl md:p-8"
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

              <div className="max-h-[280px] space-y-4 overflow-y-auto pr-1 font-serif text-sm leading-relaxed text-[#374151] md:max-h-[360px] md:text-base">
                <p className="font-mono text-[13px] font-bold uppercase tracking-wide text-[#1B4D43]">
                  17 de junio - 12:00 AM
                </p>
                <h3 className="font-sans text-xl font-extrabold tracking-tight text-gray-800">
                  Amorcito, mi Flor Lihue hermosa ❤️
                </h3>

                <p>
                  Hoy cumplís 26 añitos y quiero decirte lo mucho que te amo y lo feliz que me
                  hace tenerte en mi vida. Sos una persona hermosa, buena, tierna, mi princesa, mi
                  compañera, la que me alegra los días con una mirada, un abrazo o simplemente
                  estando.
                </p>
                <p>
                  Gracias por existir, por elegirme, por dejarme amarte y por compartir tantas
                  cosas lindas conmigo: nuestros mates, las series coreanas, las hamburguesas, los
                  lomitos, los mimos de siempre y todos esos momentos que para mí valen un montón.
                </p>
                <p>
                  Quiero que sepas que voy a acompañarte siempre en lo que decidas, en tus sueños,
                  en tus proyectos, en tus días buenos y también en los difíciles. Siempre voy a
                  estar para vos, cuidándote, apoyándote y amándote como te merecés.
                </p>
                <p>
                  Te amo muchísimo, mi linda, mi hermosa, mi Flor. Ojalá este nuevo año te traiga
                  muchas cosas lindas, porque vos merecés todo lo bueno del mundo.
                </p>
                <p className="font-sans text-base font-semibold text-[#1B4D43]">
                  Feliz cumple, amorcito mío. Te amo hasta la palmera y mucho más ❤️
                </p>
                <p className="block pt-2 text-right font-mono text-xs font-medium italic text-gray-500">
                  Con todo mi amor,
                  <br />
                  <span className="font-sans text-sm font-bold not-italic text-gray-800">
                    Tu amorcito
                  </span>
                </p>
              </div>

              <div className="mt-6 border-t border-dashed border-gray-100 pt-4">
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-xs font-semibold text-green-700"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Tu respuesta quedó guardada con todo mi amor</span>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSendReply}
                      className="space-y-3"
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Dejá un mensajito de vuelta:
                      </span>
                      <div className="space-y-2">
                        <input
                          type="text"
                          required
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Ej: te amo, gracias mi vida, vení por mimos"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#4DB6A3]"
                        />
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-[#4DB6A3] px-3 py-2 text-xs font-bold text-white transition-all hover:bg-[#3AA28F] active:scale-95"
                        >
                          Guardar respuesta
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {savedReplies.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#B88357]">
                      Tus mensajitos guardados
                    </p>
                    {savedReplies.map((reply, index) => (
                      <div
                        key={`${reply}-${index}`}
                        className="rounded-xl border border-[#E6D9C8] bg-[#FFF9F0] px-3 py-2 text-xs leading-relaxed text-[#6E4944]"
                      >
                        {reply}
                      </div>
                    ))}
                  </div>
                )}
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
