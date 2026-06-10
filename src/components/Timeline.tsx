import React, { useState } from "react";
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
      className="rounded-3xl border border-[#4DB6A3]/25 bg-white/50 p-6 shadow-xl shadow-glow backdrop-blur-md md:p-8"
    >
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <span className="rounded-full border border-[#4DB6A3]/20 bg-[#EAFDF9] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1B4D43]">
            Nuestros Momentos Juntos
          </span>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-gray-800">
            Polaroids de Nuestros Recuerdos
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Un pequeño escritorio de recuerdos para ir pasando foto por foto y revivir lo
            lindo que construimos.
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2.5">
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

      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${deckIndex}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-6"
        >
          {filteredMemories.length > 0 ? (
            <div className="w-full max-w-sm">
              <motion.div
                key={filteredMemories[deckIndex].id}
                initial={{ rotate: -4, scale: 0.9, opacity: 0 }}
                animate={{ rotate: deckIndex % 2 === 0 ? 1 : -2, scale: 1, opacity: 1 }}
                className="group relative rounded-lg border border-gray-100 bg-white p-4 pb-12 shadow-xl"
              >
                <div className="absolute left-1/2 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-red-400 opacity-60">
                  <div className="h-1 w-1 rounded-full bg-gray-900" />
                </div>

                <div className="relative mb-4 aspect-square overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                  <img
                    src={getMemoryImage(filteredMemories[deckIndex])}
                    alt="memoria_foto"
                    className="h-full w-full select-none object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = polaroidImg;
                    }}
                  />
                  <div className="absolute bottom-2 right-2 rounded-full bg-black/40 p-2 text-xs text-white backdrop-blur-sm">
                    {filteredMemories[deckIndex].emoji}
                  </div>
                </div>

                <div className="mt-2 px-1 text-center font-serif">
                  <span className="rounded-full bg-[#EAFDF9] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#1B4D43]">
                    {filteredMemories[deckIndex].date}
                  </span>
                  <h5 className="mt-1.5 text-lg font-extrabold leading-snug tracking-tight text-gray-800">
                    {filteredMemories[deckIndex].title}
                  </h5>
                  <p className="mt-1 text-xs italic leading-relaxed text-gray-500">
                    "{filteredMemories[deckIndex].description}"
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={(e) => toggleSecret(filteredMemories[deckIndex].id, e)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold text-teal-700 transition-all hover:bg-teal-200"
                  >
                    <Sparkles className="h-3 w-3" />
                    {revealedSecrets[filteredMemories[deckIndex].id]
                      ? "Ocultar secreto"
                      : "Revelar secreto"}
                  </button>

                  <AnimatePresence>
                    {revealedSecrets[filteredMemories[deckIndex].id] && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="mt-3 rounded-lg border border-teal-100 bg-teal-50 p-2.5 text-left text-[11px] italic text-[#1B4D43]"
                      >
                        "{getSecretText(filteredMemories[deckIndex].id)}"
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handlePrevDeck}
                  className="flex items-center gap-1.5 rounded-xl border bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-900"
                >
                  Anterior
                </button>
                <span className="font-mono text-xs font-bold text-gray-500">
                  {deckIndex + 1} de {filteredMemories.length}
                </span>
                <button
                  onClick={handleNextDeck}
                  className="flex items-center gap-1.5 rounded-xl border bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-900"
                >
                  Siguiente
                </button>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center font-mono text-xs text-gray-500">
              No hay recuerdos cargados en esta categoria aun.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
