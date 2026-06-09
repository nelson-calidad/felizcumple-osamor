import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Sparkles, Star } from "lucide-react";

interface LoveJarProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

export default function LoveJar({ onTriggerFloating }: LoveJarProps) {
  const [selectedMimo, setSelectedMimo] = useState<string | null>(null);

  const presetMimos = [
    "Mi Flor hermosa, solo quería recordarte que te amo muchísimo y que sos lo más lindo que me pasó.",
    "Feliz cumple otra vez, mi amorcito. Ojalá hoy sonrías mucho, porque tu sonrisa es mi parte favorita del día.",
    "Mi princesa, gracias por existir y por hacerme tan feliz sin darte cuenta.",
    "Este papelito es chiquito, pero mi amor por vos es gigante.",
    "Te amo en tus días lindos, en tus días cansados, en tus enojos, en tus risas y en todo lo que sos.",
    "Mi Flor Lihue, sos mi lugar favorito, mi mimo favorito y mi persona favorita.",
    "Ojalá nunca te olvides de lo hermosa, buena y especial que sos para mí.",
    "Te elegiría mil veces, en esta vida y en todas las que vengan.",
    "Amorcito, gracias por dejarme acompañarte y amarte como te merecés.",
    "Me encanta compartir la vida con vos, aunque sea tomando mates, viendo series o simplemente estando juntitos.",
    "Sos mi linda, mi hermosa, mi princesa y mi todo.",
    "Hoy cumplís 26, pero yo cumplo otro día más de suerte por tenerte conmigo.",
    "Te amo hasta la palmera, hasta la luna, hasta donde no se pueda explicar.",
    "Quiero estar siempre para vos, en cada sueño, en cada decisión y en cada pasito que des.",
    "Gracias por ser tan vos, tan dulce, tan buena y tan hermosa.",
    "Este mensajito es para decirte que me hacés muy feliz, incluso en los días simples.",
    "Mi amor, me encanta tu forma de ser, tus mimos, tus abrazos y todo lo que viene de vos.",
    "Donde estés vos, yo siento que estoy bien.",
    "Nunca dudes de lo mucho que te amo y de lo importante que sos para mí.",
    "Sos mi Flor más linda, la que quiero cuidar, acompañar y amar siempre ❤️",
  ];

  const handleDrawLocalMimo = (e: React.MouseEvent) => {
    const randomIndex = Math.floor(Math.random() * presetMimos.length);
    const message = presetMimos[randomIndex];
    setSelectedMimo(message);
    onTriggerFloating(e.clientX, e.clientY, "Un mensajito salió del frasco");
  };

  return (
    <section
      id="love-jar-section"
      className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(255,244,239,0.95),_rgba(238,251,247,0.94)_48%,_rgba(216,241,234,0.82)_100%)] p-5 shadow-[0_28px_80px_rgba(27,77,67,0.14)] backdrop-blur-md md:p-8"
    >
      <div className="absolute -left-8 -top-12 h-40 w-40 rounded-full bg-[#FFD7E2]/45 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[#CDEEE5]/65 blur-3xl" />

      <div className="relative mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#6E4944] shadow-sm">
          <Star className="h-3.5 w-3.5 fill-[#E7B980]/20 text-[#B88357]" />
          Frasco de mimos
        </div>
        <h3 className="mt-4 font-serif text-3xl tracking-tight text-[#214D44] md:text-4xl">
          Frasco de Mimos
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#5A706A]">Hacé clic.</p>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="rounded-[2rem] border border-white/80 bg-white/52 p-5 shadow-[0_18px_40px_rgba(110,73,68,0.12)] md:p-6">
            <div className="relative mx-auto flex w-full max-w-[240px] justify-center">
              <motion.div
                whileHover={{ y: -6, rotate: -1.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 170, damping: 16 }}
                className="relative flex h-56 w-40 cursor-pointer items-center justify-center rounded-t-[44px] rounded-b-[28px] border-[3px] border-[#77B8A7] bg-white/45 p-4 shadow-[0_18px_38px_rgba(54,116,101,0.18)] sm:h-64 sm:w-48"
                onClick={handleDrawLocalMimo}
                title="Hacé clic"
              >
                <div className="absolute -top-[18px] left-1/2 flex h-5 w-20 -translate-x-1/2 items-center justify-center rounded-t-md rounded-b-[4px] border-b-2 border-amber-900 bg-amber-700/85 shadow-md">
                  <div className="h-[3px] w-14 rounded bg-amber-600/60" />
                </div>

                <div className="absolute left-[-12px] top-14 flex rotate-2 items-center gap-1 rounded-r-md rounded-l-[3px] border-l-2 border-[#3AA28F] bg-[#4DB6A3] px-2.5 py-1 text-[9px] font-bold uppercase text-white shadow">
                  <Heart className="h-2 w-2 fill-white" />
                  Mimos 26
                </div>

                <div className="absolute inset-0 overflow-hidden p-5">
                  <div className="absolute inset-x-6 top-7 h-20 rounded-full bg-white/30 blur-xl" />
                  <div className="flex h-full flex-wrap items-center justify-center gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, Math.sin(i) * 13 - 8, 0],
                          x: [0, Math.cos(i) * 10 - 5, 0],
                          scale: [1, 1.15, 0.92, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3 + i * 0.35,
                          ease: "easeInOut",
                        }}
                        className={`flex h-3 w-6 items-center justify-center rounded-full border ${
                          i % 3 === 0
                            ? "rotate-12 border-pink-300 bg-pink-100"
                            : i % 3 === 1
                              ? "-rotate-12 border-amber-300 bg-amber-100"
                              : "rotate-45 border-sky-300 bg-sky-100"
                        }`}
                      >
                        <div className="h-2 w-[1.5px] rounded-full bg-white/80" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {selectedMimo ? (
                    <motion.div
                      key={selectedMimo}
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: -6 }}
                      className="z-10 mx-2 rounded-[1.4rem] border border-white/80 bg-white/92 px-3 py-4 text-center shadow-lg"
                    >
                      <span className="mb-2 block text-lg">💌</span>
                      <p className="font-serif text-[12px] leading-relaxed text-[#35534C]">
                        {selectedMimo}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="z-10 rounded-full border-2 border-[#8BCABB] bg-white/92 p-3 text-teal-600 shadow-md">
                      <Heart className="h-8 w-8 animate-pulse fill-[#68BEAA]" />
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="pointer-events-none absolute -left-2 -top-4 text-yellow-400">✨</div>
              <div className="pointer-events-none absolute -bottom-2 -right-2 text-pink-400">💞</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[1.8rem] border border-white/90 bg-white/82 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_36px_rgba(33,77,68,0.08)] md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#B88357]">
                  Mensajito
                </p>
                <p className="text-xs text-[#71837E]">Uno distinto cada vez.</p>
              </div>
              <button
                onClick={handleDrawLocalMimo}
                className="cursor-pointer rounded-full border border-[#D7EAE4] bg-[#F7FFFC] px-4 py-2 text-[11px] font-bold text-[#214D44] transition-all hover:bg-white active:scale-95"
              >
                Otro más
              </button>
            </div>

            <div className="flex min-h-[200px] items-center justify-center rounded-[1.3rem] border border-dashed border-[#BFDCD4] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,255,252,0.7))] px-4 py-6 text-center shadow-inner">
              <AnimatePresence mode="wait">
                {selectedMimo ? (
                  <motion.div
                    key={selectedMimo}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="space-y-3"
                  >
                    <span className="text-2xl">📜</span>
                    <p className="font-serif text-[17px] italic leading-relaxed text-[#445853] md:text-lg">
                      "{selectedMimo}"
                    </p>
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.24em] text-[#3AA28F]">
                      — Escrito con amor
                    </span>
                  </motion.div>
                ) : (
                  <div className="space-y-2 text-sm text-[#7A8C87]">
                    <p>Frasco de Mimos</p>
                    <span className="block text-[11px] font-medium text-teal-600">Hacé clic.</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleDrawLocalMimo}
              className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#CFE8E1] bg-white/90 px-5 py-3 text-sm font-bold text-[#214D44] shadow-sm transition-all hover:bg-[#F7FFFC] active:scale-95"
            >
              <Sparkles className="h-4 w-4 fill-[#B88357]/15 text-[#B88357]" />
              Hacé clic
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
