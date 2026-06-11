import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bookmark, Heart, Sparkles, Star } from "lucide-react";

interface LoveJarProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

const PRESET_MIMOS = [
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

export default function LoveJar({ onTriggerFloating }: LoveJarProps) {
  const [selectedMimo, setSelectedMimo] = useState<string | null>(null);
  const [savedMimos, setSavedMimos] = useState<string[]>([]);

  const remainingMimos = useMemo(
    () => PRESET_MIMOS.filter((message) => !savedMimos.includes(message)),
    [savedMimos],
  );

  const handleDrawLocalMimo = (e: React.MouseEvent) => {
    const source = remainingMimos.length > 0 ? remainingMimos : PRESET_MIMOS;
    const randomIndex = Math.floor(Math.random() * source.length);
    const message = source[randomIndex];

    setSelectedMimo(message);
    onTriggerFloating(e.clientX, e.clientY, "Salió un mensajito del frasco");
  };

  const handleSaveMimo = (e: React.MouseEvent) => {
    if (!selectedMimo) return;

    setSavedMimos((prev) => (prev.includes(selectedMimo) ? prev : [selectedMimo, ...prev].slice(0, 3)));
    onTriggerFloating(e.clientX, e.clientY, "Este mimo quedó guardado para releerlo");
  };

  return (
    <section
      id="love-jar-section"
      className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(255,244,239,0.95),_rgba(238,251,247,0.94)_48%,_rgba(216,241,234,0.82)_100%)] p-4 shadow-[0_28px_80px_rgba(27,77,67,0.14)] backdrop-blur-md md:p-8"
    >
      <div className="absolute -left-8 -top-12 h-40 w-40 rounded-full bg-[#FFD7E2]/45 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[#CDEEE5]/65 blur-3xl" />

      <div className="relative mb-5 text-center md:mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#6E4944] shadow-sm">
          <Star className="h-3.5 w-3.5 fill-[#E7B980]/20 text-[#B88357]" />
          Frasco de mimos
        </div>
        <h3 className="mt-4 font-serif text-3xl tracking-tight text-[#214D44] md:text-4xl">
          Frasco de Mimos
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#5A706A]">
          Lo adapté para celular: un toque grande para sacar un mimo, otro para guardar los más
          lindos y un formato cómodo para leerlos sin pelearte con la pantalla.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-6">
        <div className="rounded-[2rem] border border-white/80 bg-white/55 p-4 shadow-[0_18px_40px_rgba(110,73,68,0.12)]">
          <div className="relative mx-auto flex max-w-[280px] flex-col items-center">
            <motion.button
              type="button"
              whileHover={{ y: -4, rotate: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 170, damping: 16 }}
              className="relative flex h-48 w-36 items-center justify-center rounded-t-[44px] rounded-b-[28px] border-[3px] border-[#77B8A7] bg-white/55 p-4 shadow-[0_18px_38px_rgba(54,116,101,0.18)] sm:h-56 sm:w-44 lg:h-60 lg:w-48"
              onClick={handleDrawLocalMimo}
              title="Sacar mimo"
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

              <div className="z-10 rounded-full border-2 border-[#8BCABB] bg-white/92 p-3 text-teal-600 shadow-md">
                <Heart className="h-8 w-8 animate-pulse fill-[#68BEAA]" />
              </div>
            </motion.button>

            <p className="mt-4 text-center text-xs leading-relaxed text-[#607772]">
              Tocá el frasco para sacar un mensajito nuevo.
            </p>

            <button
              type="button"
              onClick={handleDrawLocalMimo}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#214D44] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#183C35] active:scale-95"
            >
              <Sparkles className="h-4 w-4 fill-white/15 text-white" />
              Sacar un mimo
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.8rem] border border-white/90 bg-white/84 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_36px_rgba(33,77,68,0.08)] md:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#B88357]">
                  Mensajito del momento
                </p>
                <p className="mt-1 text-xs text-[#71837E]">
                  Queda grande, cómodo y con aire para leerlo bien desde el celu.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDrawLocalMimo}
                  className="rounded-full border border-[#D7EAE4] bg-[#F7FFFC] px-4 py-2 text-[11px] font-bold text-[#214D44] transition-all hover:bg-white active:scale-95"
                >
                  Otro más
                </button>
                <button
                  type="button"
                  onClick={handleSaveMimo}
                  disabled={!selectedMimo}
                  className="rounded-full border border-[#E6D9C8] bg-[#FFF9F0] px-4 py-2 text-[11px] font-bold text-[#6E4944] transition-all hover:bg-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Guardar
                </button>
              </div>
            </div>

            <div className="flex min-h-[200px] items-center justify-center rounded-[1.4rem] border border-dashed border-[#BFDCD4] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,255,252,0.78))] px-4 py-5 text-center shadow-inner sm:min-h-[220px]">
              <AnimatePresence mode="wait">
                {selectedMimo ? (
                  <motion.div
                    key={selectedMimo}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="space-y-4"
                  >
                    <span className="text-3xl">💌</span>
                    <p className="font-serif text-lg italic leading-relaxed text-[#445853] md:text-xl">
                      "{selectedMimo}"
                    </p>
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.24em] text-[#3AA28F]">
                      — Escrito con amor
                    </span>
                  </motion.div>
                ) : (
                  <div className="space-y-2 text-sm text-[#7A8C87]">
                    <p className="font-serif text-lg text-[#35534C]">Acá va a aparecer tu próximo mimo.</p>
                    <span className="block text-[11px] font-medium text-teal-600">
                      Tocá el frasco o el botón de arriba.
                    </span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/90 bg-white/78 p-5 shadow-[0_18px_36px_rgba(33,77,68,0.06)]">
            <div className="mb-3 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-[#B88357]" />
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#B88357]">
                Mimos guardados
              </p>
            </div>

            {savedMimos.length > 0 ? (
              <div className="space-y-3">
                {savedMimos.map((mimo) => (
                  <div
                    key={mimo}
                    className="rounded-[1.2rem] border border-[#F0E5D7] bg-[#FFF9F3] px-4 py-3 text-sm leading-relaxed text-[#6E4944]"
                  >
                    {mimo}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-[#71837E]">
                Cuando encuentres uno que te guste mucho, tocá “Guardar” y te queda acá para volver
                a leerlo.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
