import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Memory } from "../types";

interface TimelineProps {
  memories: Memory[];
  onTriggerFloating: (x: number, y: number, text: string) => void;
  birthdayCakeImg: string;
  loveLetterImg: string;
  polaroidImg: string;
}

export default function Timeline({
  memories,
  onTriggerFloating,
  birthdayCakeImg,
  loveLetterImg,
  polaroidImg,
}: TimelineProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, boolean>>({});
  const [deckIndex, setDeckIndex] = useState(0);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "romance", label: "Romance" },
    { id: "adventure", label: "Aventuras" },
    { id: "daily", label: "Cotidianos" },
    { id: "milestone", label: "Logros" },
  ];

  const filteredMemories =
    selectedCategory === "all"
      ? memories
      : memories.filter((memory) => memory.category === selectedCategory);

  useEffect(() => {
    if (deckIndex <= filteredMemories.length - 1) return;
    setDeckIndex(0);
  }, [deckIndex, filteredMemories.length]);

  const activeMemory = filteredMemories[deckIndex];

  const getMemoryImage = (memory: Memory) => {
    if (memory.imageSrc) return memory.imageSrc;

    const index = memory.imageIndex ?? 2;
    if (index === 0) return birthdayCakeImg;
    if (index === 1) return loveLetterImg;
    return polaroidImg;
  };

  const toggleSecret = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedSecrets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    onTriggerFloating(e.clientX, e.clientY, "Revelaste un susurro de amor");
  };

  const handleNextDeck = (e: React.MouseEvent) => {
    setDeckIndex((prev) => (prev + 1) % filteredMemories.length);
    onTriggerFloating(e.clientX, e.clientY, "Siguiente recuerdo");
  };

  const handlePrevDeck = (e: React.MouseEvent) => {
    setDeckIndex((prev) => (prev - 1 + filteredMemories.length) % filteredMemories.length);
    onTriggerFloating(e.clientX, e.clientY, "Volvamos al recuerdo anterior");
  };

  const getSecretText = (id: string) => {
    if (id === "1") {
      return "Lagunas de Yala. Estaba maravillado de estar con vos ahí y de ver lo bien que nos quedaba empezar algo tan lindo juntos.";
    }
    if (id === "2") {
      return "Esa sorpresa con flores y tu sonrisa me pueden por completo. Verte feliz me llena y me hace querer seguir mimándote siempre.";
    }
    if (id === "3") {
      return "Córdoba. Ese viaje marcó un antes y un después. Mate, ruta, charla y esa alegría de sentir que con vos todo fluye.";
    }
    if (id === "4") {
      return "Verte recibirte me llenó de orgullo. Me encanta admirarte y escucharte hablar con pasión de lo que amás.";
    }
    if (id === "5") {
      return "Nuestra salida al cine fue una de esas citas que parecen simples, pero conmigo se quedan enormes porque estabas preciosa y feliz al lado mío.";
    }
    if (id === "6") {
      return "Ese cumple tan nuestro me encanta recordarlo por todo: tu sonrisa, la torta, el momento compartido y lo hermosa que estabas ese día.";
    }
    return "Esta otra foto tuya me derrite. Me encanta mirarte y volver a sentir lo afortunado que soy de tenerte en mi vida.";
  };

  return (
    <section
      id="memories-section"
      className="relative overflow-hidden rounded-[2.1rem] border border-[#E7ECE8] bg-[linear-gradient(180deg,rgba(251,253,252,0.96),rgba(244,248,246,0.93))] p-5 shadow-[0_22px_52px_rgba(33,77,68,0.07)] backdrop-blur-md md:p-8"
    >
      <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-[#DDEEE8]/70 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#F4E1DA]/45 blur-3xl" />

      <div className="relative mb-6 text-center md:mb-8">
        <span className="rounded-full border border-[#D7E9E3] bg-[#F3FBF8] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#35534C]">
          Nuestros momentos juntos
        </span>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#214D44] md:text-4xl">
          Polaroids de Nuestros Recuerdos
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#64746E]">
          Un pequeño álbum para volver, despacito, a algunos de los momentos más lindos que
          construimos juntos.
        </p>
      </div>

      <div className="relative mb-6 flex flex-wrap justify-center gap-2.5 md:mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setDeckIndex(0);
            }}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
              selectedCategory === category.id
                ? "bg-[#3EA894] text-white shadow-md shadow-[#4DB6A3]/20"
                : "border border-[#E8EEEB] bg-white/88 text-[#687873] hover:bg-[#F5FBF8] hover:text-[#214D44]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filteredMemories.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${activeMemory.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-8"
          >
            <div className="rounded-[1.9rem] border border-[#EFF2EF] bg-white p-4 shadow-[0_18px_34px_rgba(33,77,68,0.06)] md:p-5">
              <div className="relative mx-auto max-w-[320px] rotate-[-1.5deg] rounded-[1.4rem] bg-white p-3 shadow-[0_16px_36px_rgba(33,77,68,0.10)] sm:max-w-[360px] xl:max-w-none">
                <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#F08E92]/70" />
                <div className="overflow-hidden rounded-[1rem] border border-[#EEF1EE] bg-[#F7F7F4]">
                  <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] xl:aspect-[4/5]">
                    <img
                      src={getMemoryImage(activeMemory)}
                      alt={activeMemory.title}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = polaroidImg;
                      }}
                    />
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/35 p-2 text-sm text-white backdrop-blur-sm">
                      {activeMemory.emoji}
                    </div>
                  </div>
                </div>
                <div className="pt-4 text-center">
                  <span className="rounded-full bg-[#F1FBF7] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#35534C]">
                    {activeMemory.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-[#EFF2EF] bg-white/88 p-5 shadow-[0_16px_32px_rgba(33,77,68,0.05)] md:p-6">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#B88357]">
                    Recuerdo {deckIndex + 1} de {filteredMemories.length}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-[#214D44] md:text-[2.3rem]">
                    {activeMemory.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-[#61716B]">
                    {activeMemory.description}
                  </p>

                  <div className="mt-6 rounded-[1.4rem] border border-dashed border-[#D5E6DF] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,252,250,0.84))] p-4">
                    <button
                      onClick={(e) => toggleSecret(activeMemory.id, e)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#EAF9F4] px-3 py-1.5 text-[11px] font-bold text-[#2F8C79] transition-all hover:bg-[#DFF4EC]"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      {revealedSecrets[activeMemory.id] ? "Ocultar secreto" : "Revelar secreto"}
                    </button>

                    <AnimatePresence>
                      {revealedSecrets[activeMemory.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          className="mt-4 rounded-[1.1rem] border border-[#E0F0E9] bg-white/90 p-4 text-left text-sm italic leading-relaxed text-[#35534C]"
                        >
                          "{getSecretText(activeMemory.id)}"
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-1.5">
                    {filteredMemories.map((memory, index) => (
                      <button
                        key={memory.id}
                        type="button"
                        onClick={() => setDeckIndex(index)}
                        aria-label={`Ir al recuerdo ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all ${
                          deckIndex === index ? "w-7 bg-[#214D44]" : "w-2.5 bg-[#CFE3DD]"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <button
                      onClick={handlePrevDeck}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D9E3DF] bg-white px-4 py-2.5 text-sm font-semibold text-[#58706A] transition-all hover:border-[#C8D9D2] hover:text-[#214D44] sm:w-auto"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </button>

                    <button
                      onClick={handleNextDeck}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#214D44] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#183C35] sm:w-auto"
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="py-10 text-center font-mono text-xs text-gray-500">
          No hay recuerdos cargados en esta categoría aún.
        </div>
      )}
    </section>
  );
}
