import React, { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, Volume2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Song } from "../types";

interface JukeboxProps {
  songs: Song[];
  onTriggerFloating: (x: number, y: number, text: string) => void;
  birthdayCakeImg: string;
  loveLetterImg: string;
  polaroidImg: string;
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function Jukebox({
  songs,
  onTriggerFloating,
  birthdayCakeImg,
  loveLetterImg,
  polaroidImg,
}: JukeboxProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const currentSong = songs[currentSongIndex];
  const hasMultipleSongs = songs.length > 1;
  const currentSongUrl = new URL(currentSong.audioUrl, window.location.href).href;

  const getCoverImage = (index: number) => {
    if (index === 0) return birthdayCakeImg;
    if (index === 1) return loveLetterImg;
    return polaroidImg;
  };

  useEffect(() => {
    let active = true;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentSongUrl);
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    if (audio.src !== currentSongUrl) {
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => active && audio.pause()).catch(() => active && audio.pause());
      } else {
        audio.pause();
      }

      audio.src = currentSongUrl;
      audio.load();
      setProgress(0);
      setCurrentTime(0);
    }

    const updateProgress = () => {
      if (!active) return;
      setCurrentTime(audio.currentTime || 0);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      if (active) setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromiseRef.current = playPromise;
        playPromise
          .catch((err) => {
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
    } else if (playPromiseRef.current) {
      playPromiseRef.current.then(() => active && audio.pause()).catch(() => active && audio.pause());
    } else {
      audio.pause();
    }

    return () => {
      active = false;
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentSong, currentSongUrl, isPlaying]);

  useEffect(() => {
    return () => {
      if (!audioRef.current) return;
      const audio = audioRef.current;
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => audio.pause()).catch(() => audio.pause());
      } else {
        audio.pause();
      }
      audioRef.current = null;
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    if (isPlaying) {
      setIsPlaying(false);
      onTriggerFloating(e.clientX, e.clientY, "Silencio con amor");
    } else {
      setIsPlaying(true);
      onTriggerFloating(e.clientX, e.clientY, `Sonando: ${currentSong.title}`);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
    onTriggerFloating(e.clientX, e.clientY, "Siguiente rolita");
  };

  const handlePrev = (e: React.MouseEvent) => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
    onTriggerFloating(e.clientX, e.clientY, "Volvamos a la anterior");
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = clickX / rect.width;
    audioRef.current.currentTime = newPercentage * duration;
    setCurrentTime(newPercentage * duration);
    setProgress(newPercentage * 100);
    onTriggerFloating(e.clientX, e.clientY, "Cambiando de compas");
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#4DB6A3]/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.96)_0%,rgba(248,255,253,0.96)_55%,rgba(234,253,249,0.9)_100%)] p-5 shadow-[0_28px_55px_rgba(27,77,67,0.12)] backdrop-blur-md md:p-6">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#EAFDF9] opacity-80 blur-xl" />
      <div className="absolute -bottom-16 left-6 h-36 w-36 rounded-full bg-[#FFF3E8] opacity-70 blur-2xl" />

      <div className="flex flex-col items-center gap-5 sm:flex-row lg:items-center lg:gap-6">
        <button
          type="button"
          className="relative shrink-0 cursor-pointer"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar cancion" : "Reproducir cancion"}
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#4DB6A3] bg-[#333] p-1 shadow-lg sm:h-32 sm:w-32 lg:h-36 lg:w-36"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <img
                src={getCoverImage(currentSong.coverIndex)}
                alt="Album cover"
                className="h-full w-full select-none object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            </div>

            <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border-4 border-gray-800 bg-white sm:h-12 sm:w-12">
              <div className="h-2.5 w-2.5 rounded-full bg-gray-900" />
            </div>
          </motion.div>

          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute -right-1 -top-1 rounded-full bg-[#4DB6A3] p-1.5 text-white shadow-md"
              >
                <Heart className="h-3.5 w-3.5 animate-pulse fill-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="w-full min-w-0 flex-1">
          <div className="mb-3 text-center sm:text-left lg:text-left">
            <span className="rounded-full border border-[#4DB6A3]/20 bg-[#EAFDF9] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1B4D43]">
              Una cancion para este momento
            </span>
            <h3
              className="mt-2 truncate font-sans text-lg font-bold tracking-tight text-gray-800 md:text-xl"
              title={currentSong.title}
            >
              {currentSong.title}
            </h3>
            <p className="truncate font-mono text-xs italic text-gray-500 md:text-sm">
              {currentSong.artist}
            </p>
          </div>

          <div className="mb-4 flex h-5 items-end justify-center gap-[3px] overflow-hidden px-1 sm:justify-start lg:justify-start">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: isPlaying ? [4, Math.random() * 16 + 4, 4] : 4 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5 + Math.random() * 0.7,
                  ease: "easeInOut",
                }}
                className="w-[3px] rounded-t bg-gradient-to-t from-[#4DB6A3] to-[#3AA28F]"
              />
            ))}
          </div>

          <div className="mb-4">
            <div
              onClick={handleProgressBarClick}
              className="relative h-2 cursor-pointer overflow-hidden rounded-full border border-gray-200/50 bg-gray-100"
            >
              <div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#4DB6A3] to-[#3AA28F] transition-all duration-100"
              />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{duration > 0 ? formatTime(duration) : currentSong.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 sm:justify-start lg:justify-start">
            {hasMultipleSongs && (
              <button
                onClick={handlePrev}
                className="cursor-pointer rounded-full border border-gray-200 bg-white p-2 text-[#1B4D43] shadow-sm transition-all hover:bg-[#EAFDF9] active:scale-95"
                title="Anterior"
              >
                {"<<"}
              </button>
            )}

            <button
              onClick={togglePlay}
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#4DB6A3] p-3 text-white shadow-md transition-all hover:bg-[#3AA28F] hover:shadow-lg active:scale-95"
              title={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-white" />
              ) : (
                <Play className="h-5 w-5 translate-x-0.5 fill-white" />
              )}
            </button>

            {hasMultipleSongs && (
              <button
                onClick={handleNext}
                className="cursor-pointer rounded-full border border-gray-200 bg-white p-2 text-[#1B4D43] shadow-sm transition-all hover:bg-[#EAFDF9] active:scale-95"
                title="Siguiente"
              >
                {">>"}
              </button>
            )}

            <div className="ml-2 hidden items-center gap-1.5 font-mono text-[10px] text-gray-400 lg:flex">
              <Volume2 className="h-3.5 w-3.5 text-gray-400" />
              <span>{isPlaying ? "Sonando cerquita tuyo" : "Queda aca, esperandote"}</span>
            </div>
          </div>

          <p className="mt-4 max-w-xl font-serif text-[13px] leading-relaxed text-[#5C6A67]">
            La deje aca para que te abrace bajito mientras vas recorriendo todo esto.
          </p>
        </div>
      </div>
    </div>
  );
}
