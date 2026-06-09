import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, RefreshCw, Send, Sparkles, Star } from "lucide-react";

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
    "Nuestras tardes inolvidables tomando un matecito tras otro todo el tiempo. Me encanta verte cebar con esa paciencia tan hermosa. 🧉❤️",
    "Amo cuando nos intentamos sentar a ver una serie coreana juntos, y aunque sabemos que nos cuesta verlas de corrido porque charlamos por horas de la vida, amo tu carita tierna emocionándote por los Kdramas. 🍿🎬",
    "Me enamora tu empatía y tu corazón tan dulce y un poquito lloroncito. Sé que a veces cuesta transmitir lo que sentís, pero adoro tu sincero deseo de mejora continua para nuestra relación. Sos de otro planeta. 🥺💕",
    "Amo nuestras citas devorando hamburguesas riquísimas o lomitos espectaculares. Comer con vos mientras me hacés reír y charlamos es literalmente mi refugio feliz en el mundo. 🍔🍟",
    "Tu abrazo es mi único refugio seguro en este mundo caótico. No te cambiaría por absolutamente nada ni nadie en el universo, mi reina hermosa. 🏡👑",
    "Tu risa es literalmente mi sonido preferido en la galaxia entera. Haría cualquier cosa por verte feliz y contenta siempre. 🌊💕",
    "Cumplir 26 años a tu lado es el regalo de cumpleaños más hermoso que la vida me pudo regalar. Camino de tu hermosa mano al infinito y más allá. 🎂🥂",
  ];

  const presetMoods = [
    { label: "🧸 Dame un mimo", type: "compliment" },
    { label: "🔮 Profecía de nuestro Año 26", type: "fortune" },
    { label: "💌 Agradecimiento sincero", type: "thanks" },
  ];

  const handleDrawLocalMimo = (e: React.MouseEvent) => {
    const randomIndex = Math.floor(Math.random() * presetMimos.length);
    setSelectedMimo(presetMimos[randomIndex]);
    setApiResponse(null);
    onTriggerFloating(e.clientX, e.clientY, "Abriste un pergamino de amor");
  };

  const generateOfflineSweetNote = (type: string, prompt: string): string => {
    const normPrompt = prompt.toLowerCase().trim();

    if (type === "compliment") {
      const arr = [
        "Flor Lihue, sos mi cielo absoluto. Tu sonrisa brilla más que las estrellas y te amo de aquí a la palmera y el cielo infinito. 🌴🌌",
        "La Duque 🐾 mandó un ladrido especial: afirma con la colita que sos la persona que más mimos y cariño le da del planeta cuando la visitas. Y tu novio lo confirma. 🐕💞",
        "Sos magnífica explicándome cosas de Hemoterapia, mi amor. Me fascina escucharte hablar de tu carrera con tanta vocación y brillo en los ojos. 💉🧪❤️",
        "Amo tu inmensa empatía y tu corazón sensible. Aunque a veces te cueste transmitir lo que sentís, tu deseo de mejora continua es una de las cosas más lindas que tenés. 🥰🌸",
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    }

    if (type === "fortune") {
      const arr = [
        "La profecía dice que tus hermosos 26 vendrán colmados de mates calentitos, risas infinitas y tardes compartidas comiendo cosas ricas. 🍔🧉✨",
        "Las estrellas revelan un año de florecer absoluto en tu profesión, lleno de luz, salud, Kdramas emotivos y paseos de la mano con tu novio y la Duque. 🐾🪐",
        "Veo en tu futuro inmediato una tarde perfecta: mantita calentita, una serie tierna en pantalla y un bol enorme de mimos de tu novio. 🍿🧸🏥",
        "Se avecina una cita memorable para comer una súper hamburguesa con papas mientras me contás sobre tu día y yo disfruto el sonido de tu voz. 🍔💖",
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    }

    if (type === "thanks") {
      const arr = [
        "Agradezco infinitamente por tu vida, Flor. Festejo tu existencia entera y doy gracias por el simple hecho de que seas vos quien me acompaña de la mano. 🌸🌟",
        "Gracias por tu paciencia con mis locuras, por tu comprensión en cada desvelo y por cuidar de nuestra casita con tanto amor y detalles tibios. 🏠💞",
        "Gracias por enseñarme lo que es amar de verdad, con un alma empática que siempre quiere mejorar y dar lo mejor para que estemos cada día más felices. 🌿✨",
        "Gracias por cebar los mates más ricos del mundo, por acompañarme en cada serie que charlamos y por ser la novia más hermosa de la galaxia. 🧉💝",
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    }

    if (prompt) {
      if (normPrompt.includes("duque") || normPrompt.includes("perrito") || normPrompt.includes("perro")) {
        return "Invocaste a la Duque 🐾. La hermosa perrita de mi hermano ladra de alegría sabiendo que sos su compañera preferida para pasear y llenarla de caricias. Te enviamos besos húmedos de perro y abrazos eternos.";
      }
      if (normPrompt.includes("viaje") || normPrompt.includes("viajar") || normPrompt.includes("colectivo") || normPrompt.includes("ruta") || normPrompt.includes("córdoba") || normPrompt.includes("yala")) {
        return "Soñemos con recorrer rutas eternas con mates infinitos de tu mano. Adoro viajar con vos, charlando de la vida sin parar y viendo cómo disfrutás de cada paisaje hermoso. 🗺️🚗🌊";
      }
      if (normPrompt.includes("mate") || normPrompt.includes("mates") || normPrompt.includes("tomar") || normPrompt.includes("cebar")) {
        return "Un matecito compartido con vos es la cura para cualquier desvelo. Me encanta que tomemos mate todo el tiempo; esas charlas cotidianas son de lo más lindo de mi rutina. 🧉💖🌸";
      }
      if (normPrompt.includes("hemoterapia") || normPrompt.includes("carrera") || normPrompt.includes("sangre") || normPrompt.includes("hospital") || normPrompt.includes("estudiar")) {
        return "Sos una profesional increíble. Admiro con locura tu dedicación a la hemoterapia y amo cuando con paciencia y dulzura me explicás los temas de tu carrera. Soy tu fan número uno. 💉🔬🩺❤️";
      }
      if (normPrompt.includes("hamburguesa") || normPrompt.includes("hamburguesas") || normPrompt.includes("lomito") || normPrompt.includes("comer") || normPrompt.includes("cena")) {
        return "Cita de hamburguesas o lomitos confirmada. No hay nada más hermoso que sentarme a comer cosas ricas con vos, reírnos de pavadas y charlar por horas sin darnos cuenta del tiempo. 🍔🍟🥤❤️";
      }
      if (normPrompt.includes("jaja") || normPrompt.includes("río") || normPrompt.includes("risa") || normPrompt.includes("chiste")) {
        return "Tu risa ilumina todo mi mundo. Me encanta reírme de tus chistes tontos o que nos tentemos charlando a mitad de una serie que nunca terminamos de ver. 😂💖🍿";
      }
      if (normPrompt.includes("serie") || normPrompt.includes("coreanas") || normPrompt.includes("kdrama") || normPrompt.includes("película") || normPrompt.includes("llorar")) {
        return "Tarde de series coreanas y Kdramas para llorar juntos. Aunque nos cuesta verlas de corrido porque nos la pasamos charlando de la vida, me fascina ver lo tierna y sensible que sos. 🍿📺💚";
      }
      if (normPrompt.includes("te amo") || normPrompt.includes("amor") || normPrompt.includes("te adoro") || normPrompt.includes("novio")) {
        return "Yo te amo de aquí a la palmera, al cielo y mucho más allá, mi querida Flor Lihue. Agradezco profundamente tu vida, tu empatía, tu paciencia y tus ganas de que siempre mejoremos juntos. 💚👑🧸";
      }
      if (normPrompt.includes("cansada") || normPrompt.includes("triste") || normPrompt.includes("transmitir") || normPrompt.includes("sentir") || normPrompt.includes("mejorar")) {
        return "Sé que a veces se siente difícil transmitir lo que sentís, pero quiero recordarte que valoro muchísimo tus ganas y tu esfuerzo constante. Recostá tu cabecita en mi pecho y descansemos juntos. 🧸🏡💚";
      }
      return `Invocaste un pensamiento sobre "${prompt}". Tu novio te recuerda en este día tan lindo que Flor Lihue es la reina más hermosa y dedicada del cosmos. Amo tu empatía, tu carrera, tus mates y tu mirada.`;
    }

    return "Escribí algo bonito para que el oráculo de tu novio te devuelva una sorpresa llena de magia.";
  };

  const handleFetchGeminiMimo = (e: React.MouseEvent | React.FormEvent, type: string, customText = "") => {
    e.preventDefault();
    setLoading(true);
    setSelectedMimo(null);
    setApiResponse(null);
    onTriggerFloating(0, 0, "Invocando deseos en las estrellas");

    setTimeout(() => {
      const response = generateOfflineSweetNote(type, customText);
      setApiResponse(response);
      setLoading(false);
    }, 1000);
  };

  return (
    <section
      id="love-jar-section"
      className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(255,244,239,0.95),_rgba(238,251,247,0.94)_48%,_rgba(216,241,234,0.82)_100%)] p-5 shadow-[0_28px_80px_rgba(27,77,67,0.14)] backdrop-blur-md md:p-8"
    >
      <div className="absolute -left-8 -top-12 h-40 w-40 rounded-full bg-[#FFD7E2]/45 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[#CDEEE5]/65 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

      <div className="relative mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#6E4944] shadow-sm">
          <Star className="h-3.5 w-3.5 fill-[#E7B980]/20 text-[#B88357]" />
          Ritual de mimos
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h3 className="font-serif text-3xl tracking-tight text-[#214D44] md:text-4xl">
              Un rincón más íntimo, delicado y premium
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#49635D] md:text-[15px]">
              En celular ahora primero aparece el contenido para leer y después el frasco
              como detalle interactivo. Quise llevarlo a una estética más boutique,
              cálida y romántica.
            </p>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/65 px-4 py-3 text-xs leading-relaxed text-[#5B6E68] shadow-sm md:max-w-[260px]">
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#B88357]">
              Mini guía
            </span>
            Tocá un modo, abrí el frasco o pedí una idea. El mensaje queda visible sin
            quedar perdido abajo.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="rounded-[2rem] border border-white/80 bg-white/52 p-5 shadow-[0_18px_40px_rgba(110,73,68,0.12)] md:p-6">
            <div className="mb-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#B88357]">
                Frasco principal
              </p>
              <p className="mt-1 text-sm text-[#56706A]">
                Más compacto en celular para que no tape el texto.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-[240px] justify-center">
              <motion.div
                whileHover={{ y: -6, rotate: -1.5 }}
                transition={{ type: "spring", stiffness: 170, damping: 16 }}
                className="relative flex h-56 w-40 cursor-pointer items-center justify-center rounded-t-[44px] rounded-b-[28px] border-[3px] border-[#77B8A7] bg-white/45 p-4 shadow-[0_18px_38px_rgba(54,116,101,0.18)] sm:h-64 sm:w-48"
                onClick={handleDrawLocalMimo}
                title="Haz clic para abrir un pergamino"
              >
                <div className="absolute -top-[18px] left-1/2 flex h-5 w-20 -translate-x-1/2 items-center justify-center rounded-t-md rounded-b-[4px] border-b-2 border-amber-900 bg-amber-700/85 shadow-md">
                  <div className="h-[3px] w-14 rounded bg-amber-600/60" />
                </div>

                <div className="absolute left-[-12px] top-14 flex rotate-2 items-center gap-1 rounded-r-md rounded-l-[3px] border-l-2 border-[#3AA28F] bg-[#4DB6A3] px-2.5 py-1 text-[9px] font-bold uppercase text-white shadow">
                  <Heart className="h-2 w-2 fill-white" />
                  Mimos 26
                </div>

                <div className="absolute inset-0 overflow-hidden p-5">
                  <div className="absolute inset-x-6 top-7 h-20 rounded-full bg-white/30 blur-xl" />
                  <div className="flex h-full flex-wrap items-center justify-center gap-2">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, Math.sin(i) * 13 - 8, 0],
                          x: [0, Math.cos(i) * 10 - 5, 0],
                          scale: [1, 1.15, 0.92, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3 + i * 0.4,
                          ease: "easeInOut",
                        }}
                        className={`flex h-3 w-6 items-center justify-center rounded-full border ${
                          i % 3 === 0
                            ? "rotate-12 border-pink-300 bg-pink-100"
                            : i % 3 === 1
                              ? "-rotate-12 border-amber-300 bg-amber-100"
                              : "rotate-45 border-sky-300 bg-sky-100"
                        }`}
                      >
                        <div className="h-2 w-[1.5px] rounded-full bg-white/80" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="z-10 rounded-full border-2 border-[#8BCABB] bg-white/92 p-3 text-teal-600 shadow-md">
                  <Heart className="h-8 w-8 animate-pulse fill-[#68BEAA]" />
                </div>
              </motion.div>

              <div className="pointer-events-none absolute -left-2 -top-4 text-yellow-400">✨</div>
              <div className="pointer-events-none absolute -bottom-2 -right-2 text-pink-400">💞</div>
            </div>

            <div className="mt-5 space-y-3">
              <button
                onClick={handleDrawLocalMimo}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#CFE8E1] bg-white/90 px-5 py-3 text-sm font-bold text-[#214D44] shadow-sm transition-all hover:bg-[#F7FFFC] active:scale-95"
              >
                <Sparkles className="h-4 w-4 fill-[#B88357]/15 text-[#B88357]" />
                Abrir pergamino manual 📜
              </button>

              <div className="rounded-2xl border border-dashed border-[#D9E9E4] bg-white/55 px-4 py-3 text-center text-xs leading-relaxed text-[#617A74]">
                El frasco ahora acompaña al mensaje en vez de empujarlo para abajo. En
                celular primero leés, después jugás.
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="mb-5 grid w-full grid-cols-1 gap-2 rounded-[1.4rem] border border-white/80 bg-white/80 p-1.5 shadow-sm sm:w-fit sm:grid-cols-2">
            <button
              onClick={() => setActiveTab("standard")}
              className={`rounded-[1rem] px-4 py-3 text-xs font-bold transition-all ${
                activeTab === "standard"
                  ? "bg-[#214D44] text-white shadow-[0_10px_26px_rgba(33,77,68,0.18)]"
                  : "text-gray-500 hover:bg-white hover:text-gray-900"
              }`}
            >
              💚 Mensajitos de Amor
            </button>
            <button
              onClick={() => setActiveTab("gemini")}
              className={`flex items-center justify-center gap-1 rounded-[1rem] px-4 py-3 text-xs font-bold transition-all ${
                activeTab === "gemini"
                  ? "bg-[#F6E7CC] text-[#7B5231] shadow-[0_10px_26px_rgba(184,131,87,0.16)]"
                  : "text-gray-500 hover:bg-white hover:text-gray-900"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 fill-amber-500/20 text-amber-500" />
              Oráculo del Amor ✨
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "standard" ? (
              <motion.div
                key="standard-mimos"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="font-serif text-2xl text-[#214D44]">
                    Frasco de Mimos Cotidianos
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#5A706A]">
                    Pequeños pergaminos virtuales con palabras dulces reales, escritos
                    para que el mimo se sienta cerquita incluso desde el celu.
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-white/90 bg-white/82 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_36px_rgba(33,77,68,0.08)]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#B88357]">
                        Pergamino abierto
                      </p>
                      <p className="text-xs text-[#71837E]">
                        Sale uno distinto cada vez que tocás el frasco.
                      </p>
                    </div>
                    <button
                      onClick={handleDrawLocalMimo}
                      className="cursor-pointer rounded-full border border-[#D7EAE4] bg-[#F7FFFC] px-4 py-2 text-[11px] font-bold text-[#214D44] transition-all hover:bg-white active:scale-95"
                    >
                      Nuevo mimo
                    </button>
                  </div>

                  <div className="flex min-h-[180px] items-center justify-center rounded-[1.3rem] border border-dashed border-[#BFDCD4] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,255,252,0.7))] px-4 py-6 text-center shadow-inner">
                    {selectedMimo ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-3"
                      >
                        <span className="text-2xl">📜</span>
                        <p className="font-serif text-[17px] italic leading-relaxed text-[#445853] md:text-lg">
                          "{selectedMimo}"
                        </p>
                        <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.24em] text-[#3AA28F]">
                          — Escrito desde el fondo de mi corazón
                        </span>
                      </motion.div>
                    ) : (
                      <div className="space-y-2 text-sm text-[#7A8C87]">
                        <p>✨ Tocá el frasco o el botón para sacar un pergamino ✨</p>
                        <span className="block text-[11px] font-medium text-teal-600">
                          Hay varias sorpresas guardadas para vos.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="gemini-mimos"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="flex items-center gap-2 font-serif text-2xl text-teal-900">
                    Invocador de Cartas y Deseos ✍️
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-teal-800/80">
                    Un buzón romántico instantáneo para invocar cartas, deseos para tus 26
                    o respuestas dulces a cualquier palabra clave.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {presetMoods.map((mood) => (
                    <button
                      key={mood.type}
                      disabled={loading}
                      onClick={(e) => {
                        setSelectedMood(mood.label);
                        handleFetchGeminiMimo(e, mood.type);
                      }}
                      className={`cursor-pointer rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                        selectedMood === mood.label
                          ? "border-[#4DB6A3] bg-[#4DB6A3] text-white shadow-sm"
                          : "border-teal-200 bg-white/85 text-teal-800 hover:bg-teal-50"
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    setSelectedMood("Deseo personalizado");
                    handleFetchGeminiMimo(e, "custom", customPrompt);
                  }}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Ej: mates, viaje, te amo o la Duque..."
                    className="flex-1 rounded-2xl border border-teal-200/60 bg-white/88 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer rounded-2xl bg-[#214D44] p-3 text-xs font-bold text-white transition-all hover:bg-[#183C35] active:scale-95 disabled:bg-teal-200 sm:px-5"
                    title="Enviar idea"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </form>

                <div className="relative flex min-h-[180px] items-center justify-center rounded-[1.6rem] border border-[#D3E8E1] bg-[linear-gradient(180deg,rgba(250,255,253,0.96),rgba(232,248,242,0.9))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_36px_rgba(33,77,68,0.08)]">
                  {loading ? (
                    <div className="flex select-none flex-col items-center gap-2 text-center font-mono text-xs text-teal-800">
                      <RefreshCw className="h-6 w-6 animate-spin text-[#4DB6A3]" />
                      <span>Escribiendo con pluma y tintero de estrellas...</span>
                      <span className="text-[10px] text-teal-600">Calculando amor infinito...</span>
                    </div>
                  ) : apiResponse ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-2 text-gray-800"
                    >
                      <span className="rounded-full bg-teal-200 px-2 py-0.5 font-mono text-xs font-bold text-teal-900">
                        🔮 RESPUESTA MÁGICA
                      </span>
                      <p className="whitespace-pre-wrap pt-1 font-serif text-sm italic leading-relaxed md:text-[15px]">
                        "{apiResponse}"
                      </p>
                      <span className="mt-1 block text-right font-mono text-[9px] font-extrabold uppercase tracking-[0.22em] text-teal-700">
                        — Hecho a pluma con amor eterno ✒️💚
                      </span>
                    </motion.div>
                  ) : (
                    <div className="space-y-1 text-center text-xs text-teal-700/60">
                      <p className="font-semibold">✨ El invocador mágico está listo ✨</p>
                      <p>
                        Elegí un preset o escribí una palabra de ustedes para generar un
                        mensaje instantáneo hecho con todo el corazón.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
