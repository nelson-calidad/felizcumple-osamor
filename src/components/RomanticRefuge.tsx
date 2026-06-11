import React, { useState } from "react";
import { Coffee, Smile, RefreshCw, CalendarDays, CheckCircle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RomanticRefugeProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

export default function RomanticRefuge({ onTriggerFloating }: RomanticRefugeProps) {
  const mateWaterTemp = 80;
  const [mateStatus, setMateStatus] = useState<"vacio" | "cebando" | "lleno" | "tomando">("vacio");
  const [totalMatesCebados, setTotalMatesCebados] = useState(0);
  const [mateThought, setMateThought] = useState("");

  const mateThoughts = [
    "Mates calentitos y charlas eternas. Gracias por cebar la paz de mi vida.",
    "Cada sorbo de mate con vos borra cualquier cansancio.",
    "Un mate amargo con tu mirada dulce es mi combinacion favorita.",
    "El mate esta en su punto perfecto: 80 grados de calor y 100 por ciento de amor.",
    "Un matecito mas, mientras hablamos de todo lo que se nos venga al corazon.",
    "Me encanta acariciarte la mano mientras sostenes el mate calentito.",
  ];

  const [spinning, setSpinning] = useState(false);
  const [datePlan, setDatePlan] = useState<{
    food: string;
    activity: string;
    mimo: string;
  } | null>(null);

  const foods = [
    "Una hamburguesa gigante con papas bien ricas.",
    "Un lomito calentito y completo para salvar la noche.",
    "Una pizza mitad y mitad para comer en el sillon.",
    "Unas medialunas dulces con mate amargo bien cebado.",
  ];

  const activities = [
    "Maraton de series coreanas o del kdrama que tengas ganas de ver.",
    "Noche relajante de skincare con masajes suaves.",
    "Caminar despacito de la mano al atardecer.",
    "Imaginar juntos nuestro proximo viaje o inventarnos uno nuevo.",
  ];

  const mimos = [
    "Dormir bien juntitos y abrazados.",
    "Escucharte hablar una hora entera de lo que amas con un mate de por medio.",
    "Besos suaves en la frente y mimos de cabeza.",
    "Un mensajito intimo recordandote lo valiosa que sos.",
  ];

  const handleCebarMate = (e: React.MouseEvent) => {
    if (mateStatus === "cebando" || mateStatus === "tomando") return;

    setMateStatus("cebando");
    onTriggerFloating(e.clientX, e.clientY, "Cebando un matecito");

    setTimeout(() => {
      setMateStatus("lleno");
      setTotalMatesCebados((prev) => prev + 1);
      const randomIdx = Math.floor(Math.random() * mateThoughts.length);
      setMateThought(mateThoughts[randomIdx]);
      onTriggerFloating(e.clientX, e.clientY, "Mate listo para vos");
    }, 1800);
  };

  const handleTomarMate = (e: React.MouseEvent) => {
    if (mateStatus !== "lleno") return;

    setMateStatus("tomando");
    onTriggerFloating(e.clientX, e.clientY, "Un sorbito con amor");

    setTimeout(() => {
      setMateStatus("vacio");
      setMateThought("");
      onTriggerFloating(e.clientX, e.clientY, "Cuando quieras te cebo otro");
    }, 1500);
  };

  const spinDate = (e: React.MouseEvent) => {
    if (spinning) return;
    setSpinning(true);
    setDatePlan(null);
    onTriggerFloating(e.clientX, e.clientY, "Pensando algo lindo para nosotros");

    let counter = 0;
    const interval = setInterval(() => {
      setDatePlan({
        food: foods[Math.floor(Math.random() * foods.length)],
        activity: activities[Math.floor(Math.random() * activities.length)],
        mimo: mimos[Math.floor(Math.random() * mimos.length)],
      });
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 150);
  };

  return (
    <div id="refuge-section" className="relative overflow-hidden rounded-3xl border border-[#4DB6A3]/25 bg-white/60 p-6 shadow-xl shadow-glow backdrop-blur-md md:p-8">
      <div className="mb-6 text-center md:text-left">
        <span className="rounded-full border border-[#4DB6A3]/20 bg-[#EAFDF9] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1B4D43]">
          Nuestro rinconcito
        </span>
        <h2 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-gray-800">
          Mates, planes y esa paz que me das
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Todo lo simple que con vos se vuelve mi parte favorita del dia.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-between rounded-[1.8rem] border border-teal-50 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,255,253,0.96))] p-5 shadow-sm">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono text-xs font-bold text-teal-800">
                <Coffee className="h-3.5 w-3.5" /> Un mate para vos
              </span>
              <span className="font-mono text-[10px] text-gray-400">Temp: {mateWaterTemp}C</span>
            </div>

            <p className="mb-4 text-left text-sm leading-relaxed text-gray-600">
              Para esas tardes nuestras en las que alcanza con un matecito y estar cerquita.
            </p>

            <div className="relative my-4 flex h-44 items-center justify-center">
              <AnimatePresence>
                {(mateStatus === "cebando" || mateStatus === "lleno") && (
                  <div className="absolute top-1 z-10 flex justify-center gap-1">
                    <motion.span
                      animate={{ y: [-10, -40], opacity: [0, 0.8, 0], scale: [1, 1.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                      className="h-6 w-1.5 rounded-full bg-teal-100/40 blur-[2px]"
                    />
                    <motion.span
                      animate={{ y: [-15, -45], opacity: [0, 0.7, 0], scale: [0.9, 1.4] }}
                      transition={{ duration: 1.7, repeat: Infinity, delay: 0.3 }}
                      className="h-6 w-1.5 rounded-full bg-teal-200/30 blur-[3px]"
                    />
                    <motion.span
                      animate={{ y: [-8, -35], opacity: [0, 0.9, 0], scale: [1, 1.2] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0.6 }}
                      className="h-6 w-1.5 rounded-full bg-white/40 blur-[1px]"
                    />
                  </div>
                )}
              </AnimatePresence>

              <div className="relative flex h-28 w-28 items-end justify-center overflow-hidden rounded-b-[40px] rounded-t-[10px] border-4 border-[#3AA28F] bg-[#1B4D43] p-1 shadow-md">
                <div className="absolute inset-x-0 top-0 h-4 border-b border-yellow-600/30 bg-teal-950/85" />

                <AnimatePresence>
                  {(mateStatus === "lleno" || mateStatus === "cebando") && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "45%" }}
                      exit={{ height: 0 }}
                      className="absolute inset-x-1.5 bottom-4 flex items-center justify-center rounded-b-3xl bg-sky-200/30"
                    >
                      <span className="absolute left-4 top-1 h-1 w-1 animate-ping rounded-full bg-[#4DB6A3]" />
                      <span className="absolute right-6 top-2 h-1.5 w-1.5 animate-pulse rounded-full bg-teal-100/60" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute left-1/2 top-[-3rem] h-20 w-2 origin-bottom rotate-[15deg] rounded-full border-r border-gray-300 bg-gray-200">
                  <div className="absolute -left-0.5 top-0 h-3 w-3 rounded-full border border-gray-400 bg-gray-300" />
                </div>

                <span className="z-10 mb-2 block font-mono text-[9px] font-bold uppercase tracking-widest text-[#EAFDF9]">
                  {mateStatus}
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {mateThought && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-2 rounded-xl border border-teal-100 bg-[#EAFDF9] p-3 text-center font-serif text-xs italic leading-relaxed text-[#1B4D43]"
                >
                  "{mateThought}"
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              disabled={mateStatus === "cebando" || mateStatus === "lleno" || mateStatus === "tomando"}
              onClick={handleCebarMate}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#4DB6A3] py-2.5 text-xs font-bold text-white transition-all hover:bg-[#3AA28F] active:scale-95 disabled:bg-gray-100 disabled:text-gray-400"
            >
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span>Cebarlo</span>
            </button>

            <button
              disabled={mateStatus !== "lleno"}
              onClick={handleTomarMate}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#1B4D43] py-2.5 text-xs font-bold text-[#EAFDF9] transition-all hover:bg-[#143B33] active:scale-95 disabled:bg-gray-100 disabled:text-gray-400"
            >
              <Smile className="h-3.5 w-3.5 shrink-0" />
              <span>Tomarlo</span>
            </button>
          </div>

          <div className="mt-3 text-center font-mono text-[10px] text-gray-400">
            Ya van <span className="font-bold text-[#1B4D43]">{totalMatesCebados}</span> matecitos compartidos
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[1.8rem] border border-teal-50 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,255,253,0.96))] p-5 text-left shadow-sm">
          <div>
            <span className="mb-2 flex items-center gap-1 font-mono text-xs font-bold text-teal-800">
              <CalendarDays className="h-3.5 w-3.5" /> Una idea para nosotros
            </span>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              Por si pinta dejar que el azar nos arme una salida linda.
            </p>

            <div className="relative flex min-h-[148px] flex-col justify-center overflow-hidden rounded-2xl border border-teal-100/50 bg-teal-50/50 p-4">
              <AnimatePresence mode="wait">
                {datePlan ? (
                  <motion.div
                    key={datePlan.food}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-3"
                  >
                    <div className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="w-16 shrink-0 pt-0.5 text-right font-mono text-[#1B4D43]">Comida:</span>
                      <span className="font-medium text-gray-800">{datePlan.food}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="w-16 shrink-0 pt-0.5 text-right font-mono text-[#1B4D43]">Plan:</span>
                      <span className="font-medium text-gray-800">{datePlan.activity}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="w-16 shrink-0 pt-0.5 text-right font-mono text-[#1B4D43]">Mimo:</span>
                      <span className="font-serif italic text-teal-900">"{datePlan.mimo}"</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-1.5 py-4 text-center text-xs text-gray-400">
                    <RefreshCw className={`mx-auto h-8 w-8 text-teal-300 ${spinning ? "animate-spin text-[#4DB6A3]" : ""}`} />
                    <p className="font-bold text-teal-800">A ver que plan nos toca hoy</p>
                    <p className="px-5">Capaz sale algo simple, capaz algo demasiado lindo.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {datePlan && !spinning && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] text-emerald-600"
              >
                <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Este plan ya me gusta.</span>
              </motion.div>
            )}
          </div>

          <button
            disabled={spinning}
            onClick={spinDate}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4DB6A3] py-2.5 text-xs font-extrabold text-white shadow-sm transition-all hover:bg-[#3AA28F] active:scale-95 disabled:bg-teal-200"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`} />
            <span>{spinning ? "Pensando algo lindo..." : "Ver que nos toca"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
