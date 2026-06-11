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
      "Nuestra primera foto juntos. El paisaje, la complicidad y esa sensacion de estar empezando algo demasiado lindo como para explicarlo normal.",
    category: "romance",
    emoji: "🌿",
    imageSrc: `${import.meta.env.BASE_URL}memories/yala.jpeg`,
  },
  {
    id: "2",
    date: "Un detalle que amo recordar",
    title: "Tus flores y esa sonrisa",
    description:
      "Esa sorpresa con flores y tu sonrisa tan linda merecia estar aca. Me encanta verte feliz y poder regalarte momentos asi.",
    category: "romance",
    emoji: "🌻",
    imageSrc: `${import.meta.env.BASE_URL}memories/flores.jpeg`,
  },
  {
    id: "3",
    date: "Nuestro primer viaje juntos",
    title: "Escapada a Cordoba",
    description:
      "Ese viaje a Cordoba marco un antes y un despues. Mate, ruta, charla y esa alegria de sentir que con vos todo fluye.",
    category: "adventure",
    emoji: "🧉",
    imageSrc: `${import.meta.env.BASE_URL}memories/cordoba.jpeg`,
  },
  {
    id: "4",
    date: "Tu vocacion y un orgullo enorme",
    title: "Recibida de Hemoterapia",
    description:
      "Verte recibirte fue una mezcla de orgullo, admiracion y ganas de aplaudirte para siempre. Me fascina escucharte hablar de lo que amas.",
    category: "milestone",
    emoji: "🎓",
    imageSrc: `${import.meta.env.BASE_URL}memories/hemoterapia.jpeg`,
  },
  {
    id: "5",
    date: "Una salida simple y hermosa",
    title: "Fuimos al cine",
    description:
      "Me encanta como hasta una ida al cine con vos se vuelve recuerdo favorito. Tu sonrisa ahi me puede siempre.",
    category: "daily",
    emoji: "🎬",
    imageSrc: `${import.meta.env.BASE_URL}memories/cine.jpeg`,
  },
  {
    id: "6",
    date: "Tu cumple anterior",
    title: "Ese cumple tan nuestro",
    description:
      "Esa foto tuya me derrite. Me encanta recordarte asi, sonriendo tan hermosa en un dia tan especial.",
    category: "romance",
    emoji: "🎂",
    imageSrc: `${import.meta.env.BASE_URL}memories/cumple-anterior.jpeg`,
  },
  {
    id: "7",
    date: "Otra foto tuya que amo muchisimo",
    title: "Estabas tan linda",
    description:
      "La otra foto del cumple tambien tenia que estar si o si, porque estabas tan linda que no podia dejarla afuera.",
    category: "romance",
    emoji: "💛",
    imageSrc: `${import.meta.env.BASE_URL}memories/cumple-anterior-2.jpeg`,
  },
];

