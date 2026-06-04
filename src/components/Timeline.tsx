import React, { useState } from "react";
import { Calendar, Heart, Camera, MapPin, Sparkles, LayoutGrid, Eye, AlignLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Memory } from "../types";

interface TimelineProps {
  memories: Memory[];
  onTriggerFloating: (x: number, y: number, text: string) => void;
  birthdayCakeImg: string;
  loveLetterImg: string;
  polaroidImg: string;
}

export default function Timeline({ memories, onTriggerFloating, birthdayCakeImg, loveLetterImg, polaroidImg }: TimelineProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeMemoryId, setActiveMemoryId] = useState<string | null>(null);
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, boolean>>({});
  const [layoutMode, setLayoutMode] = useState<"list" | "deck">("list");
  const [deckIndex, setDeckIndex] = useState(0);

  const categories = [
    { id: "all", label: "💖 Todos", color: "bg-[#EAFDF9] text-[#1B4D43]" },
    { id: "romance", label: "💋 Romance", color: "bg-teal-50 text-teal-700" },
    { id: "adventure", label: "✈️ Aventuras", color: "bg-emerald-50 text-emerald-800" },
    { id: "daily", label: "🍔 Cotidianos", color: "bg-mint-50/50 text-emerald-900" },
    { id: "milestone", label: "🏆 Logros", color: "bg-cyan-50 text-cyan-800" },
  ];

  const filteredMemories = selectedCategory === "all" 
    ? memories 
    : memories.filter((m) => m.category === selectedCategory);

  const getCategoryImage = (index: number) => {
    if (index === 0) return birthdayCakeImg;
    if (index === 1) return loveLetterImg;
    return polaroidImg;
  };

  const toggleSecret = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedSecrets(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    onTriggerFloating(e.clientX, e.clientY, "¡Revelaste un susurro de amor! 🤫❤️");
  };

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    setActiveMemoryId(activeMemoryId === id ? null : id);
    onTriggerFloating(e.clientX, e.clientY, "¡Recuerdo seleccionado! ✨");
  };

  const handleNextDeck = (e: React.MouseEvent) => {
    setDeckIndex((prev) => (prev + 1) % filteredMemories.length);
    onTriggerFloating(e.clientX, e.clientY, "Siguiente página del ayer 📖");
  };

  const handlePrevDeck = (e: React.MouseEvent) => {
    setDeckIndex((prev) => (prev - 1 + filteredMemories.length) % filteredMemories.length);
    onTriggerFloating(e.clientX, e.clientY, "Volvamos la hoja 💫");
  };

  return (
    <div id="memories-section" className="bg-white/50 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-[#4DB6A3]/25 shadow-glow">
      
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold bg-[#EAFDF9] text-[#1B4D43] px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-[#4DB6A3]/20">
            Nuestros Momentos Juntos ⏳
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight font-sans mt-2">
            Línea del Tiempo de los Recuerdos
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Un recorrido cronológico de cómo has iluminado mi vida en cada paso del camino.
          </p>
        </div>

        {/* Layout mode buttons */}
        <div className="flex gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200 self-start">
          <button
            onClick={() => setLayoutMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              layoutMode === "list" 
                ? "bg-white text-gray-800 shadow" 
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            Línea Continua
          </button>
          <button
            onClick={() => {
              setLayoutMode("deck");
              setDeckIndex(0);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              layoutMode === "deck" 
                ? "bg-white text-gray-800 shadow" 
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Polaroids de Escritorio
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              if (layoutMode === "deck") setDeckIndex(0);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 transform active:scale-95 cursor-pointer ${
              selectedCategory === cat.id 
                ? "bg-[#4DB6A3] text-white font-bold shadow-md shadow-[#4DB6A3]/20 scale-105" 
                : "bg-white text-gray-500 hover:bg-[#EAFDF9] hover:text-[#1B4D43] border border-gray-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Content Rendering */}
      <AnimatePresence mode="wait">
        {layoutMode === "list" ? (
          /* VERTICAL TIMELINE LIST VIEW */
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative border-l-2 border-[#4DB6A3]/25 pl-6 ml-4 md:ml-8 space-y-10 py-2"
          >
            {filteredMemories.map((mem, idx) => {
              const isRevealed = !!revealedSecrets[mem.id];
              const isSelected = activeMemoryId === mem.id;

              return (
                <motion.div 
                  key={mem.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={(e) => handleCardClick(mem.id, e)}
                  title="Haz clic para ver más detallado"
                  className={`relative bg-white/80 rounded-2xl p-5 shadow-md border hover:border-[#4DB6A3] transition-all cursor-pointer select-none group hover:shadow-lg ${
                    isSelected ? "border-[#4DB6A3] ring-2 ring-[#4DB6A3]/15 shadow-lg bg-white" : "border-gray-100"
                  }`}
                >
                  {/* Floating Date Badge on Left Line */}
                  <div className="absolute -left-[37px] top-6 w-6 h-6 rounded-full bg-white border-2 border-[#4DB6A3] flex items-center justify-center text-xs shadow-sm">
                    <span className="text-xs group-hover:scale-110 transition-transform">{mem.emoji}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    {/* Tiny Memory image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#FFF0EE] border border-gray-100 relative group-hover:scale-105 transition-all">
                      <img 
                        src={getCategoryImage(mem.imageIndex)} 
                        alt="memory logo" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="flex items-center gap-1.5 text-xs text-secondary italic text-[#1B4D43] font-mono bg-[#EAFDF9] px-2.5 py-0.5 rounded-full font-bold">
                          <Calendar className="w-3 h-3 text-[#1B4D43]" />
                          {mem.date}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium border uppercase border-teal-200 bg-teal-50 text-teal-600">
                          {mem.category}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#1B4D43] transition-colors">
                        {mem.title}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                        {mem.description}
                      </p>

                      {/* Interactive Secret reveal container */}
                      <div className="mt-3.5 flex flex-wrap gap-2 items-center">
                        <button
                          onClick={(e) => toggleSecret(mem.id, e)}
                          className="flex items-center gap-1.5 bg-gradient-to-r from-teal-50 to-[#EAFDF9] hover:from-teal-100 hover:to-[#EAFDF9] text-teal-600 hover:text-teal-700 text-xs px-3 py-1.5 rounded-xl font-bold transition-all border border-teal-100 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {isRevealed ? "Ocultar secreto íntimo 🤫" : "Ver secreto/pensamiento de este día 👁️"}
                        </button>
                      </div>

                      <AnimatePresence>
                        {isRevealed && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="bg-teal-50/70 rounded-xl p-3 border border-teal-100 text-[#1B4D43] font-serif italic text-xs leading-relaxed relative">
                              <span className="font-bold text-sm block mb-1">Lo que guardé en mi alma ese día:</span>
                              "{mem.id === "1" ? "Lagunas de Yala. Estaba tan maravillado de estar con vos ahí. Tenía un poco de miedo de que saliéramos tímidos, pero ver esa sonrisa tuya con el paisaje me demostró que sos lo más lindo del mundo entero." :
                               mem.id === "2" ? "Córdoba. Ese primer viaje juntos marcó un antes y un después. Compartir un mate y charlar con la mirada al horizonte fue mi instante de felicidad más puro." :
                               mem.id === "3" ? "Nuestra preciosa técnica en Hemoterapia. Verte recibirte y saber el inmenso amor que le ponés a tu profesión me llena de orgullo infinito. ¡Amo sentarme a escucharte hablar de hemoterapia!" :
                               "Nuestras mágicas tardes compartiendo series, llorando de emoción y comiendo hamburguesas riquísimas. Esas charlas son mi refugio perfecto."}"
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* INTERACTIVE POLAROID SINGLE DECK VIEW */
          <motion.div
            key="deck-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-6"
          >
            {filteredMemories.length > 0 ? (
              <div className="w-full max-w-sm">
                {/* The Polaroid Container */}
                <motion.div 
                  key={filteredMemories[deckIndex].id}
                  initial={{ rotate: -4, scale: 0.9, opacity: 0 }}
                  animate={{ rotate: deckIndex % 2 === 0 ? 1 : -2, scale: 1, opacity: 1 }}
                  className="bg-white p-4 pb-12 rounded-lg shadow-xl border border-gray-100 relative group"
                >
                  {/* Simulated push pin */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 opacity-60 flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-900 rounded-full" />
                  </div>

                  {/* Polaroid Image Area */}
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

                  {/* Handwritten metadata caption */}
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

                  {/* Mini-secret button for polaroid format */}
                  <div className="text-center mt-4">
                    <button
                      onClick={(e) => toggleSecret(filteredMemories[deckIndex].id, e)}
                      className="inline-block text-[10px] bg-teal-100 hover:bg-teal-200 text-teal-700 px-3 py-1 rounded-full font-bold transition-all cursor-pointer"
                    >
                      {revealedSecrets[filteredMemories[deckIndex].id] ? "Ocultar secreto ✨" : "Revelar secreto íntimo 🧸"}
                    </button>
                    
                    <AnimatePresence>
                      {revealedSecrets[filteredMemories[deckIndex].id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="mt-3 bg-teal-50 p-2.5 rounded-lg text-[11px] text-[#1B4D43] italic border border-teal-100 text-left"
                        >
                          "{filteredMemories[deckIndex].id === "1" ? "Lagunas de Yala. Estaba tan maravillado de estar con vos ahí. Tenía un poco de miedo de que saliéramos tímidos, pero ver esa sonrisa tuya con el paisaje me demostró que sos lo más lindo del mundo entero." :
                            filteredMemories[deckIndex].id === "2" ? "Córdoba. Ese primer viaje juntos marcó un antes y un después. Compartir un mate y charlar con la mirada al horizonte fue mi instante de felicidad más puro." :
                            filteredMemories[deckIndex].id === "3" ? "Nuestra preciosa técnica en Hemoterapia. Verte recibirte y saber el inmenso amor que le ponés a tu profesión me llena de orgullo infinito. ¡Amo sentarme a escucharte hablar de hemoterapia!" :
                            "Nuestras mágicas tardes compartiendo series, llorando de emoción y comiendo hamburguesas riquísimas. Esas charlas son mi refugio perfecto."}"
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Deck control layout buttons */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={handlePrevDeck}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl shadow-sm border text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-semibold"
                  >
                    ⏮️ Anterior
                  </button>
                  <span className="text-xs font-mono font-bold text-gray-500">
                    {deckIndex + 1} de {filteredMemories.length}
                  </span>
                  <button
                    onClick={handleNextDeck}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl shadow-sm border text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-semibold"
                  >
                    Siguiente ⏭️
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10 font-mono text-xs">
                No hay recuerdos cargados en esta categoría aún... 💕
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
