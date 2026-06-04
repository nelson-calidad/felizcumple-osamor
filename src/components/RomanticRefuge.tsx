import React, { useState, useEffect } from "react";
import { Coffee, Sparkles, Heart, Utensils, Smile, RefreshCw, CalendarDays, Timer, CheckCircle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RomanticRefugeProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

export default function RomanticRefuge({ onTriggerFloating }: RomanticRefugeProps) {
  // --- MATE CEBADOR DIGITAL STATE ---
  const [mateWaterTemp, setMateWaterTemp] = useState(80);
  const [mateStatus, setMateStatus] = useState<"vacío" | "cebando" | "lleno" | "tomando">("vacío");
  const [totalMatesCebados, setTotalMatesCebados] = useState(0);
  const [mateThought, setMateThought] = useState("");

  const mateThoughts = [
    "¡Mates calentitos y charlas eternas! Gracias por cebar la paz de mi vida. 🧉💚",
    "Cada sorbo de mate con vos borra cualquier examen difícil de Hemoterapia o cansancio laboral. 🧬🩸",
    "Un mate amargo con tu mirada dulce es mi combinación favorita en el universo entero.",
    "El mate está en su punto perfecto: 80°C de calor y 100% de amor eterno. 🌡️✨",
    "¿Un matecito más charlando de nuestros próximos proyectos y metas juntos? Sí, siempre.",
    "Me encanta acariciar tu mano fría mientras sostenés el mate calentito. ¡Somos la dupla perfecta! 🧸🤝"
  ];

  // --- CREADOR DE CITAS PERFECTAS ---
  const [spinning, setSpinning] = useState(false);
  const [datePlan, setDatePlan] = useState<{
    food: string;
    activity: string;
    mimo: string;
  } | null>(null);

  const foods = [
    "🍔 Una hamburguesa gigante doble con queso y muchas papás fritas ricas.",
    "🥩 Un lomito espectacular calentito y bien completo para salvar la noche.",
    "🍕 Una pizza mitad y mitad con mate helado o gaseosa en el sillón.",
    "🥐 Unas ricas medialunas dulces tostadas con un mate amargo bien cebado."
  ];

  const activities = [
    "📺 Maratón de series coreanas o de tu Kdrama del momento sin distracciones.",
    "💆‍♀️ Noche relajante de skincare completo con mascarillas y masajes suaves.",
    "🚶‍♂️ Caminar despacito de la mano al atardecer sin prisa por ningún lado.",
    "🗺️ Planificar e imaginar juntos nuestro próximo viaje de aventuras."
  ];

  const mimos = [
    "🧸 Dormir bien juntitos y abrazados en el pecho de tu novio sintiendo su paz.",
    "💫 Promesa del novio de escucharte hablar una hora entera sobre Hemoterapia con mate de por medio.",
    "💐 Besos suaves ilimitados en la frente y mimos relajantes de cabeza.",
    "💌 Un mensaje reflexivo e íntimo directo de mi corazón recordándote tu valor."
  ];

  const handleCebarMate = (e: React.MouseEvent) => {
    if (mateStatus === "cebando" || mateStatus === "tomando") return;
    
    setMateStatus("cebando");
    onTriggerFloating(e.clientX, e.clientY, "💧 Cebando mate calentito... 🧉");
    
    setTimeout(() => {
      setMateStatus("lleno");
      setTotalMatesCebados((prev) => prev + 1);
      const randomIdx = Math.floor(Math.random() * mateThoughts.length);
      setMateThought(mateThoughts[randomIdx]);
      onTriggerFloating(e.clientX, e.clientY, "✨ ¡Mate listo para tomar! 🧉💖");
    }, 1800);
  };

  const handleTomarMate = (e: React.MouseEvent) => {
    if (mateStatus !== "lleno") return;
    
    setMateStatus("tomando");
    onTriggerFloating(e.clientX, e.clientY, "😋 ¡Matecito tomado con amor! 🌱");
    
    setTimeout(() => {
      setMateStatus("vacío");
      setMateThought("");
      onTriggerFloating(e.clientX, e.clientY, "🧉 El mate quedó vacío. ¡Cebá otro!");
    }, 1500);
  };

  const spinDate = (e: React.MouseEvent) => {
    if (spinning) return;
    setSpinning(true);
    setDatePlan(null);
    onTriggerFloating(e.clientX, e.clientY, "🎰 ¡Combinando ingredientes de amor! 💫");

    let counter = 0;
    const interval = setInterval(() => {
      setDatePlan({
        food: foods[Math.floor(Math.random() * foods.length)],
        activity: activities[Math.floor(Math.random() * activities.length)],
        mimo: mimos[Math.floor(Math.random() * mimos.length)]
      });
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 150);
  };

  return (
    <div id="refuge-section" className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-[#4DB6A3]/25 relative overflow-hidden shadow-glow">
      
      <div className="mb-6 text-center md:text-left">
        <span className="text-xs font-semibold bg-[#EAFDF9] text-[#1B4D43] px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-[#4DB6A3]/20">
          Refugio de Mates y Citas 🧉💫
        </span>
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mt-2 font-sans">
          Nuestro Rincón Cotidiano Estilo "Vos y Yo"
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Un espacio interactivo diseñado para simular nuestras tardes perfectas. Cebá un mate caliente, creá planes de citas instantáneos o relajate con las ocurrencias de nuestra rutina.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: EL MATE CEBADOR INTERACTIVO */}
        <div className="bg-white/70 p-5 rounded-2xl border border-teal-50 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono font-bold text-teal-800 flex items-center gap-1">
                <Coffee className="w-3.5 h-3.5" /> CEBADOR VIRTUAL DE MATES
              </span>
              <span className="text-[10px] font-mono text-gray-400"> Temp: {mateWaterTemp}°C (Ideal)</span>
            </div>
            
            <p className="text-xs text-gray-650 leading-relaxed mb-4 text-left">
              ¿Estás cansada de estudiar Hemoterapia o de un día largo? Cebate un mate digital. Presioná para cebar, esperá que esté listo y tomátelo charlando conmigo.
            </p>

            {/* Mate Visual Container */}
            <div className="h-44 flex items-center justify-center relative my-4">
              
              {/* Vapor animation when full or pouring */}
              <AnimatePresence>
                {(mateStatus === "cebando" || mateStatus === "lleno") && (
                  <div className="absolute top-1 flex gap-1 justify-center z-10">
                    <motion.span 
                      animate={{ y: [-10, -40], opacity: [0, 0.8, 0], scale: [1, 1.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-6 bg-teal-100/40 rounded-full filter blur-[2px]"
                    />
                    <motion.span 
                      animate={{ y: [-15, -45], opacity: [0, 0.7, 0], scale: [0.9, 1.4] }}
                      transition={{ duration: 1.7, repeat: Infinity, delay: 0.3 }}
                      className="w-1.5 h-6 bg-teal-200/30 rounded-full filter blur-[3px]"
                    />
                    <motion.span 
                      animate={{ y: [-8, -35], opacity: [0, 0.9, 0], scale: [1, 1.2] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0.6 }}
                      className="w-1.5 h-6 bg-white/40 rounded-full filter blur-[1px]"
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* The Mate Cup Cup Representation */}
              <div className="w-28 h-28 bg-[#1B4D43] rounded-b-[40px] rounded-t-[10px] border-4 border-[#3AA28F] shadow-md flex items-end justify-center relative p-1 overflow-hidden">
                {/* Grass (Yerba) Background Ring */}
                <div className="absolute top-0 inset-x-0 h-4 bg-teal-980/85 border-b border-yellow-600/30" />
                
                {/* Water overlay */}
                <AnimatePresence>
                  {(mateStatus === "lleno" || mateStatus === "cebando") && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "45%" }}
                      exit={{ height: 0 }}
                      className="absolute bottom-4 inset-x-1.5 bg-sky-200/30 rounded-b-3xl flex items-center justify-center"
                    >
                      {/* Interactive foam bubbles */}
                      <span className="w-1 h-1 bg-[#4DB6A3] rounded-full absolute top-1 left-4 animate-ping" />
                      <span className="w-1.5 h-1.5 bg-teal-100/60 rounded-full absolute top-2 right-6 animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bombilla Straw */}
                <div className="absolute -top-12 left-1/2 -translate-x-[2px] w-2 h-20 bg-gray-200 border-r border-gray-300 rounded-full origin-bottom rotate-[15deg]">
                  <div className="w-3 h-3 bg-gray-300 rounded-full absolute top-0 -left-0.5 border border-gray-450" />
                </div>

                {/* Mate text indicator */}
                <span className="text-[9px] font-mono font-bold text-[#EAFDF9] z-10 mb-2 uppercase tracking-widest block">
                  {mateStatus}
                </span>
              </div>
            </div>

            {/* Mate thoughts text box */}
            <AnimatePresence mode="wait">
              {mateThought && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#EAFDF9] p-3 rounded-xl border border-teal-100 text-[#1B4D43] italic text-xs leading-relaxed font-serif text-center mt-2"
                >
                  "{mateThought}"
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mate action buttons */}
          <div className="mt-4 flex gap-3">
            <button
              disabled={mateStatus === "cebando" || mateStatus === "lleno" || mateStatus === "tomando"}
              onClick={handleCebarMate}
              className="flex-1 bg-[#4DB6A3] hover:bg-[#3AA28F] disabled:bg-gray-100 text-white disabled:text-gray-400 text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>Cebar Mate 🧉</span>
            </button>

            <button
              disabled={mateStatus !== "lleno"}
              onClick={handleTomarMate}
              className="flex-1 bg-[#1B4D43] hover:bg-[#143B33] disabled:bg-gray-100 text-[#EAFDF9] disabled:text-gray-400 text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Smile className="w-3.5 h-3.5 shrink-0" />
              <span>Tomar un sorbo 😋</span>
            </button>
          </div>
          
          <div className="text-[10px] text-gray-400 font-mono text-center mt-3">
            Total mates compartidos en esta sesión: <span className="font-bold text-[#1B4D43]">{totalMatesCebados}</span> 🧉
          </div>
        </div>

        {/* RIGHT COLUMN: EL PLANIFICADOR DE CITAS PERFECTAS */}
        <div className="bg-white/70 p-5 rounded-2xl border border-teal-50 flex flex-col justify-between shadow-sm text-left">
          <div>
            <span className="text-xs font-mono font-bold text-teal-800 flex items-center gap-1 mb-2">
              <CalendarDays className="w-3.5 h-3.5" /> PLANIFICADOR DE CITAS AL AZAR
            </span>
            <p className="text-xs text-gray-655 leading-relaxed mb-4">
              ¿No saben qué hacer el fin de semana o en su próxima tarde juntos? Dejen que el universo conspire a su favor combinando una comida rica, una actividad de relax y un mimo inolvidable.
            </p>

            <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100/50 min-h-[148px] flex flex-col justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {datePlan ? (
                  <motion.div
                    key={datePlan.food} // Trigger animation on change
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-3"
                  >
                    <div className="flex gap-2 items-start text-xs text-gray-700">
                      <span className="font-bold font-mono tracking-wider text-[#1B4D43] uppercase w-16 text-right pt-0.5 shrink-0">Comida:</span>
                      <span className="font-medium text-gray-800">{datePlan.food}</span>
                    </div>
                    <div className="flex gap-2 items-start text-xs text-gray-700">
                      <span className="font-bold font-mono tracking-wider text-[#1B4D43] uppercase w-16 text-right pt-0.5 shrink-0">Plan:</span>
                      <span className="font-medium text-gray-800">{datePlan.activity}</span>
                    </div>
                    <div className="flex gap-2 items-start text-xs text-gray-700">
                      <span className="font-bold font-mono tracking-wider text-[#1B4D43] uppercase w-16 text-right pt-0.5 shrink-0">Mimo:</span>
                      <span className="font-medium text-gray-800 font-serif italic text-teal-900">"{datePlan.mimo}"</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-xs text-gray-450 space-y-1.5 py-4">
                    <RefreshCw className={`w-8 h-8 mx-auto text-teal-300 ${spinning ? "animate-spin text-[#4DB6A3]" : ""}`} />
                    <p className="font-bold text-teal-800">✨ ¿Cuál será la cita perfecta de hoy? ✨</p>
                    <p className="px-5">Presioná el botón de abajo para activar los engranajes e inventar un plan espectacular.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            {datePlan && !spinning && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-150 font-mono"
              >
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>¡Perfecto! Plan aprobado por ley de noviolandia.</span>
              </motion.div>
            )}
          </div>

          <button
            disabled={spinning}
            onClick={spinDate}
            className="w-full mt-4 bg-[#4DB6A3] hover:bg-[#3AA28F] disabled:bg-teal-200 text-white text-xs font-extrabold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${spinning ? "animate-spin" : ""}`} />
            <span>{spinning ? "Girando opciones mágicas..." : "Generar Plan de Cita 🎰✨"}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
