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

  const getCategoryImage = (index: number) => {
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
      return "Lagunas de Yala. Estaba maravillado de estar con vos ahi y de ver lo bien que nos quedaba empezar algo tan lindo juntos.";
    }
    if (id === "2") {
      return "Cordoba. Ese viaje marco un antes y un despues. Mate, ruta, charla y esa alegria de sentir que con vos todo fluye.";
    }
    if (id === "3") {
      return "Verte recibirte me lleno de orgullo. Me encanta admirarte y escucharte hablar con pasion de lo que amas.";
    }
    return "Nuestras tardes de series, comida rica y charla larga son mi refugio favorito. Ahí tambien vive una parte enorme de mi felicidad.";
  };

  return (
    <div
      id="memories-section"
      className="bg-white/50 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-[#4DB6A3]/25 shadow-glow"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold bg-[#EAFDF9] text-[#1B4D43] px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-[#4DB6A3]/20">
            Nuestros Momentos Juntos
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight font-sans mt-2">
            Polaroids de Nuestros Recuerdos
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Un pequeño escritorio de recuerdos para ir pasando foto por foto y revivir lo
            lindo que construimos.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setDeckIndex(0);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 transform active:scale-95 cursor-pointer ${
              selectedCategory === category.id
                ? "bg-[#4DB6A3] text-white font-bold shadow-md shadow-[#4DB6A3]/20 scale-105"
                : "bg-white text-gray-500 hover:bg-[#EAFDF9] hover:text-[#1B4D43] border border-gray-100"
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
                className="bg-white p-4 pb-12 rounded-lg shadow-xl border border-gray-100 relative group"
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 opacity-60 flex items-center justify-center">
                  <div className="w-1 h-1 bg-gray-900 rounded-full" />
                </div>

                <div className="aspect-square bg-gray-50 rounded-md overflow-hidden border border-gray-100 relative mb-4">
                  <img
                    src={getCategoryImage(filteredMemories[deckIndex].imageIndex)}
                    alt="memoria_foto"
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/40 text-white rounded-full p-2 text-xs backdrop-blur-sm">
                    {filteredMemories[deckIndex].emoji}
                  </div>
                </div>

                <div className="font-serif text-center mt-2 px-1">
                  <span className="text-[11px] text-[#1B4D43] bg-[#EAFDF9] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold">
                    {filteredMemories[deckIndex].date}
                  </span>
                  <h5 className="font-extrabold text-lg text-gray-800 tracking-tight mt-1.5 leading-snug">
                    {filteredMemories[deckIndex].title}
                  </h5>
                  <p className="text-xs text-gray-500 italic mt-1 leading-relaxed">
                    "{filteredMemories[deckIndex].description}"
                  </p>
                </div>

                <div className="text-center mt-4">
                  <button
                    onClick={(e) => toggleSecret(filteredMemories[deckIndex].id, e)}
                    className="inline-flex items-center gap-1 text-[10px] bg-teal-100 hover:bg-teal-200 text-teal-700 px-3 py-1 rounded-full font-bold transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
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
                        className="mt-3 bg-teal-50 p-2.5 rounded-lg text-[11px] text-[#1B4D43] italic border border-teal-100 text-left"
                      >
                        "{getSecretText(filteredMemories[deckIndex].id)}"
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handlePrevDeck}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl shadow-sm border text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-semibold"
                >
                  Anterior
                </button>
                <span className="text-xs font-mono font-bold text-gray-500">
                  {deckIndex + 1} de {filteredMemories.length}
                </span>
                <button
                  onClick={handleNextDeck}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl shadow-sm border text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-semibold"
                >
                  Siguiente
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10 font-mono text-xs">
              No hay recuerdos cargados en esta categoria aun.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
