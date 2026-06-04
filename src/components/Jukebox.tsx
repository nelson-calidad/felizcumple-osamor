import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Song } from "../types";

interface JukeboxProps {
  songs: Song[];
  onTriggerFloating: (x: number, y: number, text: string) => void;
  birthdayCakeImg: string;
  loveLetterImg: string;
  polaroidImg: string;
}

export default function Jukebox({ songs, onTriggerFloating, birthdayCakeImg, loveLetterImg, polaroidImg }: JukeboxProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs[currentSongIndex];

  // Map image index to the beautiful generated images
  const getCoverImage = (index: number) => {
    if (index === 0) return birthdayCakeImg;
    if (index === 1) return loveLetterImg;
    return polaroidImg;
  };

  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    let active = true;

    // Lazy initialize standard audio
    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong.audioUrl);
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    // Check if song index has changed / audio src differs
    if (audio.src !== currentSong.audioUrl) {
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            if (active) audio.pause();
          })
          .catch(() => {
            if (active) audio.pause();
          });
      } else {
        audio.pause();
      }
      audio.src = currentSong.audioUrl;
      audio.load();
      setProgress(0);
    }

    const updateProgress = () => {
      if (active && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      if (active) {
        setDuration(audio.duration || 0);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromiseRef.current = playPromise;
        playPromise
          .catch(err => {
            console.log("Audio interplay blocked by browser auto-play policy until click, or play interrupted.", err);
            if (active && err.name === "NotAllowedError") {
              setIsPlaying(false);
            }
          })
          .finally(() => {
            if (playPromiseRef.current === playPromise) {
              playPromiseRef.current = null;
            }
          });
      }
    } else {
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            if (active) audio.pause();
          })
          .catch(() => {
            if (active) audio.pause();
          });
      } else {
        audio.pause();
      }
    }

    return () => {
      active = false;
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentSongIndex, isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    if (isPlaying) {
      setIsPlaying(false);
      onTriggerFloating(e.clientX, e.clientY, "¡Silencio con amor! 🌸");
    } else {
      setIsPlaying(true);
      onTriggerFloating(e.clientX, e.clientY, `Reproduciendo: ${currentSong.title} 🎵`);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
    onTriggerFloating(e.clientX, e.clientY, "¡Siguiente rolita! 🥰");
  };

  const handlePrev = (e: React.MouseEvent) => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
    onTriggerFloating(e.clientX, e.clientY, "¡La de antes! ✨");
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercentage = clickX / width;
    const newTime = newPercentage * duration;
    
    audioRef.current.currentTime = newTime;
    setProgress(newPercentage * 100);
    onTriggerFloating(e.clientX, e.clientY, "Cambiando de compás 🎶");
  };

  // Safe release of Audio resource on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        if (playPromiseRef.current) {
          playPromiseRef.current
            .then(() => audio.pause())
            .catch(() => audio.pause());
        } else {
          audio.pause();
        }
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div id="jukebox-section" className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#4DB6A3]/25 relative overflow-hidden shadow-glow">
      {/* Decorative background circle */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#EAFDF9] rounded-full filter blur-xl opacity-80" />
      
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6 items-center">
        {/* Cassette Tape / Spinning Vinyl Representation */}
        <div className="relative group cursor-pointer shrink-0" onClick={togglePlay}>
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#333] border-4 border-[#4DB6A3] flex items-center justify-center shadow-lg relative p-1"
          >
            {/* Center Cover */}
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img 
                src={getCoverImage(currentSong.coverIndex)} 
                alt="Album Cover" 
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            </div>

            {/* Inner vinyl center label */}
            <div className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />
            </div>
          </motion.div>

          <AnimatePresence>
            {isPlaying && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute -top-1 -right-1 bg-[#4DB6A3] text-white p-1.5 rounded-full shadow-md"
              >
                <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Music details and control interface */}
        <div className="flex-1 w-full min-w-0">
          <div className="mb-3 text-center sm:text-left md:text-center lg:text-left">
            <span className="text-xs font-semibold bg-[#EAFDF9] text-[#1B4D43] px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-[#4DB6A3]/20">
              Canciones de Nuestra Historia 🎂
            </span>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight font-sans mt-2 truncate" title={currentSong.title}>{currentSong.title}</h3>
            <p className="text-xs md:text-sm text-gray-500 font-mono italic truncate">{currentSong.artist}</p>
          </div>

          {/* Simulated Music Bars Visualizer */}
          <div className="h-5 flex items-end justify-center sm:justify-start md:justify-center lg:justify-start gap-[3px] mb-4 overflow-hidden px-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: isPlaying ? [4, Math.random() * 16 + 4, 4] : 4
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.5 + Math.random() * 0.7,
                  ease: "easeInOut"
                }}
                className="w-[3px] bg-gradient-to-t from-[#4DB6A3] to-[#3AA28F] rounded-t"
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div 
              onClick={handleProgressBarClick}
              className="h-2 bg-gray-100 rounded-full overflow-hidden cursor-pointer relative border border-gray-200/50"
            >
              <div 
                style={{ width: `${progress}%` }} 
                className="h-full bg-gradient-to-r from-[#4DB6A3] to-[#3AA28F] rounded-full transition-all duration-100"
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
              <span>{isPlaying ? `Playing` : `Paused`}</span>
              <span>{currentSong.duration}</span>
            </div>
          </div>

          {/* Buttons Controls */}
          <div className="flex items-center justify-center sm:justify-start md:justify-center lg:justify-start gap-4">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-white text-[#1B4D43] hover:bg-[#EAFDF9] border border-gray-200 shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Anterior"
            >
              <SkipBack className="w-4 h-4 fill-[#1B4D43]" />
            </button>

            <button 
              onClick={togglePlay}
              className="p-3 rounded-full bg-[#4DB6A3] text-white hover:bg-[#3AA28F] shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              title={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white translate-x-0.5" />
              )}
            </button>

            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-white text-[#1B4D43] hover:bg-[#EAFDF9] border border-gray-200 shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Siguiente"
            >
              <SkipForward className="w-4 h-4 fill-[#1B4D43]" />
            </button>

            <div className="hidden lg:flex items-center gap-1.5 text-gray-400 ml-2 font-mono text-[10px]">
              <Volume2 className="w-3.5 h-3.5 text-gray-400" />
              <span>Amor 100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
