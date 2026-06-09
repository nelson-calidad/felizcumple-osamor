import React, { useState } from "react";
import { Bone, Heart, Sparkles, Volume2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface DuqueCornerProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

export default function DuqueCorner({ onTriggerFloating }: DuqueCornerProps) {
  const [currentThoughtIdx, setCurrentThoughtIdx] = useState<number | null>(null);
  const [feedCount, setFeedCount] = useState(0);

  const duqueQuotes = [
    "¡Guau! Flor, a mí me encanta estar cerquita tuyo y mirarte con carita tierna hasta que me regales unos mimitos.",
    "¡Gufr! Dame más caricias en la pancita. Vos siempre sabés cómo hacerme sentir querida.",
    "¡Guau guau! Me encanta cuando jugás conmigo y me hacés sentir parte de todo con tanto amor.",
    "¡Wuff! Yo sé que a vos te gusta intentar que me suba a la cama, aunque a veces no te dejen. Igual yo siempre quiero quedarme cerca tuyo.",
    "Si vos estás tomando mates, yo feliz me siento al lado tuyo acompañándote con mi colita moviéndose.",
    "Yo ya aprendí que a vos te gustan las hamburguesas con cheddar, los mates, los mimos y que te den mucho amor. Por eso me gusta tanto estar con vos.",
  ];

  const handleBark = (e: React.MouseEvent) => {
    const randomIdx = Math.floor(Math.random() * duqueQuotes.length);
    setCurrentThoughtIdx(randomIdx);
    onTriggerFloating(e.clientX, e.clientY, "La Duque te dejó un mensajito");
  };

  const handleFeedBone = (e: React.MouseEvent) => {
    setFeedCount((prev) => prev + 1);
    onTriggerFloating(e.clientX, e.clientY, "La Duque recibió un huesito");
  };

  return (
    <div
      id="duque-section"
      className="relative overflow-hidden rounded-3xl border border-[#4DB6A3]/25 bg-white/60 p-6 shadow-xl backdrop-blur-md shadow-glow md:p-8"
    >
      <div className="absolute right-0 top-0 p-4 text-teal-800 opacity-5">
        <Bone className="h-24 w-24 rotate-45" />
      </div>

      <div className="mb-6">
        <span className="rounded-full border border-[#4DB6A3]/20 bg-[#EAFDF9] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1B4D43]">
          La consentida que te quiere mucho 👑🐾
        </span>
        <h2 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-gray-800">
          El Rincón Especial de la Duque
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          La Duque ama estar cerquita tuyo, recibir tus mimos y acompañarte con toda su
          ternura. Tocá para escuchar uno de sus mensajitos.
        </p>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
        <div className="flex flex-col items-center md:col-span-5">
          <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-[#4DB6A3] bg-[#EAFDF9] p-1 shadow-lg">
            <div className="animate-bounce select-none text-6xl duration-1000">🐕</div>
            <div
              className="absolute right-1 top-1 rounded-full bg-amber-400 p-1 text-[10px] font-extrabold text-amber-950 shadow-sm"
              title="Reina"
            >
              👑
            </div>
          </div>

          <div className="mt-3 text-center">
            <h4 className="font-sans text-lg font-extrabold text-gray-800">La Duque Lihue</h4>
            <p className="font-mono text-xs font-medium text-teal-700">
              Fiel compañera de mimos y cercanía
            </p>
          </div>

          <div className="mt-4 w-full space-y-2 rounded-2xl border border-gray-100 bg-white/80 p-3.5 text-left text-xs">
            <div className="flex justify-between">
              <span className="font-mono text-gray-400">Cariño por Flor:</span>
              <span className="font-bold text-teal-600">Infinito y baboso</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-gray-400">Plan favorito:</span>
              <span className="font-bold text-teal-600">Estar pegadita a Flor</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-gray-400">Datos de Flor:</span>
              <span className="font-bold text-teal-600">Cheddar, mates y mimos</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono font-bold text-[#1B4D43] text-gray-400">Huesitos recibidos hoy:</span>
              <span className="rounded-full border border-teal-100 bg-teal-50 px-2 font-bold text-teal-600">
                {feedCount} 🍖
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:col-span-7">
          <div className="relative flex min-h-[140px] flex-col justify-between rounded-2xl border border-[#4DB6A3]/20 bg-[#EAFDF9]/70 p-5 text-left shadow-inner">
            <div className="absolute left-3 top-3 text-teal-300">
              <Sparkles className="h-4 w-4" />
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
                  <span className="rounded-full bg-[#4DB6A3] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-white">
                    🐾 Mensajito de la Duque
                  </span>
                  <p className="font-serif text-sm italic leading-relaxed text-gray-800">
                    {duqueQuotes[currentThoughtIdx]}
                  </p>
                </motion.div>
              ) : (
                <div className="my-auto space-y-1 text-center text-xs text-gray-400">
                  <p className="font-bold text-teal-700">🐾 La Duque tiene algo para decirte 🐾</p>
                  <p className="px-4">Tocá el botón y escuchá uno de sus mensajitos para vos.</p>
                </div>
              )}
            </AnimatePresence>

            <span className="mt-3 block text-right font-mono text-[9px] text-gray-400">
              — Traducido con amor desde el lenguaje canino 🐕💬
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleBark}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4DB6A3] px-4 py-3 text-xs font-extrabold text-white shadow-md transition-all hover:bg-[#3AA28F] active:scale-95"
            >
              <Volume2 className="h-4 w-4" />
              <span>Escuchar a la Duque 🐾</span>
            </button>

            <button
              onClick={handleFeedBone}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-teal-200 bg-white px-4 py-3 text-xs font-bold text-teal-700 transition-all hover:bg-teal-50 active:scale-95"
            >
              <Bone className="h-4 w-4 animate-spin text-emerald-500" />
              <span>Darle Huesito ({feedCount})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
