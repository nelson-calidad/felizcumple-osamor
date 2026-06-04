import React, { useState, useEffect } from "react";
import { 
  Heart, Sparkles, Calendar, Music, Gift, Clock, AlertCircle, 
  MapPin, RefreshCw, Volume2, ArrowDown, HelpCircle, CheckCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import birthdayCakeImg from "./assets/images/birthday_cake_26_1780576134041.png";
import loveLetterImg from "./assets/images/romantic_love_letter_1780576148270.png";
import polaroidImg from "./assets/images/memories_polaroid_path_1780576163187.png";

import Jukebox from "./components/Jukebox";
import Timeline from "./components/Timeline";
import LoveJar from "./components/LoveJar";
import BirthdayLetter from "./components/BirthdayLetter";
import Trivia from "./components/Trivia";
import DuqueCorner from "./components/DuqueCorner";
import LoveCoupons from "./components/LoveCoupons";
import RomanticRefuge from "./components/RomanticRefuge";

import { Song, Memory, FloatingHeart } from "./types";

/*
  ========================================================================
  🎵 GUÍA PARA CAMBIAR LAS CANCIONES EN TU PROYECTO (Subida a GitHub / VS Code):
  ========================================================================
  ¡Podés poner cualquier canción real de forma súper sencilla!
  
  Sigue estos pasos en tu computadora (usando Visual Studio Code):
  1. Descarga los archivos en formato .mp3 de las canciones que quieras.
  2. Guarda esos archivos .mp3 en la carpeta "public" de tu proyecto.
     Por ejemplo, guárdalos como:
       - public/feliz_cumple_perrito.mp3
       - public/la_correcta.mp3
       - public/no_se_va.mp3
       - public/aprender_a_querer.mp3
  3. Modifica los valores de "audioUrl" de abajo para que apunten a esos archivos locales.
     Por ejemplo, reemplaza "https://..." por "/la_correcta.mp3" (con la barra al inicio).
  4. ¡Listo! Cuando lo subas a GitHub Pages o lo pruebes localmente, la música real sonará sola.
  ========================================================================
*/
const MUSIC_PLAYLIST: Song[] = [
  {
    id: "s_bday",
    title: "Feliz Cumpleaños (Versión Perrito Malvado) 🐾",
    artist: "Novio del Año & El Perrito Malvado",
    duration: "2:10",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", // Reemplazar por "/feliz_cumple_perrito.mp3" en VSCode
    coverIndex: 0
  },
  {
    id: "s1",
    title: "La Correcta",
    artist: "Morat & Nabález",
    duration: "3:15",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Reemplazar por "/la_correcta.mp3" en VSCode
    coverIndex: 1
  },
  {
    id: "s2",
    title: "No Se Va (Acústico)",
    artist: "Morat",
    duration: "3:40",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", // Reemplazar por "/no_se_va.mp3" en VSCode
    coverIndex: 2
  },
  {
    id: "s3",
    title: "Aprender a Querer",
    artist: "Morat",
    duration: "3:49",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", // Reemplazar por "/aprender_a_querer.mp3" en VSCode
    coverIndex: 1
  }
];

const INITIAL_MEMORIES: Memory[] = [
  {
    id: "1",
    date: "Primera foto juntos",
    title: "Lagunas de Yala",
    description: "Nuestra primer foto juntos. El paisaje de las Lagunas de Yala de fondo, nuestras miradas de complicidad y el inicio del camino más feliz de mi vida. Salías hermosa con tu luz natural tan integrada a la selva.",
    category: "romance",
    emoji: "🌲",
    imageIndex: 2
  },
  {
    id: "2",
    date: "Nuestro primer viaje juntos",
    title: "Escapada a Córdoba",
    description: "Fue hermoso nuestro primer viaje juntos. Las sierras, las tardes compartiendo un mate tras otro todo el tiempo (¡tu fiel compañero!), las charlas eternas en la ruta y darnos cuenta de que combinamos en cualquier rincón del mundo.",
    category: "adventure",
    emoji: "🧉",
    imageIndex: 1
  },
  {
    id: "3",
    date: "Tu vocación y mayor logro",
    title: "Técnica en Hemoterapia 💉",
    description: "Verte recibirte y notar cuánto amás tu carrera. Admiro profundamente tu dedicación. Sos una genia absoluta explicándome temas de hemoterapia y a mí me fascina y derrite de amor sentarme a escucharte siempre.",
    category: "milestone",
    emoji: "🎓",
    imageIndex: 0
  },
  {
    id: "4",
    date: "Nuestras Citas Perfectas 🍔🍿",
    title: "Series Coreanas & Lomitos",
    description: "Nuestras tardes comiendo hamburguesas riquísimas o lomitos, tratando de ver un dorama pero terminando charlando de la vida por horas. Amo lo empática y lloroncita hermosa que sos con las historias de amor.",
    category: "daily",
    emoji: "🍔",
    imageIndex: 2
  }
];

export default function App() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [whisperMessage, setWhisperMessage] = useState("✨ Toca cualquier rincón para liberar burbujas de amor... ¡La Duque te manda saludos! ✨");
  const [isBdayMode, setIsBdayMode] = useState(true);
  const [introModal, setIntroModal] = useState(true);


  // Handle adding floating particles on click
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid creating particles if clicked on interactive buttons inside inputs
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "BUTTON" || target.closest("button") || target.closest("input")) {
      return;
    }

    triggerHeartShower(e.clientX, e.clientY);
  };

  const triggerHeartShower = (x: number, y: number, text?: string) => {
    const customPhrases = [
      "Te amo hasta la palmera, hasta el cielo 🌴🌌",
      "La Duque 🐾 te manda saludos y te ama muchísimo",
      "Agradezco por tu vida, me hacés muy feliz desde que te conozco ❤️",
      "¡Te amo con locura, mi Princesa! 👑",
      "¡Me encantas, Amorcito mío! 💕",
      "¡Sos tan Hermosa, mi linda! 🥰",
      "¡Me hacés tan feliz, Amorcito! ⭐",
      "¡Sos la correcta de mi vida entera! 🎵"
    ];
    
    const phrase = text || customPhrases[Math.floor(Math.random() * customPhrases.length)];
    setWhisperMessage(`🧸 "Para Flor: ${phrase}"`);

    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`,
      x: x + (Math.random() * 80 - 40),
      y: y + (Math.random() * 80 - 40),
      scale: 0.5 + Math.random() * 0.7,
      rotation: Math.random() * 90 - 45,
      text: i === 0 ? phrase : undefined
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    // Keep clean particle state
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 2000);
  };

  return (
    <div 
      id="root-bday-app"
      onClick={handlePageClick}
      className="min-h-screen bg-gradient-to-b from-[#EBF8F6] via-[#F4FDFB] to-[#D3EFEA] relative overflow-x-hidden font-sans pb-20 selection:bg-[#A8E6CF] selection:text-[#0F3A32]"
    >
      
      {/* Dynamic particles absolute layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {hearts.map((h) => (
          <div
            key={h.id}
            style={{
              left: h.x,
              top: h.y,
              transform: `scale(${h.scale}) rotate(${h.rotation}deg)`,
            }}
            className="absolute heart-particle text-[#3BA28F] select-none flex flex-col items-center justify-center filter drop-shadow-md"
          >
            <Heart className="w-5 h-5 fill-[#A3E7DC] text-[#3BA28F]" />
            {h.text && (
              <span className="bg-white/90 border border-[#4DB6A3]/30 px-2 py-0.5 rounded-full text-[9px] text-[#1B4D43] font-bold mt-1 whitespace-nowrap shadow-sm">
                {h.text}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Floating Welcome Modal for Flor Lihue */}
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
                ¡Hola, mi reina hermosa! 💕
              </h3>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                Preparé este pequeño espacio delicado bañado en su totalidad de tu amado <b>verde agua</b>, con todo mi amor, para celebrar tus hermosos 26 años de vida, mi querida Flor Lihue.
              </p>
              <p className="text-[#1B4D43] font-bold text-xs bg-[#EAFDF9] px-4 py-2.5 rounded-2xl border border-[#4DB6A3]/20 mt-4 font-mono">
                "Día oficial: 17 de Junio 📅"
              </p>
              <div className="text-left bg-gray-50 p-3.5 rounded-xl border border-gray-100 mt-4 space-y-1.5 text-xs text-gray-500">
                <p>💡 <b>Cómo recorrer tu espacio especial:</b></p>
                <p>• 🎵 Dale Play al Jukebox para escuchar canciones de Morat de fondo.</p>
                <p>• 🧪 Toca el <b>Frasco de Mimos</b> o haz preguntas al Invocador Mágico (AI).</p>
                <p>• ⏳ Recorre nuestra <b>línea del tiempo</b> y revela pequeños secretos.</p>
                <p>• 💌 Haz clic en el sello lacrado de la carta para abrir tu sobre de sorpresa.</p>
                <p>• ✨ Toca cualquier rincón de la pantalla para liberar burbujas con mis pensamientos.</p>
              </div>

              <button
                onClick={() => {
                  setIntroModal(false);
                  triggerHeartShower(window.innerWidth / 2, window.innerHeight / 2, "¡Comienza la magia, Amorcito! ✨💚");
                }}
                className="mt-6 w-full py-3 bg-[#4DB6A3] hover:bg-[#3AA28F] text-white font-extrabold text-sm rounded-full shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Entrar a mi mundo feliz 🧁🧉
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        {/* TOP STATUS BAR ACCENTS */}
        <div className="flex justify-between items-center bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 shadow-md border border-[#4DB6A3]/25 mb-8 text-xs font-semibold text-[#1B4D43] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4DB6A3] animate-ping" />
            <span>Regalo de cumpleaños para Flor Lihue 🎁</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-teal-400 text-teal-400 animate-pulse shrink-0" />
            <span>Felices 26 añitos, hermosa 👑</span>
          </div>
        </div>

        {/* HERO TITLE & CELEBRATION TIMER WRAPPER */}
        <div className="text-center mb-10">
          <AnimatePresence mode="wait">
            {isBdayMode && (
              /* ACTIVE BIRTHDAY DISPLAY GREETING card */
              <motion.div 
                key="birthday-active-header"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white/85 border border-[#4DB6A3]/25 shadow-xl rounded-3xl p-8 max-w-2xl mx-auto mb-6 relative overflow-hidden"
              >
                {/* Visual streamers decorative */}
                <div className="absolute top-2 left-4 text-2xl select-none animate-bounce">🎈</div>
                <div className="absolute top-2 right-4 text-2xl select-none animate-bounce" style={{ animationDelay: '0.4s' }}>🎉</div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#113A32] via-[#225E52] to-[#4DB6A3] tracking-tight font-sans animate-pulse">
                  ¡Feliz Cumpleaños, Flor Lihue! 👑🎂
                </h1>
                <p className="text-[#1B4D43] font-semibold italic font-serif text-lg mt-3">
                  "Bienvenidos tus hermosos y maravillosos 26 años de edad, Princesa"
                </p>
                <p className="text-gray-600 text-xs mt-3 max-w-md mx-auto leading-relaxed">
                  Hoy a las doce de la noche se detiene el reloj para darte las gracias por existir y llenar de felicidad cada respiro de mi alma. ¡Agradezco profundamente por tu vida! Sos el regalo más precioso de mi mundo entera.
                </p>

                {/* Cake icon and visual sparkles */}
                <div className="mt-5 flex justify-center">
                  <div className="bg-[#EAFDF9] px-5 py-2.5 rounded-full border border-[#EAFDF9]/60 text-xs text-[#1B4D43] font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-teal-600 fill-teal-600/20" />
                    <span>¡Hoy celebramos todo lo hermoso que sos! 🌸✨</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompting card indicator down arrow to guide scrolling */}
          <div className="flex justify-center mt-6">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>

        {/* MAIN MODULES DUAL COLUMN bento GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* COLUMN 1: JUKEBOX + LOVE LETTER CARD (MD: 5 columns wide) */}
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

          {/* COLUMN 2: LOVE JAR INTERACTIVE PANEL + MEMORIES CHRONOLOGY (MD: 7 columns wide) */}
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

        {/* NEW AWESOME INTERACTIVE BIRTHDAY SECTIONS */}
        <div className="space-y-10 my-10">
          <Trivia onTriggerFloating={triggerHeartShower} />
          <DuqueCorner onTriggerFloating={triggerHeartShower} />
          <LoveCoupons onTriggerFloating={triggerHeartShower} />
          <RomanticRefuge onTriggerFloating={triggerHeartShower} />
        </div>

        {/* BRIGHT ROMANTIC FOOTER CARD */}
        <footer className="text-center bg-white/40 border border-gray-200/50 rounded-2xl py-6 px-4 max-w-md mx-auto text-xs text-gray-400 font-mono">
          <p className="flex justify-center gap-1.5 items-center font-bold text-[#1B4D43] mb-1">
            <span>Hecho con amor eterno por tu novio</span>
            <Heart className="w-3.5 h-3.5 fill-teal-400 text-teal-400 animate-pulse shrink-0" />
          </p>
          <p className="px-5">
            Dedicado con orgullo a Flor Lihue en sus 26 años. Sos mi Amorcito, mi Princesa y mi compañera de vida.
          </p>
          <span className="text-[9px] block text-gray-300 mt-2">© 2026 • Todos nuestros recuerdos guardados para siempre</span>
        </footer>

      </div>

      {/* FIXED FOOTER WHISPER TICKER WITH DYNAMIC HOVER GREETINGS (Extremely premium layout touch!) */}
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
