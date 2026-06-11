import React, { useMemo, useState } from "react";
import { ArrowDown, Heart, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import birthdayCakeImg from "./assets/images/birthday_cake_26_1780576134041.png";
import loveLetterImg from "./assets/images/romantic_love_letter_1780576148270.png";
import polaroidImg from "./assets/images/memories_polaroid_path_1780576163187.png";

import BirthdayLetter from "./components/BirthdayLetter";
import DuqueCorner from "./components/DuqueCorner";
import Jukebox from "./components/Jukebox";
import LoveCoupons from "./components/LoveCoupons";
import LoveJar from "./components/LoveJar";
import ReasonsToLove from "./components/ReasonsToLove";
import RomanticRefuge from "./components/RomanticRefuge";
import Timeline from "./components/Timeline";
import Trivia from "./components/Trivia";

import { FloatingHeart, Memory, Song } from "./types";

const MUSIC_PLAYLIST: Song[] = [
  {
    id: "s1",
    title: "La Correcta",
    artist: "Morat y Nabalez",
    duration: "3:15",
    audioUrl: `${import.meta.env.BASE_URL}la-correcta.mp3`,
    coverIndex: 1,
  },
];

const INITIAL_MEMORIES: Memory[] = [
  {
    id: "1",
    date: "Primera foto juntos",
    title: "Lagunas de Yala",
    description:
      "Nuestra primera foto juntos. El paisaje, la complicidad y esa sensación de estar empezando algo demasiado lindo como para explicarlo normal.",
    category: "romance",
    emoji: "🌿",
    imageSrc: `${import.meta.env.BASE_URL}memories/yala.jpeg`,
  },
  {
    id: "2",
    date: "Un detalle que amo recordar",
    title: "Tus flores y esa sonrisa",
    description:
      "Esa sorpresa con flores y tu sonrisa tan linda merecía estar acá. Me encanta verte feliz y poder regalarte momentos así.",
    category: "romance",
    emoji: "🌻",
    imageSrc: `${import.meta.env.BASE_URL}memories/flores.jpeg`,
  },
  {
    id: "3",
    date: "Nuestro primer viaje juntos",
    title: "Escapada a Córdoba",
    description:
      "Ese viaje a Córdoba marcó un antes y un después. Mate, ruta, charla y esa alegría de sentir que con vos todo fluye.",
    category: "adventure",
    emoji: "🧉",
    imageSrc: `${import.meta.env.BASE_URL}memories/cordoba.jpeg`,
  },
  {
    id: "4",
    date: "Tu vocación y un orgullo enorme",
    title: "Recibida de Hemoterapia",
    description:
      "Verte recibirte fue una mezcla de orgullo, admiración y ganas de aplaudirte para siempre. Me fascina escucharte hablar de lo que amás.",
    category: "milestone",
    emoji: "🎓",
    imageSrc: `${import.meta.env.BASE_URL}memories/hemoterapia.jpeg`,
  },
  {
    id: "5",
    date: "Una salida simple y hermosa",
    title: "Fuimos al cine",
    description:
      "Me encanta cómo hasta una ida al cine con vos se vuelve recuerdo favorito. Tu sonrisa ahí me puede siempre.",
    category: "daily",
    emoji: "🎬",
    imageSrc: `${import.meta.env.BASE_URL}memories/cine.jpeg`,
  },
  {
    id: "6",
    date: "Tu cumple anterior",
    title: "Ese cumple tan nuestro",
    description:
      "Esa foto tuya me derrite. Me encanta recordarte así, sonriendo tan hermosa en un día tan especial.",
    category: "romance",
    emoji: "🎂",
    imageSrc: `${import.meta.env.BASE_URL}memories/cumple-anterior.jpeg`,
  },
  {
    id: "7",
    date: "Otra foto tuya que amo muchísimo",
    title: "Estabas tan linda",
    description:
      "La otra foto del cumple también tenía que estar sí o sí, porque estabas tan linda que no podía dejarla afuera.",
    category: "romance",
    emoji: "💛",
    imageSrc: `${import.meta.env.BASE_URL}memories/cumple-anterior-2.jpeg`,
  },
];

const ROMANTIC_STEPS = [
  { id: "music-section", title: "Poné play en nuestra canción", note: "Empezá con la música." },
  { id: "letter-section", title: "Abrí la carta", note: "Leela tranquila, es toda para vos." },
  { id: "love-jar-section", title: "Destapá el frasco de mimos", note: "Acá guardé mensajitos." },
  { id: "timeline-section", title: "Mirá nuestros recuerdos", note: "Un paseo por nosotros." },
  { id: "reasons-section", title: "Leé las 26 razones", note: "Una por cada añito tuyo." },
];

export default function App() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [whisperMessage, setWhisperMessage] = useState(
    "Tocá cualquier rincón para ir llenando este regalo de pensamientos de amor.",
  );
  const [introModal, setIntroModal] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "BUTTON" ||
      target.closest("button") ||
      target.closest("input")
    ) {
      return;
    }

    triggerHeartShower(e.clientX, e.clientY);
  };

  const goToStep = (index: number) => {
    const step = ROMANTIC_STEPS[index];
    const element = document.getElementById(step.id);
    if (!element) return;

    setActiveStep(index);
    setCompletedSteps((prev) => (prev.includes(index) ? prev : [...prev, index].sort((a, b) => a - b)));
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nextStepIndex = useMemo(
    () => (activeStep + 1 < ROMANTIC_STEPS.length ? activeStep + 1 : null),
    [activeStep],
  );

  const triggerHeartShower = (x: number, y: number, text?: string) => {
    const customPhrases = [
      "Te amo muchísimo y me hacés muy feliz",
      "Gracias por existir y por dejarme amarte",
      "Sos mi persona favorita en el mundo",
      "Con vos hasta los días simples se sienten hermosos",
      "Tus abrazos son mi lugar favorito",
      "Me encanta cuidarte, acompañarte y verte feliz",
      "Sos mi Flor hermosa y te elegiría siempre",
      "Te amo hasta la palmera y mucho más",
    ];

    const phrase = text || customPhrases[Math.floor(Math.random() * customPhrases.length)];
    setWhisperMessage(`Para Flor: ${phrase}`);

    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`,
      x: x + (Math.random() * 80 - 40),
      y: y + (Math.random() * 80 - 40),
      scale: 0.5 + Math.random() * 0.7,
      rotation: Math.random() * 90 - 45,
      text: i === 0 ? phrase : undefined,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => !newHearts.some((item) => item.id === heart.id)));
    }, 2000);
  };

  return (
    <div
      id="root-bday-app"
      onClick={handlePageClick}
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#EBF8F6] via-[#F8FDFC] to-[#E7F5F0] pb-28 font-sans selection:bg-[#A8E6CF] selection:text-[#0F3A32]"
    >
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            style={{
              left: heart.x,
              top: heart.y,
              transform: `scale(${heart.scale}) rotate(${heart.rotation}deg)`,
            }}
            className="absolute flex select-none flex-col items-center justify-center text-[#3BA28F] filter drop-shadow-md heart-particle"
          >
            <Heart className="h-5 w-5 fill-[#A3E7DC] text-[#3BA28F]" />
            {heart.text && (
              <span className="mt-1 whitespace-nowrap rounded-full border border-[#4DB6A3]/30 bg-white/90 px-2 py-0.5 text-[9px] font-bold text-[#1B4D43] shadow-sm">
                {heart.text}
              </span>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {introModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pb-8 pt-12 backdrop-blur-md md:items-center md:pt-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="relative my-auto w-full max-w-md rounded-3xl border border-[#4DB6A3]/25 bg-white p-6 text-center shadow-2xl md:p-8"
            >
              <div className="absolute left-1/2 top-[-30px] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#4DB6A3] text-white shadow-lg">
                <Heart className="h-8 w-8 animate-pulse fill-white" />
              </div>

              <h3 className="mt-6 font-sans text-2xl font-extrabold tracking-tight text-gray-800">
                Hola, mi reina hermosa
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Preparé este rinconcito para acompañarte despacito: primero nuestra canción,
                después la carta y, más abajo, los recuerdos y las sorpresas. Quise que se sienta
                íntimo, dulce y totalmente nuestro.
              </p>
              <p className="mt-4 rounded-2xl border border-[#4DB6A3]/20 bg-[#EAFDF9] px-4 py-2.5 font-mono text-xs font-bold text-[#1B4D43]">
                Día oficial del festejo de la mujer más linda: 17 de junio
              </p>
              <div className="mt-4 space-y-1.5 rounded-xl border border-gray-100 bg-gray-50 p-3.5 text-left text-xs text-gray-500">
                <p>
                  <b>Cómo recorrerlo:</b>
                </p>
                <p>• Empezá por la canción y la carta.</p>
                <p>• Seguí con el frasco y nuestros recuerdos.</p>
                <p>• Al final te esperan las razones y los extras.</p>
              </div>

              <button
                onClick={() => {
                  setIntroModal(false);
                  triggerHeartShower(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    "Que empiece este recorrido hecho con amor para vos",
                  );
                }}
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#4DB6A3] py-3 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#3AA28F] active:scale-95"
              >
                Empezar este regalo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-5xl px-4 pt-8">
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-[#4DB6A3]/25 bg-white/70 px-5 py-3 font-mono text-xs font-semibold text-[#1B4D43] shadow-md backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-ping rounded-full bg-[#4DB6A3]" />
            <span>Un regalo hecho con amor para Flor Lihue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 shrink-0 animate-pulse fill-teal-400 text-teal-400" />
            <span>Felices 26, mi amor</span>
          </div>
        </div>

        <div className="mb-8 text-center md:mb-10">
          <motion.div
            key="birthday-active-header"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative mx-auto mb-5 max-w-2xl overflow-hidden rounded-3xl border border-[#4DB6A3]/25 bg-white/85 p-6 shadow-xl md:mb-6 md:p-8"
          >
            <div className="absolute left-4 top-2 animate-bounce select-none text-2xl">🎈</div>
            <div
              className="absolute right-4 top-2 animate-bounce select-none text-2xl"
              style={{ animationDelay: "0.4s" }}
            >
              🎉
            </div>

            <h1 className="bg-gradient-to-r from-[#113A32] via-[#225E52] to-[#4DB6A3] bg-clip-text font-sans text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl">
              Feliz cumple, mi Flor Lihue hermosa ❤️
            </h1>
            <p className="mt-3 font-serif text-lg font-semibold italic text-[#1B4D43]">
              Para la chica que me hace feliz con un mate, una mirada, un mimo o simplemente
              estando conmigo.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
              Hoy cumplís 26 añitos y quería regalarte algo distinto: un recorrido cortito,
              romántico y lleno de nosotros para que cada parte te abrace un poquito.
            </p>

            <div className="mt-5 flex justify-center">
              <div className="flex max-w-full items-center gap-2 rounded-full border border-[#EAFDF9]/60 bg-[#EAFDF9] px-4 py-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1B4D43] shadow-sm sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-wider">
                <Sparkles className="h-4 w-4 fill-teal-600/20 text-teal-600" />
                <span>Preparé esto porque te amo, quiero que seas feliz y me encanta hacerlo por vos</span>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="h-5 w-5 text-gray-400" />
            </motion.div>
          </div>
        </div>

        <section className="mb-8 rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_18px_40px_rgba(27,77,67,0.08)] backdrop-blur-md md:mb-10 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#B88357]">
                Recorrido guiado
              </p>
              <h2 className="mt-2 font-serif text-2xl text-[#214D44]">
                Si querés, te voy llevando paso a paso
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#58706A]">
                Lo pensé como un recorrido romántico para que sepas dónde tocar primero y puedas
                vivirlo despacito.
              </p>
            </div>

            <div className="rounded-[1.4rem] border border-[#DCEEE9] bg-[#F8FFFD] p-3 shadow-sm md:hidden">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#B88357]">
                  Paso {activeStep + 1}/{ROMANTIC_STEPS.length}
                </span>
                {nextStepIndex !== null && (
                  <button
                    type="button"
                    onClick={() => goToStep(nextStepIndex)}
                    className="rounded-full bg-[#214D44] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#183C35] active:scale-95"
                  >
                    Siguiente
                  </button>
                )}
              </div>
              <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-[#E3F1ED]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4DB6A3] to-[#214D44] transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / ROMANTIC_STEPS.length) * 100}%` }}
                />
              </div>
              <p className="text-sm font-serif text-[#214D44]">{ROMANTIC_STEPS[activeStep].title}</p>
            </div>

            {nextStepIndex !== null && (
              <button
                type="button"
                onClick={() => goToStep(nextStepIndex)}
                className="hidden cursor-pointer rounded-full bg-[#214D44] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#183C35] active:scale-95 md:block"
              >
                Seguir recorrido
              </button>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {ROMANTIC_STEPS.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => goToStep(index)}
                className={`rounded-[1.4rem] border p-4 text-left transition-all cursor-pointer ${
                  activeStep === index
                    ? "border-[#8FD4C4] bg-[#F6FFFC] shadow-[0_12px_24px_rgba(33,77,68,0.10)]"
                    : "border-white/80 bg-white/70 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#B88357]">
                    Paso {index + 1}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                      completedSteps.includes(index)
                        ? "bg-[#DFF7F0] text-[#1F6A5D]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {completedSteps.includes(index) ? "Visto" : "Pendiente"}
                  </span>
                </div>
                <span className="mt-2 block font-serif text-lg text-[#214D44]">{step.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-[#607772]">{step.note}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="mb-10 grid grid-cols-1 items-start gap-6 lg:mb-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-5 lg:space-y-8">
            <div id="music-section">
              <Jukebox
                songs={MUSIC_PLAYLIST}
                onTriggerFloating={triggerHeartShower}
                birthdayCakeImg={birthdayCakeImg}
                loveLetterImg={loveLetterImg}
                polaroidImg={polaroidImg}
              />
            </div>

            <BirthdayLetter
              onTriggerFloating={triggerHeartShower}
              loveLetterImg={loveLetterImg}
            />
          </div>

          <div className="space-y-6 lg:col-span-7 lg:space-y-8">
            <LoveJar onTriggerFloating={triggerHeartShower} />

            <div id="timeline-section">
              <Timeline
                memories={INITIAL_MEMORIES}
                onTriggerFloating={triggerHeartShower}
                birthdayCakeImg={birthdayCakeImg}
                loveLetterImg={loveLetterImg}
                polaroidImg={polaroidImg}
              />
            </div>
          </div>
        </div>

        <div className="my-8 space-y-8 md:my-10 md:space-y-10">
          <ReasonsToLove onTriggerFloating={triggerHeartShower} />
        </div>

        <section className="mb-10 rounded-[2rem] border border-white/70 bg-white/65 p-5 shadow-[0_22px_50px_rgba(27,77,67,0.10)] backdrop-blur-md md:p-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#B88357]">
              Extras para seguir jugando
            </p>
            <h2 className="mt-2 font-serif text-2xl text-[#214D44] md:text-3xl">
              Cuando termines lo principal, acá siguen las sorpresas
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#58706A]">
              Dejé estos rinconcitos más livianos para el final, como si después de la carta y
              los recuerdos nos quedáramos jugando un rato más juntos.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start xl:gap-8">
            <Trivia onTriggerFloating={triggerHeartShower} />
            <DuqueCorner onTriggerFloating={triggerHeartShower} />
            <LoveCoupons onTriggerFloating={triggerHeartShower} />
            <RomanticRefuge onTriggerFloating={triggerHeartShower} />
          </div>
        </section>

        <footer className="mx-auto max-w-md rounded-2xl border border-gray-200/50 bg-white/40 px-4 py-6 text-center font-mono text-xs text-gray-400">
          <p className="mb-1 flex items-center justify-center gap-1.5 font-bold text-[#1B4D43]">
            <span>Hecho con amor eterno por tu novio</span>
            <Heart className="h-3.5 w-3.5 shrink-0 animate-pulse fill-teal-400 text-teal-400" />
          </p>
          <p className="px-5">
            Dedicado con orgullo a Flor Lihue en sus 26 años. Sos mi amorcito, mi princesa y mi
            compañera favorita para la vida.
          </p>
          <span className="mt-2 block text-[9px] text-gray-300">
            2026 - Todos nuestros recuerdos guardados para siempre
          </span>
        </footer>
      </div>

      <div className="fixed bottom-3 right-4 z-40 hidden w-[360px] md:block">
        <div className="rounded-[1.6rem] border border-[#4DB6A3]/20 bg-white/88 p-3 shadow-xl backdrop-blur-lg">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#B88357]">
              Recorrido {activeStep + 1}/{ROMANTIC_STEPS.length}
            </span>
            {nextStepIndex !== null && (
              <button
                type="button"
                onClick={() => goToStep(nextStepIndex)}
                className="rounded-full bg-[#214D44] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#183C35] active:scale-95"
              >
                Siguiente
              </button>
            )}
          </div>

          <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-[#E3F1ED]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4DB6A3] to-[#214D44] transition-all duration-500"
              style={{ width: `${((activeStep + 1) / ROMANTIC_STEPS.length) * 100}%` }}
            />
          </div>

          <p className="text-sm font-serif text-[#214D44]">{ROMANTIC_STEPS[activeStep].title}</p>
          <motion.p
            key={whisperMessage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 flex items-start gap-1.5 text-[11px] font-medium leading-relaxed text-[#56706A]"
          >
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-teal-500/10 text-teal-500" />
            <span>{whisperMessage}</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
