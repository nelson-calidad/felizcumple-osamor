import React, { useState } from "react";
import { CheckCircle2, Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface BirthdayLetterProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
  loveLetterImg: string;
}

export default function BirthdayLetter({
  onTriggerFloating,
  loveLetterImg,
}: BirthdayLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleOpenEnvelope = (e: React.MouseEvent) => {
    setIsOpen(!isOpen);
    onTriggerFloating(
      e.clientX,
      e.clientY,
      isOpen ? "La cartita quedo guardada otra vez" : "Se abrio la parte donde me regalo por vos",
    );
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    onTriggerFloating(window.innerWidth / 2, window.innerHeight / 2, "Llego un beso de vuelta");
    setTimeout(() => {
      setIsSent(false);
      setReplyText("");
    }, 4500);
  };

  return (
    <div id="letter-section" className="flex flex-col items-center justify-center py-10 relative">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
          Especialmente para vos
        </span>
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-2 font-sans">
          La Carta Complice de Cumpleanos
        </h2>
        <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
          Toca el sello del sobre para abrir la parte donde me pongo romantico, sincero y
          un poquito atrevido con los chistes.
        </p>
      </div>

      <div className="relative w-full max-w-lg min-h-[360px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#EAFDF9]/45 to-transparent rounded-3xl" />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: -110, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="absolute z-20 w-11/12 max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-[#4DB6A3]/25"
            >
              <div className="absolute top-4 right-4 text-teal-300">
                <Heart className="w-5 h-5 fill-teal-500/10" />
              </div>

              <div className="w-10 h-10 rounded-full overflow-hidden mb-4 border border-gray-100 shrink-0">
                <img
                  src={loveLetterImg}
                  alt="letter decoration"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="font-serif text-[#374151] space-y-4 max-h-[280px] md:max-h-[360px] overflow-y-auto pr-1 text-sm md:text-base leading-relaxed scrollbar-thin">
                <p className="font-sans font-bold text-[#1B4D43] text-[13px] tracking-wide uppercase font-mono">
                  17 de junio - 12:00 AM
                </p>
                <h3 className="font-sans font-extrabold text-xl text-gray-800 tracking-tight">
                  Feliz cumpleanos, mi Flor hermosa
                </h3>

                <p className="font-semibold text-teal-800 italic">
                  Mi Flor hermosa, mi complicita favorita, mi novia preciosa:
                </p>
                <p>
                  Hoy cumples 26 anos y yo queria dejarte algo que se sintiera como
                  nosotros: tierno, exageradamente enamorado, con humor y con esa
                  complicidad nuestra que hace que cualquier plan al lado tuyo se vuelva
                  memorable.
                </p>
                <p>
                  Gracias por existir, por elegirme, por cuidarme, por reirte conmigo y
                  tambien por reirte de mi cuando me pongo dramatico por pavadas. Me siento
                  afortunadisimo de tenerte, mimarte y compartir la vida con vos.
                </p>
                <p>
                  Quiero estar para vos en tus suenos, tus proyectos, tus cansancios, tus
                  dias brillantes y esos dias donde lo unico que hace falta es mate, abrazo
                  y silencio compartido.
                </p>
                <p>
                  A veces ando con mil cosas en la cabeza y no siempre me sale decir todo
                  perfecto, pero vos seguis siendo mi lugar lindo, mi calma y mi persona
                  favorita para volver hogar cualquier esquina.
                </p>
                <p>
                  Me encanta nuestra forma de querernos: unos mates, una hamburguesa, un
                  lomito, una serie coreana que nunca terminamos porque nos ponemos a
                  charlar, skincare, mimos, besos y esa costumbre hermosa de hacernos bien
                  incluso cuando estamos haciendo nada.
                </p>
                <p>
                  Gracias por bancarme, por quererme como soy, por hacerme sentir amado y
                  por ser tan vos. Yo tambien te elijo todos los dias, en cada etapa, en
                  cada sueno y en cada locura linda que nos inventemos.
                </p>
                <p>
                  Sos hermosa por dentro y por fuera, y cada dia me enamoro mas de vos.
                  Deseo que este nuevo ano te regale paz, alegria, salud, caricias al alma,
                  metas cumplidas y muchas excusas para sonreir conmigo.
                </p>
                <p>
                  No se todo lo que nos va a traer la vida, pero si se que quiero seguir
                  viviendola con vos, acompanandote, abrazandote, admirandote y
                  enamorandome de vos en todas tus versiones.
                </p>
                <p className="font-semibold text-[#1B4D43] font-sans text-base">
                  Feliz cumpleanos, mi amor. Que tus 26 sean hermosos, divertidos, tiernos
                  y bien merecidos.
                </p>
                <p className="font-bold text-teal-600 text-lg">
                  Te amo muchisimo, hasta la palmera y bastante mas. Y si alguna vez lo
                  dudas, relee esta carta y mira lo regalado que quede por vos.
                </p>
                <p className="font-serif italic font-medium text-right text-gray-500 pt-2 block font-mono text-xs">
                  Con todo mi amor eterno,
                  <br />
                  <span className="font-sans not-italic font-bold text-gray-800 text-sm">
                    Tu amorcito
                  </span>
                </p>
              </div>

              <div className="border-t border-dashed border-gray-100 pt-4 mt-6">
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-center gap-2 text-green-700 text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Respuesta enviada con besos, ternura y cero dignidad romantica</span>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSendReply}
                      className="space-y-2"
                    >
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Dejale un mensajito complice de vuelta:
                      </span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Tu respuesta para el... ej: te amo, gracias mi vida, veni por mimos"
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#4DB6A3]"
                        />
                        <button
                          type="submit"
                          className="bg-[#4DB6A3] text-white font-bold text-xs px-3 py-1.5 rounded-xl hover:bg-[#3AA28F] active:scale-95 transition-all flex items-center gap-1 shrink-0"
                        >
                          Enviar
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ y: isOpen ? 80 : 0 }}
          className="w-80 h-48 bg-cream border-2 border-[#4DB6A3]/25 shadow-xl rounded-b-2xl relative cursor-pointer"
          onClick={handleOpenEnvelope}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#E7FAF6] to-[#D5EFEA] rounded-2xl overflow-hidden shadow-inner">
            <div className="absolute bottom-0 left-0 right-0 h-0 w-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[96px] border-b-white/50" />
            <div className="absolute bottom-0 left-0 right-0 h-0 w-0 border-t-[96px] border-t-white/30 border-l-[160px] border-l-white/40 border-r-[160px] border-r-white/45" />
          </div>

          <motion.div
            animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 10 : 30 }}
            style={{ transformOrigin: "top" }}
            className="absolute top-0 left-[-2px] right-[-2px] h-24 bg-[#F2FDFB] rounded-t-xl border-l-2 border-r-2 border-t-2 border-[#4DB6A3]/25 flex items-center justify-center z-30"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#4DB6A3] border-2 border-[#3AA28F] flex items-center justify-center shadow-lg cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            </motion.div>
          </motion.div>

          <div className="absolute -bottom-8 left-10 right-10 h-4 bg-black/10 rounded-full filter blur-md -z-10" />
        </motion.div>
      </div>
    </div>
  );
}
