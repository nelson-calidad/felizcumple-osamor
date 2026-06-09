import React, { useState } from "react";
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
    emoji: "🌲",
    imageIndex: 2,
  },
  {
    id: "2",
    date: "Nuestro primer viaje juntos",
    title: "Escapada a Cordoba",
    description:
      "Sierras, charlas eternas, mates ida y vuelta y esa alegría de descubrir que con vos hasta el camino se vuelve planazo.",
    category: "adventure",
    emoji: "🧉",
    imageIndex: 1,
  },
  {
    id: "3",
    date: "Tu vocación y mayor logro",
    title: "Técnica en Hemoterapia",
    description:
      "Verte recibirte fue una mezcla de orgullo, admiración y ganas de aplaudirte para siempre. Me fascina escucharte hablar de lo que amás.",
    category: "milestone",
    emoji: "🎓",
    imageIndex: 0,
  },
  {
    id: "4",
    date: "Nuestras citas perfectas",
    title: "Series Coreanas y Lomitos",
    description:
      "Comida rica, charlas largas, un dorama puesto de fondo y esa costumbre hermosa de pasarlo bien aunque no hagamos nada demasiado elaborado.",
    category: "daily",
    emoji: "🍔",
    imageIndex: 2,
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
    "Toca cualquier rincón para ir llenando este regalo de pensamientos de amor.",
  );
  const [introModal, setIntroModal] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

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
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#EBF8F6] via-[#F8FDFC] to-[#E7F5F0] pb-20 font-sans selection:bg-[#A8E6CF] selection:text-[#0F3A32]"
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
                Preparé esto porque te amo, porque quiero que seas feliz y porque me gusta
                hacerlo para vos. Espero que tengas un día hermoso, porque tus 26 merecen
                algo romántico, dulce y totalmente nuestro.
              </p>
              <p className="mt-4 rounded-2xl border border-[#4DB6A3]/20 bg-[#EAFDF9] px-4 py-2.5 font-mono text-xs font-bold text-[#1B4D43]">
                Día oficial del festejo de la mujer más linda: 17 de junio
              </p>
              <div className="mt-4 space-y-1.5 rounded-xl border border-gray-100 bg-gray-50 p-3.5 text-left text-xs text-gray-500">
                <p>
                  <b>Cómo recorrer este rinconcito de amor:</b>
                </p>
                <p>• Empezá por nuestra canción y dejá que te acompañe.</p>
                <p>• Después abrí la carta y leela tranquila.</p>
                <p>• Tocá el frasco de mimos para encontrar mensajitos.</p>
                <p>• Seguimos con nuestros recuerdos y con 26 razones por las que te amo.</p>
                <p>• Podés tocar cualquier rincón para ir llenando todo de amor.</p>
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
            <Heart className="h-3.5 w-3.5 animate-pulse fill-teal-400 text-teal-400 shrink-0" />
            <span>Felices 26, mi amor</span>
          </div>
        </div>

        <div className="mb-10 text-center">
          <motion.div
            key="birthday-active-header"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative mx-auto mb-6 max-w-2xl overflow-hidden rounded-3xl border border-[#4DB6A3]/25 bg-white/85 p-8 shadow-xl"
          >
            <div className="absolute left-4 top-2 animate-bounce select-none text-2xl">🎈</div>
            <div
              className="absolute right-4 top-2 animate-bounce select-none text-2xl"
              style={{ animationDelay: "0.4s" }}
            >
              🎉
            </div>

            <h1 className="bg-gradient-to-r from-[#113A32] via-[#225E52] to-[#4DB6A3] bg-clip-text font-sans text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
              Feliz cumple, mi Flor Lihue hermosa ❤️
            </h1>
            <p className="mt-3 font-serif text-lg font-semibold italic text-[#1B4D43]">
              Para la chica que me hace feliz con un mate, una mirada, un mimo o simplemente
              estando conmigo.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
              Hoy cumplís 26 añitos y quería hacerte algo distinto, algo que quede para vos,
              para que cada vez que lo veas te acuerdes de lo mucho que te amo.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
              Esta paginita es para recordarte que sos mi persona favorita, mi compañera,
              mi amorcito, mi princesa y una de las cosas más lindas que tengo en la vida.
            </p>

            <div className="mt-5 flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-[#EAFDF9]/60 bg-[#EAFDF9] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1B4D43] shadow-sm">
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

        <section className="mb-10 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_18px_40px_rgba(27,77,67,0.08)] backdrop-blur-md md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#B88357]">
                Recorrido guiado
              </p>
              <h2 className="mt-2 font-serif text-2xl text-[#214D44]">
                Si querés, te voy llevando paso a paso
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#58706A]">
                Lo pensé como un recorrido romántico para que sepas dónde tocar primero y
                puedas vivirlo despacito.
              </p>
            </div>
            <button
              type="button"
              onClick={() => goToStep((activeStep + 1) % ROMANTIC_STEPS.length)}
              className="rounded-full bg-[#214D44] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#183C35] active:scale-95 cursor-pointer"
            >
              Siguiente sorpresa
            </button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-5">
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
                <span className="block text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#B88357]">
                  Paso {index + 1}
                </span>
                <span className="mt-2 block font-serif text-lg text-[#214D44]">{step.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-[#607772]">{step.note}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="mb-12 grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div className="space-y-8 md:col-span-5">
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

          <div className="space-y-8 md:col-span-7">
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

        <div className="my-10 space-y-10">
          <ReasonsToLove onTriggerFloating={triggerHeartShower} />
          <Trivia onTriggerFloating={triggerHeartShower} />
          <DuqueCorner onTriggerFloating={triggerHeartShower} />
          <LoveCoupons onTriggerFloating={triggerHeartShower} />
          <RomanticRefuge onTriggerFloating={triggerHeartShower} />
        </div>

        <footer className="mx-auto max-w-md rounded-2xl border border-gray-200/50 bg-white/40 px-4 py-6 text-center font-mono text-xs text-gray-400">
          <p className="mb-1 flex items-center justify-center gap-1.5 font-bold text-[#1B4D43]">
            <span>Hecho con amor eterno por tu novio</span>
            <Heart className="h-3.5 w-3.5 animate-pulse fill-teal-400 text-teal-400 shrink-0" />
          </p>
          <p className="px-5">
            Dedicado con orgullo a Flor Lihue en sus 26 años. Sos mi amorcito, mi princesa
            y mi compañera favorita para la vida.
          </p>
          <span className="mt-2 block text-[9px] text-gray-300">
            2026 - Todos nuestros recuerdos guardados para siempre
          </span>
        </footer>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-10 items-center justify-center border-t border-[#4DB6A3]/25 bg-white/80 px-4 text-center font-sans shadow-lg backdrop-blur-lg select-none">
        <motion.p
          key={whisperMessage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1B4D43]"
        >
          <Sparkles className="h-3.5 w-3.5 fill-teal-500/10 text-teal-500 shrink-0" />
          <span>{whisperMessage}</span>
        </motion.p>
      </div>
    </div>
  );
}
