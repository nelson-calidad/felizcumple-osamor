import React, { useState } from "react";
import { Sparkles, RefreshCw, Send, Heart, Flame, Gift, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LoveJarProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

export default function LoveJar({ onTriggerFloating }: LoveJarProps) {
  const [selectedMimo, setSelectedMimo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"standard" | "gemini">("standard");
  const [selectedMood, setSelectedMood] = useState("");

  const presetMimos = [
    "Amo escucharte explicarme sobre Hemoterapia con tanta pasión. Me derretís por completo explicando cosas complejas y verte amar tu hermosa carrera me inspira cada santo día. 💉📚",
    "Nuestras tardes inolvidables tomando un matecito tras otro todo el tiempo (¡tu fiel compañero de vida!). Me encanta verte cebar con esa paciencia tan hermosa. 🧉❤️",
    "Amo cuando nos intentamos sentar a ver una serie coreana juntos, y aunque sabemos que nos cuesta verlas de corrido porque charlamos por horas de la vida, amo tu carita tierna emocionándote por los Kdramas o series coreanas. 🍿🎬",
    "Me enamora tu empatía y tu corazón tan dulce y un poquito lloroncito. Sé que a veces cuesta transmitir lo que sentís, pero adoro tu sincero deseo de mejora continua para nuestra relación. Sos de otro planeta. 🥺💝",
    "Amo nuestras citas devorando hamburguesas riquísimas o lomitos espectaculares. Comer con vos mientras me hacés reír y charlamos es literalmente mi refugio feliz en el mundo. 🍔🍟",
    "Tu abrazo es mi único refugio seguro en este mundo caótico. No te cambiaría por absolutamente nada ni nadie en el universo, mi reina hermosa. 🏡👑",
    "Tu risa es literalmente mi sonido preferido en la galaxia entera. Haría cualquier cosa por verte feliz y contenta siempre. 🌊💕",
    "Cumplir 26 años a tu lado es el regalo de cumpleaños más hermoso que la vida me pudo regalar. Camino de tu hermosa mano al infinito y más allá. 🎂🥂"
  ];

  const presetMoods = [
    { label: "🧸 Dame un mimo", type: "compliment" },
    { label: "🔮 Profecía de nuestro Año 26", type: "fortune" },
    { label: "💌 Agradecimiento sincero", type: "thanks" }
  ];

  const handleDrawLocalMimo = (e: React.MouseEvent) => {
    const randomIndex = Math.floor(Math.random() * presetMimos.length);
    setSelectedMimo(presetMimos[randomIndex]);
    setApiResponse(null);
    onTriggerFloating(e.clientX, e.clientY, "¡Abriste un pergamino de amor! 📜💚");
  };

  const generateOfflineSweetNote = (type: string, prompt: string): string => {
    const normPrompt = prompt.toLowerCase().trim();
    
    if (type === "compliment") {
      const arr = [
        "Flor Lihue, sos mi cielo absoluto. Tu hermosa sonrisa brilla más que las estrellas, ¡y te amo de aquí a la palmera y el cielo infinito! 🌴🌌",
        "La Duque 🐾 mandó un ladrido especial: afirma con la colita que sos la persona que más mimos y cariño le da del planeta entero cuando la visitas. ¡Y tu novio lo confirma! 🐕💞",
        "Sos magnífica explicándome cosas de Hemoterapia, mi amor. Me fascina sentarme a escucharte hablar de tu carrera con tanta vocación y brillo en los ojos. ¡Sos una genia profesional impecable! 💉🧪❤️",
        "Amo tu inmensa empatía y tu corazón tan sensible y un poquito lloroncito con las series coreanas. Aunque a veces te cueste transmitir lo que sentís, tu deseo de mejora continua es la prueba viviente del amor hermoso que nos une. 🥰🌸"
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    }
    
    if (type === "fortune") {
      const arr = [
        "La profecía dice que tus hermosos 26 vendrán colmados de mates calentitos compartidos todo el tiempo, risas infinitas y tardes enteras devorando ricas hamburguesas y lomitos. 🍔🧉✨",
        "Las estrellas revelan un año de florecer absoluto en tu amada profesión de hemoterapia, lleno de luz, salud, series coreanas o Kdramas emotivos y paseos de la mano con tu novio y la Duque. 🐾🪐",
        "Veo en tu futuro inmediato una tarde perfecta: mantita calentita, una serie coreana o Kdrama tierno en pantalla para emocionarnos y un bol tierno de mimos de tu novio. 🍿🧸🏥",
        "Se avecina una cita memorable para comer una súper hamburguesa doble con papas, mientras me contás sobre tu día y yo disfruto de tan solo escuchar el sonido bendito de tu voz. 🍔💕"
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    }
    
    if (type === "thanks") {
      const arr = [
        "Agradezco infinitamente por tu hermosa vida, Flor. Festejo tu existencia entera y doy gracias por el simple hecho de que seas vos quien me acompaña de la mano. 🌸🌟",
        "Gracias por tu paciencia infinita con mis locuras, por tu comprensión en cada desvelo y por cuidar de nuestra casita con tanto amor y detalles tibios. 🏠💞",
        "Gracias por enseñarme lo que es amar de verdad, con un alma empática que siempre quiere mejorar y dar lo mejor para que estemos cada día más felices. No me imagino separado de vos. 🌿✨",
        "Gracias por cear los mates más ricos del mundo todo el tiempo, por hacerme compañía en cada serie coreana que charlamos, y por ser la novia más hermosa de la galaxia. 🧉💝"
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    }
    
    if (prompt) {
      if (normPrompt.includes("duque") || normPrompt.includes("perrito") || normPrompt.includes("perro")) {
        return "¡Invocaste a la Duque 🐾! La hermosa perrita de mi hermano ladra de alegría sabiendo que sos su compañera preferida para pasear de la mano y llenarla de caricias. Te enviamos besos húmedos de perro y abrazos de oso eternos. ¡Te re amamos compañera de Duque! 🐾🐕💚";
      }
      if (normPrompt.includes("viaje") || normPrompt.includes("viajar") || normPrompt.includes("colectivo") || normPrompt.includes("ruta") || normPrompt.includes("córdoba") || normPrompt.includes("yala")) {
        return "¡Soñemos con recorrer rutas eternas con mates infinitos de tu mano! A Córdoba, Yala o donde sea. Adoro viajar con vos, charlando de la vida sin parar y viendo cómo disfrutas de cada paisaje hermoso. ¡Tus 26 se vienen llenos de senderos felices! 🗺️🚗🌊";
      }
      if (normPrompt.includes("mate") || normPrompt.includes("mates") || normPrompt.includes("tomar") || normPrompt.includes("cebar")) {
        return "¡Un matecito compartido con vos es la cura para cualquier desvelo y cansancio! Me encanta que tomemos mate todo el tiempo; esas charlas cotidianas de mate de por medio son lo más lindo que tiene mi rutina. 🧉💕🌸";
      }
      if (normPrompt.includes("hemoterapia") || normPrompt.includes("carrera") || normPrompt.includes("sangre") || normPrompt.includes("hospital") || normPrompt.includes("estudiar")) {
        return "¡Sos una profesional increíble! Admiro con locura tu dedicación a la hemoterapia, y sobre todo amo cuando con tanta paciencia y dulzura me explicás los temas de tu carrera. Soy tu fan número uno y adoro escucharte siempre. 💉🔬🩺❤️";
      }
      if (normPrompt.includes("hamburguesa") || normPrompt.includes("hamburguesas") || normPrompt.includes("lomito") || normPrompt.includes("comer") || normPrompt.includes("cena")) {
        return "¡Cita de hamburguesas o lomitos confirmada! No hay nada más hermoso en el universo que sentarme a comer cosas ricas con vos, reírnos de pavadas y charlar por horas sin darnos cuenta del tiempo. ¡Hagámoslo por siempre! 🍔🍟🥤❤️";
      }
      if (normPrompt.includes("jaja") || normPrompt.includes("río") || normPrompt.includes("risa") || normPrompt.includes("chiste")) {
        return "Tu risa hermosa ilumina todo mi mundo, amor. Me encanta reirme de tus chistes tontos o que nos tientes charlando a mitad de una serie coreana que nunca terminamos de ver. ¡Sos mi felicidad total! 😂💖🍿";
      }
      if (normPrompt.includes("serie") || normPrompt.includes("coreanas") || normPrompt.includes("kdrama") || normPrompt.includes("película") || normPrompt.includes("llorar") || normPrompt.includes("kdramas")) {
        return "¡Tarde de series coreanas y Kdramas para llorar juntos con sus romances! Aunque nos cuesta un montón verlas de corrido porque nos la pasamos charlando de la vida, me fascina ver lo tierna, empática y sensible (lloroncita hermosa) que sos. ¡Te amo con mi alma entera! 🍿📺📽️💚";
      }
      if (normPrompt.includes("te amo") || normPrompt.includes("amor") || normPrompt.includes("te adoro") || normPrompt.includes("novio")) {
        return "¡Yo te amo de aquí a la palmera, al cielo y mucho más allá, mi querida Flor Lihue! Agradezco profundamente tu vida, tu empatía, tu paciencia y tus hermosas ganas de que siempre mejoremos juntos. Sos la dueña absoluta de mi alma entera. 💚👑🧸";
      }
      if (normPrompt.includes("cansada") || normPrompt.includes("triste") || normPrompt.includes("transmitir") || normPrompt.includes("sentir") || normPrompt.includes("mejorar")) {
        return "Hola mi reina hermosa, sé que a veces se siente difícil o cuesta transmitir lo que sentís, pero quiero recordarte que valoro muchísimo tus ganas y esfuerzo constante de mejora continua en nuestra relación. Recostá tu cabecita en mi pecho, descansemos, tomemos mates calentitos que juntos siempre estamos mejor. 🧸🏡💚";
      }
      return `¡Invocaste un pensamiento sobre "${prompt}"! Tu novio te recuerda en este día tan lindo: que Flor Lihue es la reina más hermosa y dedicada del cosmos. Amo tu empatía, tu carrera de hemoterapia, tus mates continuos y tu bella mirada. ¡Que hoy pases el cumple de tus sueños, te amo! 🧁✨🧉`;
    }
    
    return "¡Escribe algo bonito para que el oráculo de tu novio te devuelva una sorpresa llena de magia!";
  };

  const handleFetchGeminiMimo = (e: React.MouseEvent, type: string, customText = "") => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setSelectedMimo(null);
    setApiResponse(null);
    onTriggerFloating(e.clientX, e.clientY, "¡Invocando deseos en las estrellas! 🌠✨");

    // Beautiful simulated writing delay for romantic suspense
    setTimeout(() => {
      const response = generateOfflineSweetNote(type, customText);
      setApiResponse(response);
      setLoading(false);
    }, 1000);
  };

  return (
    <div id="love-jar-section" className="bg-gradient-to-br from-[#EAFDF9]/90 to-[#D5EFEA]/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-[#4DB6A3]/25 relative overflow-hidden shadow-glow">
      
      {/* Visual background details */}
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-pink-100/50 rounded-full filter blur-2xl" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left container: The Interactive Mason Jar Illustration */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative">
            {/* Elegant glass jar bottle */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="w-48 h-64 bg-white/40 rounded-t-[44px] rounded-b-[24px] border-4 border-[#3AA28F] relative shadow-lg flex items-center justify-center p-4 cursor-pointer"
              onClick={handleDrawLocalMimo}
              title="Haz clic para abrir un pergamino"
            >
              {/* Wooden cork top */}
              <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-700/80 rounded-t-md rounded-b-[4px] border-b-2 border-amber-900 shadow-md flex items-center justify-center">
                <div className="w-14 h-[3px] bg-amber-600/60 rounded" />
              </div>

              {/* Jar hanging decorative label tag */}
              <div className="absolute top-16 left-[-15px] bg-[#4DB6A3] text-white font-mono text-[9px] font-bold py-1 px-2.5 rounded-r-md rounded-l-[3px] shadow border-l-2 border-[#3AA28F] uppercase rotate-2 select-none flex items-center gap-1">
                <Heart className="w-2 h-2 fill-white" />
                Mimos 26
              </div>

              {/* Glowing star / capsule elements flying in jar */}
              <div className="absolute inset-0 p-6 overflow-hidden flex flex-wrap justify-center items-center gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, Math.sin(i) * 15 - 10, 0], 
                      x: [0, Math.cos(i) * 10 - 5, 0],
                      scale: [1, 1.2, 0.9, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3 + i * 0.4, 
                      ease: "easeInOut" 
                    }}
                    className={`w-6 h-3 rounded-full cursor-pointer flex items-center justify-center border ${
                      i % 3 === 0 ? "bg-pink-100 border-pink-300 rotate-12" :
                      i % 3 === 1 ? "bg-yellow-100 border-yellow-300 -rotate-12 animate-pulse" :
                      "bg-blue-100 border-blue-300 rotate-45"
                    }`}
                  >
                    <div className="w-[1.5px] h-2 bg-white/70 rounded-full" />
                  </motion.div>
                ))}
              </div>

              {/* Centered heart focus */}
              <div className="z-10 bg-white/90 p-3 rounded-full shadow-md border-2 border-[#4DB6A3] text-teal-600">
                <Heart className="w-8 h-8 fill-teal-400 animate-pulse" />
              </div>
            </motion.div>

            {/* Sparkles popping around bottle on hover */}
            <div className="absolute -top-4 -left-4 text-yellow-400 select-none">✨</div>
            <div className="absolute -bottom-2 -right-4 text-pink-400 select-none">💖</div>
          </div>
          
          <button 
            onClick={handleDrawLocalMimo}
            className="mt-6 px-6 py-2.5 bg-white hover:bg-[#EAFDF9] text-[#1B4D43] font-bold rounded-full shadow-md border border-[#4DB6A3]/20 active:scale-95 transition-all text-sm flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-[#6E4944]/10" />
            Abrir pergamino manual 📜
          </button>
        </div>

        {/* Right container: Message contents, switchable tabs */}
        <div className="lg:col-span-7">
          {/* Tab buttons switcher */}
          <div className="flex bg-white/80 p-1 rounded-2xl border border-gray-100 w-fit mb-5">
            <button
              onClick={() => setActiveTab("standard")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "standard" ? "bg-[#4DB6A3] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              💚 Mensajitos de Amor
            </button>
            <button
              onClick={() => setActiveTab("gemini")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === "gemini" ? "bg-amber-100 text-amber-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
              Oráculo del Amor ✨
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "standard" ? (
              /* STANDARD LOCAL PRESETS TAB */
              <motion.div
                key="standard-mimos"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Frasco de Mimos Cotidianos</h4>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Pequeños pergaminos virtuales que guardan palabras dulces reales preparadas por tu novio para recordar lo mucho que te adoro.
                  </p>
                </div>

                <div className="bg-white/80 min-h-[140px] rounded-2xl p-5 border border-dashed border-[#4DB6A3]/30 flex items-center justify-center text-center shadow-inner">
                  {selectedMimo ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-3"
                    >
                      <span className="text-2xl">📜</span>
                      <p className="text-base text-gray-700 font-serif italic leading-relaxed">
                        "{selectedMimo}"
                      </p>
                      <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#3AA28F]">
                        — Escrito desde el fondo de mi corazón
                      </span>
                    </motion.div>
                  ) : (
                    <div className="text-gray-400 text-sm space-y-2">
                      <p>✨ Toca el frasco de la izquierda o haz clic abajo para sacar un pergamino ✨</p>
                      <span className="text-[11px] block text-teal-600 font-medium">¡Hay muchas sorpresas escritas para vos!</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* SERVER-SIDE INTERACTIVE CARDS TAB */
              <motion.div
                key="gemini-mimos"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-xl font-bold text-teal-900 flex items-center gap-2">
                    Invocador de Cartas y Deseos ✍️
                  </h4>
                  <p className="text-xs text-teal-800/80 mt-0.5">
                    Un buzón mágico instantáneo para invocar de forma tierna cartas infinitas, deseos románticos para tus hermosos 26 años, o consejos de tu novio ante tus palabras clave.
                  </p>
                </div>

                {/* Mood presets for instant triggering */}
                <div className="flex flex-wrap gap-2">
                  {presetMoods.map((mood) => (
                    <button
                      key={mood.type}
                      disabled={loading}
                      onClick={(e) => {
                        setSelectedMood(mood.label);
                        handleFetchGeminiMimo(e, mood.type);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedMood === mood.label
                          ? "bg-[#4DB6A3] text-white border-[#4DB6A3] shadow-sm"
                          : "bg-white text-teal-800 border-teal-200 hover:bg-teal-50"
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>

                {/* Custom theme prompt input box */}
                <form 
                  onSubmit={(e) => {
                    setSelectedMood("Deseo personalizado");
                    handleFetchGeminiMimo(e, "custom", customPrompt);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Ej: mates, viaje, deprimida, te amo, o la Duque..."
                    className="flex-1 bg-white border border-teal-200/60 rounded-2xl px-4 py-2 text-xs focus:ring-2 focus:ring-teal-300 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#4DB6A3] hover:bg-[#3AA28F] disabled:bg-teal-200 text-white p-2.5 rounded-2xl active:scale-95 transition-all text-xs font-bold cursor-pointer"
                    title="Enviar idea"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>

                <div className="bg-teal-50/60 min-h-[140px] rounded-2xl p-5 border border-teal-200/40 flex items-center justify-center shadow-inner relative">
                  {loading ? (
                    <div className="flex flex-col items-center gap-2 text-center text-teal-800 font-mono text-xs select-none">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#4DB6A3]" />
                      <span>Escribiendo con pluma y tintero de estrellas...</span>
                      <span className="text-[10px] text-teal-600">Calculando amor infinito...</span>
                    </div>
                  ) : apiResponse ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-2 text-gray-800"
                    >
                      <span className="text-xs bg-teal-200 text-teal-900 px-2 py-0.5 rounded-full font-mono font-bold">
                        🔮 RESPUESTA MÁGICA
                      </span>
                      <p className="text-xs font-serif leading-relaxed whitespace-pre-wrap italic pt-1">
                        "{apiResponse}"
                      </p>
                      <span className="text-[9px] uppercase font-mono font-extrabold tracking-wider block text-right mt-1 text-teal-700">
                        — Hecho a pluma con amor eterno ✒️💚
                      </span>
                    </motion.div>
                  ) : (
                    <div className="text-teal-700/60 text-xs text-center space-y-1">
                      <p className="font-semibold">✨ El invocador mágico está listo ✨</p>
                      <p>Selecciona un preset de arriba o ingresa cualquier palabra o tema de nuestro diario (ej. mates, viaje, Duque) para generar un mensaje de amor instantáneo hecho con todo el corazón por tu novio.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
