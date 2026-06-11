import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Memory } from "../types";

interface TimelineProps {
  memories: Memory[];
  onTriggerFloating: (x: number, y: number, text: string) => void;
  birthdayCakeImg: string;
  loveLetterImg: string;
  polaroidImg: string;
}

export default function Timeline({
  memories,
  onTriggerFloating,
  birthdayCakeImg,
  loveLetterImg,
  polaroidImg,
}: TimelineProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, boolean>>({});
  const [deckIndex, setDeckIndex] = useState(0);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "romance", label: "Romance" },
    { id: "adventure", label: "Aventuras" },
    { id: "daily", label: "Cotidianos" },
    { id: "milestone", label: "Logros" },
  ];

  const filteredMemories =
    selectedCategory === "all"
      ? memories
      : memories.filter((memory) => memory.category === selectedCategory);

  useEffect(() => {
    if (deckIndex <= filteredMemories.length - 1) return;
    setDeckIndex(0);
  }, [deckIndex, filteredMemories.length]);

  const activeMemory = filteredMemories[deckIndex];

  const getMemoryImage = (memory: Memory) => {
    if (memory.imageSrc) return memory.imageSrc;

    const index = memory.imageIndex ?? 2;
    if (index === 0) return birthdayCakeImg;
    if (index === 1) return loveLetterImg;
    return polaroidImg;
  };

  const toggleSecret = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedSecrets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    onTriggerFloating(e.clientX, e.clientY, "Revelaste un susurro de amor");
  };

  const handleNextDeck = (e: React.MouseEvent) => {
    setDeckIndex((prev) => (prev + 1) % filteredMemories.length);
    onTriggerFloating(e.clientX, e.clientY, "Siguiente foto del escritorio");
  };

  const handlePrevDeck = (e: React.MouseEvent) => {
    setDeckIndex((prev) => (prev - 1 + filteredMemories.length) % filteredMemories.length);
    onTriggerFloating(e.clientX, e.clientY, "Volvamos a la foto anterior");
  };

  const getSecretText = (id: string) => {
    if (id === "1") {
      return "Lagunas de Yala. Estaba maravillado de estar con vos ahí y de ver lo bien que nos quedaba empezar algo tan lindo juntos.";
    }
    if (id === "2") {
      return "Esa sorpresa con flores y tu sonrisa me pueden por completo. Verte feliz me llena y me hace querer seguir mimándote siempre.";
    }
    if (id === "3") {
      return "Córdoba. Ese viaje marcó un antes y un después. Mate, ruta, charla y esa alegría de sentir que con vos todo fluye.";
    }
    if (id === "4") {
      return "Verte recibirte me llenó de orgullo. Me encanta admirarte y escucharte hablar con pasión de lo que amás.";
    }
    if (id === "5") {
      return "Nuestra salida al cine fue una de esas citas que parecen simples, pero conmigo se quedan enormes porque estabas preciosa y feliz al lado mío.";
    }
    if (id === "6") {
      return "Ese cumple tan nuestro me encanta recordarlo por todo: tu sonrisa, la torta, el momento compartido y lo hermosa que estabas ese día.";
    }
    return "Esta otra foto tuya me derrite. Me encanta mirarte y volver a sentir lo afortunado que soy de tenerte en mi vida.";
  };

  return (
    <div
      id="memories-section"
      className="rounded-3xl border border-[#4DB6A3]/25 bg-white/50 p-5 shadow-xl shadow-glow backdrop-blur-md md:p-8"
    >
      <div className="mb-6 flex flex-col justify-between gap-4 md:mb-8 md:flex-row md:items-center">
        <div>
          <span className="rounded-full border border-[#4DB6A3]/20 bg-[#EAFDF9] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1B4D43]">
            Nuestros momentos juntos
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-gray-800">
            Polaroids de Nuestros Recuerdos
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Un rincón para volver a mirar algunos de nuestros momentos más lindos juntos.
          </p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2.5 md:mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setDeckIndex(0);
            }}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
              selectedCategory === category.id
                ? "scale-105 bg-[#4DB6A3] font-bold text-white shadow-md shadow-[#4DB6A3]/20"
                : "border border-gray-100 bg-white text-gray-500 hover:bg-[#EAFDF9] hover:text-[#1B4D43]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filteredMemories.length > 0 ? (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${activeMemory.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-5"
            >
              <motion.div
                initial={{ rotate: -4, scale: 0.95, opacity: 0 }}
                animate={{ rotate: deckIndex % 2 === 0 ? 1 : -2, scale: 1, opacity: 1 }}
                className="group relative rounded-lg border border-gray-100 bg-white p-3 pb-8 shadow-xl sm:p-4 sm:pb-12"
              >
                <div className="absolute left-1/2 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-red-400 opacity-60">
                  <div className="h-1 w-1 rounded-full bg-gray-900" />
                </div>

                <div className="relative mx-auto mb-4 aspect-[4/5] max-h-[320px] w-full max-w-[250px] overflow-hidden rounded-md border border-gray-100 bg-gray-50 sm:max-h-none sm:max-w-none sm:aspect-[5/4] lg:aspect-[4/5]">
                  <img
                    src={getMemoryImage(activeMemory)}
                    alt={activeMemory.title}
                    className="h-full w-full select-none object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = polaroidImg;
                    }}
                  />
                  <div className="absolute bottom-2 right-2 rounded-full bg-black/40 p-2 text-xs text-white backdrop-blur-sm">
                    {activeMemory.emoji}
                  </div>
                </div>

                <div className="mt-2 px-1 text-center font-serif">
                  <span className="rounded-full bg-[#EAFDF9] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#1B4D43]">
                    {activeMemory.date}
                  </span>
                  <h5 className="mt-1.5 text-lg font-extrabold leading-snug tracking-tight text-gray-800">
                    {activeMemory.title}
                  </h5>
                  <p className="mt-1 text-xs italic leading-relaxed text-gray-500">
                    "{activeMemory.description}"
                  </p>
                </div>
              </motion.div>

              <div className="rounded-[1.8rem] border border-white/90 bg-white/82 p-4 shadow-[0_18px_36px_rgba(33,77,68,0.06)] sm:p-5">
                <div className="space-y-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#B88357]">
                    Recuerdo {deckIndex + 1} de {filteredMemories.length}
                  </p>
                  <h4 className="mt-2 font-serif text-2xl text-[#214D44]">{activeMemory.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#607772]">{activeMemory.description}</p>

                  <div className="rounded-[1.3rem] border border-dashed border-[#BFDCD4] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,255,252,0.7))] p-4">
                    <button
                      onClick={(e) => toggleSecret(activeMemory.id, e)}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold text-teal-700 transition-all hover:bg-teal-200"
                    >
                      <Sparkles className="h-3 w-3" />
                      {revealedSecrets[activeMemory.id] ? "Ocultar secreto" : "Revelar secreto"}
                    </button>

                    <AnimatePresence>
                      {revealedSecrets[activeMemory.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="mt-3 rounded-lg border border-teal-100 bg-teal-50 p-3 text-left text-sm italic leading-relaxed text-[#1B4D43]"
                        >
                          "{getSecretText(activeMemory.id)}"
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={handlePrevDeck}
                    className="flex items-center gap-1.5 rounded-xl border bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-900"
                  >
                    Anterior
                  </button>
                  <div className="flex items-center gap-1 sm:hidden">
                    {filteredMemories.map((memory, index) => (
                      <button
                        key={memory.id}
                        type="button"
                        onClick={() => setDeckIndex(index)}
                        aria-label={`Ir al recuerdo ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all ${
                          deckIndex === index ? "w-6 bg-[#214D44]" : "w-2.5 bg-[#CFE3DD]"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNextDeck}
                    className="flex items-center gap-1.5 rounded-xl bg-[#214D44] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#183C35]"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <div className="py-10 text-center font-mono text-xs text-gray-500">
          No hay recuerdos cargados en esta categoría aún.
        </div>
      )}
    </div>
  );
}
