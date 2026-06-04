import React, { useState } from "react";
import { Ticket, Sparkles, Heart, Check, Clock, ShieldCheck } from "lucide-react";
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
      title: "Vale por un Mate Amargo Preparado con Amor 🧉",
      emoji: "🧉",
      description: "Un mate calentito, amargo, cebado con toda la paciencia y dedicación del cosmos para tomar juntos mientras charlamos.",
      conditions: "Canjeable en cualquier tarde de estudio, desvelo o charla de la vida.",
      code: "LOVE-MATES-26"
    },
    {
      id: "lomito",
      title: "Vale por una Salida por Hamburguesas o Lomitazo 🍔🍟",
      emoji: "🍔",
      description: "Un antojo libre. Salimos de la mano por ese lomito o hamburguesa riquísima que nos salva la noche y nos hace tan felices de lo simple.",
      conditions: "Válido para cuando no quieras cocinar o andes con antojo tremendo.",
      code: "BURGER-LOMITO-WIN"
    },
    {
      id: "skincare",
      title: "Noche de Mimos, Masajes y Skincare 💆‍♀️🧴",
      emoji: "💆‍♀️",
      description: "Nos ponemos mascarillas faciales juntos, te hago masajes suaves en la cabeza o espalda y nos quedamos acurrucados con total tranquilidad.",
      conditions: "Ideal para relajarte después de una larga semana de estudio o trabajo.",
      code: "SKINCARE-REINA-26"
    },
    {
      id: "dorama",
      title: "Tarde entera de Serie Coreana o Kdrama sin Quejas 🍿📺",
      emoji: "🍿",
      description: "Maratón de tu serie coreana o Kdrama preferido. Yo preparo los pochoclos o comida, me quedo abrazado a vos y lloramos o charlamos de la historia de corrido.",
      conditions: "El novio no puede quejarse ni distraerse con el celular.",
      code: "K-DRAMA-MARATHON"
    },
    {
      id: "abrazoso",
      title: "Abrazo de Oso Inmune a las Preocupaciones 🧸💚",
      emoji: "🧸",
      description: "Apoyás tu cabecita en mi pecho, cerrás los ojos y te aprieto fuerte borrando del mapa el trabajo, el estudio y cualquier cansancio.",
      conditions: "No expira nunca y se puede acumular con mates infinitos.",
      code: "ABRAZO-DE-OSO-ETERNO"
    },
    {
      id: "caminata",
      title: "Caminata Romántica de la Mano sin Prisa 🚶‍♂️🚶‍♀️",
      emoji: "💫",
      description: "Caminar bien despacito de la mano, disfrutando del paisaje o las calles, hablando de cualquier locura linda que venga para nosotros.",
      conditions: "Canjeable en cualquier atardecer despejado.",
      code: "CAMINO-CON-VOS-100"
    }
  ];

  const handleClaim = (coupon: Coupon, e: React.MouseEvent) => {
    setClaimedCoupons((prev) => ({ ...prev, [coupon.id]: true }));
    onTriggerFloating(e.clientX, e.clientY, `¡Canjeaste: ${coupon.title}! 🎫💖`);
    setActiveCoupon(coupon);
  };

  return (
    <div id="coupons-section" className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-[#4DB6A3]/25 relative overflow-hidden shadow-glow">
      <div className="absolute top-0 right-0 p-4 opacity-5 text-teal-800">
        <Ticket className="w-24 h-24 -rotate-12" />
      </div>

      <div className="mb-6">
        <span className="text-xs font-semibold bg-[#EAFDF9] text-[#1B4D43] px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-[#4DB6A3]/20">
          Talonario Digital de Amor 🎫✨
        </span>
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mt-2 font-sans">
          Cuponera de Vales de Amor
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Un cofre interactivo de promesas tiernas y planes cotidianos. Presentale cualquiera de estos cupones a tu novio y él se compromete a cumplirlos de inmediato.
        </p>
      </div>

      {/* Grid of Coupons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => {
          const isClaimed = !!claimedCoupons[coupon.id];
          return (
            <motion.div
              key={coupon.id}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl p-4 border transition-all text-left flex flex-col justify-between min-h-[180px] bg-white ${
                isClaimed 
                  ? "border-emerald-200 bg-emerald-50/20 shadow-sm" 
                  : "border-teal-100 hover:border-[#4DB6A3]/40 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Card Ribbon Style Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl shrink-0 p-1.5 rounded-lg bg-[#EAFDF9]">{coupon.emoji}</span>
                {isClaimed ? (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 font-mono uppercase">
                    <Check className="w-3 h-3" /> Canjeado
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#4DB6A3]" /> Disponible
                  </span>
                )}
              </div>

              {/* Coupon Info */}
              <div className="flex-1 mb-3">
                <h4 className="font-extrabold text-sm text-gray-800 leading-tight">
                  {coupon.title}
                </h4>
                <p className="text-gray-500 text-[11px] mt-1.5 leading-relaxed font-serif">
                  {coupon.description}
                </p>
              </div>

              {/* Button Action */}
              <button
                disabled={isClaimed}
                onClick={(e) => handleClaim(coupon, e)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  isClaimed
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-700 cursor-default"
                    : "bg-[#4DB6A3] hover:bg-[#3AA28F] text-white active:scale-95 cursor-pointer shadow-sm hover:shadow"
                }`}
              >
                {isClaimed ? "✓ Cupón Presentado" : "Presentar Cupón canjeable 💞"}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Ticket Overlay Details Modal simulation on submit */}
      <AnimatePresence>
        {activeCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveCoupon(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -15 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-emerald-200 shadow-2xl relative text-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 p-8 text-emerald-100 -z-10">
                <ShieldCheck className="w-20 h-20" />
              </div>

              {/* Holographic heart ribbon design top */}
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100 mb-2.5">
                <Heart className="w-6 h-6 fill-emerald-150 animate-pulse" />
              </div>

              <h4 className="text-xs font-extrabold text-emerald-600 tracking-wider font-mono uppercase mb-0.5">
                ¡CANJE EXitoso! 🎫✨
              </h4>
              <h3 className="text-lg font-extrabold text-gray-850">
                Ticket de Plan de Amor
              </h3>

              <div className="border-t border-b border-dashed border-gray-100 py-3.5 my-4 space-y-2.5 text-left text-xs text-gray-600">
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400 block">Elemento Canjeado:</span>
                  <span className="font-bold text-gray-800">{activeCoupon.title}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400 block">Condición para papá:</span>
                  <p className="font-serif italic text-gray-500 mt-0.5">{activeCoupon.conditions}</p>
                </div>
                <div className="flex justify-between items-center bg-emerald-50/50 rounded-xl px-3 py-1 text-[10px] font-mono font-bold text-emerald-700">
                  <span>CÓDIGO DE VALIDACIÓN:</span>
                  <span>{activeCoupon.code}</span>
                </div>
              </div>

              <p className="text-gray-400 text-[10px] leading-normal font-sans">
                Sacale captura o decile a tu amorcito. ¡Él está obligado por ley de novio a cumplirte con mates o mimos!
              </p>

              <button
                onClick={() => setActiveCoupon(null)}
                className="mt-4 w-full py-2 bg-[#4DB6A3] text-white text-xs font-extrabold rounded-xl hover:bg-[#3AA28F] active:scale-95 transition-all cursor-pointer"
              >
                Cerrar cupón 💚
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
