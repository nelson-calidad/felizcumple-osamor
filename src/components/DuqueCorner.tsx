import React, { useState } from "react";
import { Heart, Sparkles, Volume2, Bone, Star, Coffee } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DuqueCornerProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

export default function DuqueCorner({ onTriggerFloating }: DuqueCornerProps) {
  const [currentThoughtIdx, setCurrentThoughtIdx] = useState<number | null>(null);
  const [feedCount, setFeedCount] = useState(0);

  const duqueQuotes = [
    "¡Guau! 🐕 Flor, sigo esperando con carita tierna que me convides un pedacito de lomito o hamburguesa...",
    "¡Gufr! 🐾 Dame más caricias en la panza. ¡Sé que el skincare de hoy me incluye a mí con mimos!",
    "¡Guau guau! Flor, gracias por ser tan buena de jugar conmigo, pasear de la mano y darme tanto amor. ¡Que pases el cumpleaños más feliz de tus 26! 🎉🧁",
    "¡Wuff! 💤 ¿Hacemos una siestita mientras los chicos charlan y nos miman?",
    "🧉 ¿Y si cebamos otro mate, Flor? Yo me siento al lado tuyo y te acompaño con mi colita batiéndose de felicidad.",
    "¡Guau! Mi dueño (tu cuñado) y tu novio me dijeron en secreto que sos la reina más querida de la casa y que amás acariciarme... ¡Y yo amo acompañarlos! 🦴💕"
  ];

  const handleBark = (e: React.MouseEvent) => {
    const randomIdx = Math.floor(Math.random() * duqueQuotes.length);
    setCurrentThoughtIdx(randomIdx);
    onTriggerFloating(e.clientX, e.clientY, "¡La Duque ladró con amor! 🐾🐾");
  };

  const handleFeedBone = (e: React.MouseEvent) => {
    setFeedCount((prev) => prev + 1);
    onTriggerFloating(e.clientX, e.clientY, "🍖 ¡Le diste un huesito a la Duque!");
  };

  return (
    <div id="duque-section" className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-[#4DB6A3]/25 relative overflow-hidden shadow-glow">
      <div className="absolute top-0 right-0 p-4 opacity-5 text-teal-800">
        <Bone className="w-24 h-24 rotate-45" />
      </div>

      {/* Title Header */}
      <div className="mb-6">
        <span className="text-xs font-semibold bg-[#EAFDF9] text-[#1B4D43] px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-[#4DB6A3]/20">
          La Consentida que nos Acompaña 👑🐾
        </span>
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mt-2 font-sans">
          El Rincón Especial de la Duque
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          La perrita del hermano del novio que siempre nos acompaña y alegra cada tarde de mates y series coreanas. ¡Toca su plato o pedí que ladre para oír sus pensamientos!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: Duque Avatar Card */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#4DB6A3] p-1 shadow-lg bg-[#EAFDF9] flex items-center justify-center">
            {/* Custom high quality dog avatar vector-style illustration representation */}
            <div className="text-6xl select-none animate-bounce duration-1000">🐕</div>
            {/* Tiny crown label */}
            <div className="absolute top-1 right-1 bg-amber-400 text-amber-950 p-1 rounded-full text-[10px] font-extrabold shadow-sm" title="Reina">
              👑
            </div>
          </div>

          <div className="mt-3 text-center">
            <h4 className="font-extrabold text-lg text-gray-800 font-sans">La Duque Lihue</h4>
            <p className="text-xs text-teal-700 font-medium font-mono">Perrita de mi Hermano & Fiel Acompañante</p>
          </div>

          {/* Stats Sheet */}
          <div className="w-full bg-white/80 p-3.5 rounded-2xl border border-gray-100 mt-4 space-y-2 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-gray-400 font-mono">Cariño por Flor:</span>
              <span className="font-bold text-teal-600">Continuo e Infinito %</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-mono">Habilidad skincare:</span>
              <span className="font-bold text-teal-600">Compañera de relax</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-mono">Gusto de comida:</span>
              <span className="font-bold text-teal-600">Súper fan del Lomito</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-mono font-bold text-[#1B4D43]">Huesitos recibidos hoy:</span>
              <span className="font-bold text-teal-600 bg-teal-50 px-2 rounded-full border border-teal-100">{feedCount} 🍖</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Panel */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-[#EAFDF9]/70 rounded-2xl p-5 border border-[#4DB6A3]/20 relative min-h-[140px] flex flex-col justify-between text-left shadow-inner">
            <div className="absolute top-3 left-3 text-teal-300">
              <Sparkles className="w-4 h-4" />
            </div>

            <AnimatePresence mode="wait">
              {currentThoughtIdx !== null ? (
                <motion.div
                  key={currentThoughtIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2 pt-2"
                >
                  <span className="text-[10px] bg-[#4DB6A3] text-white px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wide">
                    🐾 PENSAMIENTO DUQUIL
                  </span>
                  <p className="text-sm font-serif italic text-gray-800 leading-relaxed">
                    {duqueQuotes[currentThoughtIdx]}
                  </p>
                </motion.div>
              ) : (
                <div className="text-gray-400 text-xs text-center my-auto space-y-1">
                  <p className="font-bold text-teal-700">🦴 ¡El traductor duquil está listo! 🦴</p>
                  <p className="px-4">Presioná el botón de ladrar abajo para descifrar lo que tu perrita consentida quiere decirte en este día tan especial.</p>
                </div>
              )}
            </AnimatePresence>

            <span className="text-[9px] font-mono text-gray-400 text-right block mt-3">
              — Traducido con amor desde el lenguaje canino 🐕💬
            </span>
          </div>

          {/* Interactive Button Bar */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleBark}
              className="flex-1 bg-[#4DB6A3] hover:bg-[#3AA28F] text-white text-xs font-extrabold px-4 py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Pedir que Duque ladre 🐾</span>
            </button>

            <button
              onClick={handleFeedBone}
              className="bg-white border border-teal-200 hover:bg-teal-50 text-teal-700 text-xs font-bold px-4 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Bone className="w-4 h-4 text-emerald-500 animate-spin" />
              <span>Darle Huesito ({feedCount})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
