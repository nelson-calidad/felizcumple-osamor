import React, { StrictMode, useState } from "react";
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
import RomanticRefuge from "./components/RomanticRefuge";
import Timeline from "./components/Timeline";
import Trivia from "./components/Trivia";

import { FloatingHeart, Memory, Song } from "./types";

/*
  Guia para subir tus propias canciones:
  1. Guarda el mp3 en la carpeta public.
  2. Cambia el audioUrl de la cancion por "/nombre-del-archivo.mp3".
  3. Vuelve a hacer push y GitHub Pages lo publica junto con la app.
*/
const MUSIC_PLAYLIST: Song[] = [
  {
    id: "s_bday",
    title: "Feliz Cumpleanos (Version Perrito Malvado)",
    artist: "Novio del Ano y El Perrito Malvado",
    duration: "2:10",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    coverIndex: 0,
  },
  {
    id: "s1",
    title: "La Correcta",
    artist: "Morat y Nabalez",
    duration: "3:15",
    audioUrl: "/la-correcta.mp3",
    coverIndex: 1,
  },
  {
    id: "s2",
    title: "No Se Va (Acustico)",
    artist: "Morat",
    duration: "3:40",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverIndex: 2,
  },
  {
    id: "s3",
    title: "Aprender a Querer",
    artist: "Morat",
    duration: "3:49",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
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
    emoji: "🌲",
    imageIndex: 2,
  },
  {
    id: "2",
    date: "Nuestro primer viaje juntos",
    title: "Escapada a Cordoba",
    description:
      "Sierras, charlas eternas, mates ida y vuelta y esa alegria de descubrir que con vos hasta el camino se vuelve planazo.",
    category: "adventure",
    emoji: "🧉",
    imageIndex: 1,
  },
  {
    id: "3",
    date: "Tu vocacion y mayor logro",
    title: "Tecnica en Hemoterapia",
    description:
      "Verte recibirte fue una mezcla de orgullo, admiracion y ganas de aplaudirte para siempre. Me fascina escucharte hablar de lo que amas.",
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

export default function App() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [whisperMessage, setWhisperMessage] = useState(
    "Toca cualquier rincon para soltar pensamientos amorosos y mimos en suspension.",
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
      "Te amo hasta la palmera, hasta el cielo y un poco mas porque soy intenso",
      "La Duque aprueba este regalo y exige mimos de control de calidad",
      "Agradezco por tu vida y por el privilegio de compartirla con vos",
      "Sos mi persona favorita para amar, reirme y pedir delivery",
      "Me encantas en modo linda, en modo seria y en modo antojo de lomito",
      "Sos tan hermosa que hasta mis nervios quisieron quedar elegantes",
      "Me haces feliz incluso cuando me distraigo mirandote como un bobo",
      "Sos la correcta de mi vida entera y encima la mas graciosa",
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
      className="min-h-screen bg-gradient-to-b from-[#EBF8F6] via-[#F4FDFB] to-[#D3EFEA] relative overflow-x-hidden font-sans pb-20 selection:bg-[#A8E6CF] selection:text-[#0F3A32]"
    >
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            style={{
              left: heart.x,
              top: heart.y,
              transform: `scale(${heart.scale}) rotate(${heart.rotation}deg)`,
            }}
            className="absolute heart-particle text-[#3BA28F] select-none flex flex-col items-center justify-center filter drop-shadow-md"
          >
            <Heart className="w-5 h-5 fill-[#A3E7DC] text-[#3BA28F]" />
            {heart.text && (
              <span className="bg-white/90 border border-[#4DB6A3]/30 px-2 py-0.5 rounded-full text-[9px] text-[#1B4D43] font-bold mt-1 whitespace-nowrap shadow-sm">
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
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-start md:items-center justify-center p-4 pt-12 md:pt-4 pb-8 overflow-y-auto animate-fadeIn"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#4DB6A3]/25 relative text-center my-auto"
            >
              <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-16 h-16 bg-[#4DB6A3] rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
                <Heart className="w-8 h-8 fill-white animate-pulse" />
              </div>

              <h3 className="text-2xl font-extrabold text-gray-800 mt-6 tracking-tight font-sans">
                Hola, mi reina hermosa
              </h3>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                Prepare este rinconcito verde agua con amor, cursileria premium y una cuota
                responsable de payasadas, porque tus 26 merecen algo romantico, dulce y
                totalmente nuestro.
              </p>
              <p className="text-[#1B4D43] font-bold text-xs bg-[#EAFDF9] px-4 py-2.5 rounded-2xl border border-[#4DB6A3]/20 mt-4 font-mono">
                Dia oficial del festejo de la mujer mas linda: 17 de junio
              </p>
              <div className="text-left bg-gray-50 p-3.5 rounded-xl border border-gray-100 mt-4 space-y-1.5 text-xs text-gray-500">
                <p>
                  <b>Como recorrer este pequeno delirio romantico:</b>
                </p>
                <p>• Dale play al Jukebox y deja que Morat haga de tercero respetuoso.</p>
                <p>• Toca el Frasco de Mimos para sacar mensajes dulces, complices y peligrosos para el corazon.</p>
                <p>• Mira nuestra linea del tiempo y desbloquea recuerdos, secretos y escenas donde combinamos demasiado bien.</p>
                <p>• Abri la carta cuando quieras leer la parte donde me pongo meloso sin pedir perdon.</p>
                <p>• Toca cualquier rincon para soltar pensamientos, antojos de mimos y ataques de amor.</p>
              </div>

              <button
                onClick={() => {
                  setIntroModal(false);
                  triggerHeartShower(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    "Que empiece esta ternurita ridiculamente enamorada",
                  );
                }}
                className="mt-6 w-full py-3 bg-[#4DB6A3] hover:bg-[#3AA28F] text-white font-extrabold text-sm rounded-full shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Entrar a este escandalo de amor
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 pt-8">
        <div className="flex justify-between items-center bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 shadow-md border border-[#4DB6A3]/25 mb-8 text-xs font-semibold text-[#1B4D43] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4DB6A3] animate-ping" />
            <span>Regalo de cumpleanos para Flor Lihue, version melosa y peligrosa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-teal-400 text-teal-400 animate-pulse shrink-0" />
            <span>Felices 26, hermosa. Hoy se festeja fuerte</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <motion.div
            key="birthday-active-header"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white/85 border border-[#4DB6A3]/25 shadow-xl rounded-3xl p-8 max-w-2xl mx-auto mb-6 relative overflow-hidden"
          >
            <div className="absolute top-2 left-4 text-2xl select-none animate-bounce">🎈</div>
            <div
              className="absolute top-2 right-4 text-2xl select-none animate-bounce"
              style={{ animationDelay: "0.4s" }}
            >
              🎉
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#113A32] via-[#225E52] to-[#4DB6A3] tracking-tight font-sans animate-pulse">
              Feliz cumpleanos, Flor Lihue
            </h1>
            <p className="text-[#1B4D43] font-semibold italic font-serif text-lg mt-3">
              "Bienvenidos tus 26 anos, princesa. Yo traje amor, chistes malos y devocion."
            </p>
            <p className="text-gray-600 text-xs mt-3 max-w-md mx-auto leading-relaxed">
              Hoy el reloj se frena un ratito para aplaudir que existis. Gracias por tu
              risa, por tu ternura, por tus charlas, por tu forma hermosa de acompanarme y
              por ser la unica persona capaz de volver romantico hasta un mate con hambre y
              una salida por lomitos.
            </p>

            <div className="mt-5 flex justify-center">
              <div className="bg-[#EAFDF9] px-5 py-2.5 rounded-full border border-[#EAFDF9]/60 text-xs text-[#1B4D43] font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-teal-600 fill-teal-600/20" />
                <span>Hoy celebramos tu belleza, tu humor y lo bien que me tenes enamorado</span>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-6">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          <div className="md:col-span-5 space-y-8">
            <Jukebox
              songs={MUSIC_PLAYLIST}
              onTriggerFloating={triggerHeartShower}
              birthdayCakeImg={birthdayCakeImg}
              loveLetterImg={loveLetterImg}
              polaroidImg={polaroidImg}
            />

            <BirthdayLetter
              onTriggerFloating={triggerHeartShower}
              loveLetterImg={loveLetterImg}
            />
          </div>

          <div className="md:col-span-7 space-y-8">
            <LoveJar onTriggerFloating={triggerHeartShower} />

            <Timeline
              memories={INITIAL_MEMORIES}
              onTriggerFloating={triggerHeartShower}
              birthdayCakeImg={birthdayCakeImg}
              loveLetterImg={loveLetterImg}
              polaroidImg={polaroidImg}
            />
          </div>
        </div>

        <div className="space-y-10 my-10">
          <Trivia onTriggerFloating={triggerHeartShower} />
          <DuqueCorner onTriggerFloating={triggerHeartShower} />
          <LoveCoupons onTriggerFloating={triggerHeartShower} />
          <RomanticRefuge onTriggerFloating={triggerHeartShower} />
        </div>

        <footer className="text-center bg-white/40 border border-gray-200/50 rounded-2xl py-6 px-4 max-w-md mx-auto text-xs text-gray-400 font-mono">
          <p className="flex justify-center gap-1.5 items-center font-bold text-[#1B4D43] mb-1">
            <span>Hecho con amor eterno por tu novio</span>
            <Heart className="w-3.5 h-3.5 fill-teal-400 text-teal-400 animate-pulse shrink-0" />
          </p>
          <p className="px-5">
            Dedicado con orgullo a Flor Lihue en sus 26 anos. Sos mi amorcito, mi
            princesa y mi companera favorita para la vida y para el chisme.
          </p>
          <span className="text-[9px] block text-gray-300 mt-2">
            2026 - Todos nuestros recuerdos guardados para siempre
          </span>
        </footer>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-10 bg-white/80 backdrop-blur-lg border-t border-[#4DB6A3]/25 shadow-lg z-40 flex items-center justify-center text-center px-4 self-center select-none font-sans">
        <motion.p
          key={whisperMessage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-[#1B4D43] flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-500 fill-teal-500/10 shrink-0" />
          <span>{whisperMessage}</span>
        </motion.p>
      </div>
    </div>
  );
}