export default function App() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [, setWhisperMessage] = useState(
    "Toca cualquier rincon para ir llenando este regalo de pensamientos de amor.",
  );
  const [introModal, setIntroModal] = useState(true);

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

  const triggerHeartShower = (x: number, y: number, text?: string) => {
    const customPhrases = [
      "Te amo muchisimo y me haces muy feliz",
      "Gracias por existir y por dejarme amarte",
      "Sos mi persona favorita en el mundo",
      "Con vos hasta los dias simples se sienten hermosos",
      "Tus abrazos son mi lugar favorito",
      "Me encanta cuidarte, acompanarte y verte feliz",
      "Sos mi Flor hermosa y te elegiria siempre",
      "Te amo hasta la palmera y mucho mas",
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
    }, 3600);
  };

  return (
    <div
      id="root-bday-app"
      onClick={handlePageClick}
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#EBF8F6] via-[#F8FDFC] to-[#EDEEE8] pb-28 font-sans selection:bg-[#A8E6CF] selection:text-[#0F3A32]"
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
            className="heart-particle absolute flex select-none flex-col items-center justify-center text-[#3BA28F] drop-shadow-md"
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
                Prepare este rinconcito para acompanarte despacito: primero nuestra cancion,
                despues la carta y, mas abajo, los recuerdos y las sorpresas.
              </p>
              <p className="mt-4 rounded-2xl border border-[#4DB6A3]/20 bg-[#EAFDF9] px-4 py-2.5 font-mono text-xs font-bold text-[#1B4D43]">
                Dia oficial del festejo de la mujer mas linda: 17 de junio
              </p>

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

      <div className="mx-auto max-w-[1380px] px-4 pt-6 md:px-6 md:pt-8 xl:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#D7E7E1] bg-white/72 px-4 py-3 text-[11px] font-semibold text-[#35534C] shadow-sm backdrop-blur-md md:mb-8 md:px-5 md:font-mono md:text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-ping rounded-full bg-[#4DB6A3]" />
            <span>Un regalo hecho con amor para Flor Lihue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 shrink-0 animate-pulse fill-teal-400 text-teal-400" />
            <span>Felices 26, mi amor</span>
          </div>
        </div>

        <div className="mb-8 md:mb-10">
          <motion.div
            key="birthday-active-header"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative overflow-hidden rounded-[2.2rem] border border-[#E2ECE8] bg-[linear-gradient(135deg,rgba(255,252,248,0.98),rgba(245,250,247,0.95))] p-6 shadow-[0_18px_48px_rgba(35,77,67,0.08)] md:p-8"
          >
            <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-[#F4DED7]/60 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-[#DCEEE7]/70 blur-3xl" />

            <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1.3fr)_320px] lg:gap-8">
              <div className="text-center lg:text-left">
                <div className="absolute left-4 top-2 hidden select-none text-2xl lg:block">🎈</div>
                <div
                  className="absolute right-4 top-2 hidden select-none text-2xl lg:block"
                  style={{ animationDelay: "0.4s" }}
                >
                  🎉
                </div>

                <h1 className="bg-gradient-to-r from-[#113A32] via-[#225E52] to-[#4DB6A3] bg-clip-text font-sans text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                  Feliz cumple, mi Flor Lihue hermosa ❤️
                </h1>
                <p className="mt-3 font-serif text-lg font-medium italic text-[#1B4D43] md:text-xl">
                  Para la chica que me hace feliz con un mate, una mirada, un mimo o simplemente estando conmigo.
                </p>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#62716C] lg:mx-0 lg:max-w-2xl">
                  Hoy cumplis 26 anitos y queria regalarte algo distinto: un recorrido romantico y lleno de nosotros para que cada parte te abrace un poquito.
                </p>

                <div className="mt-5 flex justify-center lg:justify-start">
                  <div className="flex max-w-full items-center gap-2 rounded-full border border-[#EAF4F0] bg-[#F3FBF8] px-4 py-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#35534C] shadow-sm sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.2em]">
                    <Sparkles className="h-4 w-4 fill-teal-600/20 text-teal-600" />
                    <span>Prepare esto porque te amo y me encanta hacerlo por vos</span>
                  </div>
                </div>
              </div>

              <div className="hidden rounded-[1.9rem] border border-[#EEF2EF] bg-white/84 p-5 text-left shadow-[0_14px_32px_rgba(33,77,68,0.06)] lg:block">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#B88357]">
                  Este regalo tiene
                </p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-[1.2rem] border border-[#EDF2EF] bg-[#FCFEFD] px-4 py-3">
                    <p className="font-serif text-lg text-[#214D44]">Nuestra cancion</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#6A7A75]">Para empezar con el clima justo.</p>
                  </div>
                  <div className="rounded-[1.2rem] border border-[#EDF2EF] bg-[#FCFEFD] px-4 py-3">
                    <p className="font-serif text-lg text-[#214D44]">Carta y recuerdos</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#6A7A75]">Lo mas importante, con aire y en su lugar.</p>
                  </div>
                  <div className="rounded-[1.2rem] border border-[#EDF2EF] bg-[#FCFEFD] px-4 py-3">
                    <p className="font-serif text-lg text-[#214D44]">Sorpresas suaves</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#6A7A75]">Para seguir jugando al final sin tapar lo principal.</p>
                  </div>
                </div>
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

        <div className="mb-10 space-y-6 xl:mb-12 xl:space-y-8">
          <div id="music-section">
            <Jukebox
              songs={MUSIC_PLAYLIST}
              onTriggerFloating={triggerHeartShower}
              birthdayCakeImg={birthdayCakeImg}
              loveLetterImg={loveLetterImg}
              polaroidImg={polaroidImg}
            />
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-12 xl:gap-8">
            <div className="xl:col-span-5">
              <BirthdayLetter
                onTriggerFloating={triggerHeartShower}
                loveLetterImg={loveLetterImg}
              />
            </div>

            <div className="xl:col-span-7">
              <LoveJar onTriggerFloating={triggerHeartShower} />
            </div>
          </div>

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

        <div className="my-8 space-y-8 md:my-10 md:space-y-10">
          <ReasonsToLove onTriggerFloating={triggerHeartShower} />
        </div>

        <section className="mb-10 rounded-[2rem] border border-[#EDF1EE] bg-[linear-gradient(180deg,rgba(250,251,249,0.95),rgba(244,247,245,0.93))] p-5 shadow-[0_16px_38px_rgba(27,77,67,0.05)] backdrop-blur-md md:p-8">
          <div className="max-w-2xl xl:max-w-3xl">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#B88357]">
              Extras para seguir jugando
            </p>
            <h2 className="mt-2 font-serif text-2xl text-[#214D44] md:text-3xl">
              Cuando termines lo principal, aca siguen las sorpresas
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#58706A]">
              Los deje para el final, como un cierre mas relajado despues de la carta, los recuerdos y lo importante.
            </p>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-12 xl:gap-8">
            <div className="xl:col-span-5 xl:h-full">
              <Trivia onTriggerFloating={triggerHeartShower} />
            </div>
            <div className="xl:col-span-7 xl:h-full">
              <DuqueCorner onTriggerFloating={triggerHeartShower} />
            </div>
            <div className="xl:col-span-7 xl:h-full">
              <LoveCoupons onTriggerFloating={triggerHeartShower} />
            </div>
            <div className="xl:col-span-5 xl:h-full">
              <RomanticRefuge onTriggerFloating={triggerHeartShower} />
            </div>
          </div>
        </section>

        <footer className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#E3EBE7] bg-[linear-gradient(135deg,rgba(255,252,248,0.9),rgba(245,250,247,0.92))] px-5 py-8 text-center shadow-[0_18px_44px_rgba(27,77,67,0.06)] md:px-8 md:py-10">
          <div className="absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-[#F6DDD7]/55 blur-3xl" />
          <div className="absolute -right-6 top-0 h-28 w-28 rounded-full bg-[#DDEFE8]/70 blur-3xl" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B88357] shadow-sm">
              <Heart className="h-3.5 w-3.5 shrink-0 fill-[#E7B7C3] text-[#D890A4]" />
              Para vos, mi amor
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-serif text-2xl leading-relaxed text-[#214D44] md:text-[2rem]">
              Ojala cada parte de esta pagina te recuerde, aunque sea un poquito, lo feliz que me hace amarte.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#64746E]">
              Feliz cumple, mi Flor Lihue hermosa. Gracias por ser mi lugar favorito, mi paz y mi companera mas linda.
            </p>
            <span className="mt-5 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#90A19B]">
              2026 · guardado con amor para siempre
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
