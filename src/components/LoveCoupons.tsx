import React, { useState } from "react";
import { Ticket, Heart, Check, Clock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LoveCouponsProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

interface Coupon {
  id: string;
  title: string;
  emoji: string;
  description: string;
  conditions: string;
  code: string;
}

export default function LoveCoupons({ onTriggerFloating }: LoveCouponsProps) {
  const [claimedCoupons, setClaimedCoupons] = useState<Record<string, boolean>>({});
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  const coupons: Coupon[] = [
    {
      id: "mate",
      title: "Vale por un mate amargo preparado con amor",
      emoji: "🧉",
      description: "Un mate calentito, cebado con paciencia, para tomar juntos mientras charlamos tranquilos.",
      conditions: "Canjeable en cualquier tarde de estudio, desvelo o charla de la vida.",
      code: "LOVE-MATES-26",
    },
    {
      id: "lomito",
      title: "Vale por una salida de hamburguesas o lomito",
      emoji: "🍔",
      description: "Un antojo libre. Salimos de la mano por esa comida rica que siempre nos salva la noche.",
      conditions: "Valido para cuando no quieras cocinar o andes con un antojo tremendo.",
      code: "BURGER-LOMITO-WIN",
    },
    {
      id: "skincare",
      title: "Noche de mimos, masajes y skincare",
      emoji: "💆‍♀️",
      description: "Mascarillas, caricias suaves y una noche para aflojar el cuerpo y quedarnos pegaditos.",
      conditions: "Ideal despues de una semana larga o de un dia que te haya cansado demasiado.",
      code: "SKINCARE-REINA-26",
    },
    {
      id: "dorama",
      title: "Tarde entera de serie coreana o kdrama",
      emoji: "🍿",
      description: "Maraton con comida rica, abrazo de por medio y todo el tiempo del mundo para verla con vos.",
      conditions: "Ese dia no hay quejas ni distracciones.",
      code: "K-DRAMA-MARATHON",
    },
    {
      id: "abrazoso",
      title: "Abrazo de oso inmune a las preocupaciones",
      emoji: "🧸",
      description: "Te apoyas en mi pecho, cerras los ojos y yo te abrazo hasta que todo pese un poco menos.",
      conditions: "No expira nunca y se puede acumular con mates infinitos.",
      code: "ABRAZO-DE-OSO-ETERNO",
    },
    {
      id: "caminata",
      title: "Caminata romantica de la mano sin prisa",
      emoji: "💫",
      description: "Caminar despacito, hablar de cualquier cosa linda y dejar que el rato se haga largo.",
      conditions: "Canjeable en cualquier atardecer que nos encuentre con ganas de salir.",
      code: "CAMINO-CON-VOS-100",
    },
  ];

  const handleClaim = (coupon: Coupon, e: React.MouseEvent) => {
    setClaimedCoupons((prev) => ({ ...prev, [coupon.id]: true }));
    onTriggerFloating(e.clientX, e.clientY, `Esto ya te lo prometi: ${coupon.title}`);
    setActiveCoupon(coupon);
  };

  return (
    <div id="coupons-section" className="relative overflow-hidden rounded-3xl border border-[#4DB6A3]/25 bg-white/60 p-6 shadow-xl shadow-glow backdrop-blur-md md:p-8">
      <div className="absolute right-0 top-0 p-4 text-teal-800 opacity-5">
        <Ticket className="h-24 w-24 -rotate-12" />
      </div>

      <div className="mb-6">
        <span className="rounded-full border border-[#4DB6A3]/20 bg-[#EAFDF9] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1B4D43]">
          Para cuando te den ganas
        </span>
        <h2 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-gray-800">
          Unas promesas lindas para vos
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Pequenas invitaciones a repetir todo eso que nos hace bien.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((coupon) => {
          const isClaimed = !!claimedCoupons[coupon.id];
          return (
            <motion.div
              key={coupon.id}
              whileHover={{ y: -4 }}
              className={`relative flex min-h-[180px] flex-col justify-between rounded-2xl border bg-white p-4 text-left transition-all ${
                isClaimed
                  ? "border-emerald-200 bg-emerald-50/20 shadow-sm"
                  : "border-teal-100 shadow-sm hover:border-[#4DB6A3]/40 hover:shadow-md"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="shrink-0 rounded-lg bg-[#EAFDF9] p-1.5 text-xl">{coupon.emoji}</span>
                {isClaimed ? (
                  <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-emerald-600">
                    <Check className="h-3 w-3" /> Guardado
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full border border-teal-100 bg-teal-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-teal-600">
                    <Clock className="h-3 w-3 text-[#4DB6A3]" /> Esperandote
                  </span>
                )}
              </div>

              <div className="mb-3 flex-1">
                <h4 className="text-sm font-extrabold leading-tight text-gray-800">{coupon.title}</h4>
                <p className="mt-1.5 font-serif text-[11px] leading-relaxed text-gray-500">
                  {coupon.description}
                </p>
              </div>

              <button
                disabled={isClaimed}
                onClick={(e) => handleClaim(coupon, e)}
                className={`w-full rounded-xl py-2 text-xs font-bold transition-all ${
                  isClaimed
                    ? "cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "cursor-pointer bg-[#4DB6A3] text-white shadow-sm hover:bg-[#3AA28F] hover:shadow active:scale-95"
                }`}
              >
                {isClaimed ? "Ya te pertenece" : "Guardarmelo"}
              </button>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setActiveCoupon(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -15 }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-emerald-200 bg-white p-6 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute right-0 top-0 -z-10 p-8 text-emerald-100">
                <ShieldCheck className="h-20 w-20" />
              </div>

              <div className="mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm">
                <Heart className="h-6 w-6 animate-pulse fill-emerald-150" />
              </div>

              <h4 className="mb-0.5 font-mono text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                Esto ya quedo prometido
              </h4>
              <h3 className="text-lg font-extrabold text-gray-800">Un plan esperandote</h3>

              <div className="my-4 space-y-2.5 border-y border-dashed border-gray-100 py-3.5 text-left text-xs text-gray-600">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-gray-400">Lo que me vas a pedir:</span>
                  <span className="font-bold text-gray-800">{activeCoupon.title}</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-gray-400">Cuando quieras:</span>
                  <p className="mt-0.5 font-serif italic text-gray-500">{activeCoupon.conditions}</p>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-emerald-50/50 px-3 py-1 font-mono text-[10px] font-bold text-emerald-700">
                  <span>Senal secreta:</span>
                  <span>{activeCoupon.code}</span>
                </div>
              </div>

              <p className="font-serif text-[11px] leading-normal text-gray-500">
                Cuando te den ganas, me lo mostras y yo ya se que toca.
              </p>

              <button
                onClick={() => setActiveCoupon(null)}
                className="mt-4 w-full cursor-pointer rounded-xl bg-[#4DB6A3] py-2 text-xs font-extrabold text-white transition-all hover:bg-[#3AA28F] active:scale-95"
              >
                Seguir mirando
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
