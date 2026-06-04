import React, { useState } from "react";
import { Award, CheckCircle2, XCircle, RefreshCw, HelpCircle, Heart, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TriviaProps {
  onTriggerFloating: (x: number, y: number, text: string) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  funFact: string;
}

export default function Trivia({ onTriggerFloating }: TriviaProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "¿Cuál es nuestra comida infalible cuando salimos en una de nuestras citas perfectas o nos quedamos charlando hasta tarde?",
      options: [
        "Ensalada gourmet y sushi",
        "Hamburguesas riquísimas o lomitos espectaculares 🍔🍟",
        "Empanadas de verdura tibias",
        "Un asado gigante de tres horas"
      ],
      answerIndex: 1,
      funFact: "¡Sii! Amamos comer hamburguesas o lomitos, reírnos de tonterías y charlar sin darnos cuenta de la hora."
    },
    {
      id: 2,
      question: "¿Qué pasa inevitablemente cuando intentamos ver una serie coreana o un Kdrama juntos en el sillón?",
      options: [
        "La terminamos completa en silencio y sin interrupción",
        "Vos te dormís en los primeros cinco minutos",
        "Terminamos charlando de la vida por horas, emocionándonos con las series coreanas o Kdramas 🍿📺",
        "Peleamos por quién tiene el control remoto"
      ],
      answerIndex: 2,
      funFact: "¡Tal cual! Aunque queremos verla entera, lo tierno es que charlamos mil horas y amo verte emocionada."
    },
    {
      id: 3,
      question: "¿Qué hermosa e admirable profesión ejercés con tanta vocación, y de la cual tu novio ama quedarse escuchándote hablar?",
      options: [
        "Inmunóloga espacial",
        "Técnica en Hemoterapia 💉🩸",
        "Catadora oficial de chocolates",
        "Entrenadora de cachorritos"
      ],
      answerIndex: 1,
      funFact: "¡Sii! Me fascina y derrito de amor cuando me explicás sobre hemoterapia con tanto conocimiento y pasión."
    },
    {
      id: 4,
      question: "¿Quién es nuestro indiscutible pilar perruno, la perrita del hermano del novio que siempre nos acompaña y llena de alegría?",
      options: [
        "El perrito de la fiambrería",
        "La Duque 🐾🐕",
        "Un gato invisible del techo",
        "El duque de Inglaterra"
      ],
      answerIndex: 1,
      funFact: "¡Exacto! La Duque, la hermosa perrita de mi hermano, siempre nos acompaña y alegra nuestras tardes de mates con sus ocurrencias."
    },
    {
      id: 5,
      question: "¿Cuál es el fiel compañero caliente que tomamos todo el tiempo en cada charla, desvelo y jornada de estudio?",
      options: [
        "Teg de tilo frío",
        "Mucha gaseosa de pomelo",
        "Un mate calentito tras otro todo el tiempo 🧉",
        "Café negro doble instantáneo"
      ],
      answerIndex: 2,
      funFact: "¡Sí! Compartir un mate con vos es literalmente mi paz y nuestro refugio diario. Sos la cebadora perfecta."
    }
  ];

  const handleOptionSelect = (optIdx: number, e: React.MouseEvent) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);

    const isCorrect = optIdx === questions[currentQuestionIdx].answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      onTriggerFloating(e.clientX, e.clientY, "¡Correcto mi reina! 💚✨");
    } else {
      onTriggerFloating(e.clientX, e.clientY, "¡Casi, casi! Te amo igual 💕");
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div id="trivia-section" className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-[#4DB6A3]/25 relative overflow-hidden shadow-glow">
      <div className="absolute top-0 right-0 p-4 opacity-5 text-teal-800">
        <HelpCircle className="w-24 h-24" />
      </div>

      <div className="mb-6">
        <span className="text-xs font-semibold bg-[#EAFDF9] text-[#1B4D43] px-3 py-1 rounded-full uppercase tracking-wider font-mono border border-[#4DB6A3]/20">
          Trivia de Amor 🧠💚
        </span>
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mt-2 font-sans flex items-center gap-2">
          ¿Cuánto nos conocemos, Amorcito?
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Un juego divertido para repasar algunas de las cosas que hacen que nuestra rutina juntos sea tan hermosa.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentQuestionIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Progress indicator */}
            <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
              <span>Pregunta {currentQuestionIdx + 1} de {questions.length}</span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                      idx < currentQuestionIdx
                        ? "bg-[#4DB6A3]"
                        : idx === currentQuestionIdx
                        ? "bg-[#4DB6A3]/80 animate-pulse w-8"
                        : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question card */}
            <div className="bg-teal-50/50 p-5 rounded-2xl border border-teal-100 text-left">
              <h3 className="text-base md:text-lg font-bold text-gray-800 leading-tight">
                {questions[currentQuestionIdx].question}
              </h3>
            </div>

            {/* Options list */}
            <div className="space-y-2.5 text-left">
              {questions[currentQuestionIdx].options.map((opt, oIdx) => {
                const isSelected = selectedOpt === oIdx;
                const isCorrectAns = oIdx === questions[currentQuestionIdx].answerIndex;
                
                let btnStyle = "bg-white border-gray-100 text-gray-700 hover:bg-gray-50/50";
                if (isAnswered) {
                  if (isCorrectAns) {
                    btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-100";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 border-rose-300 text-rose-800 ring-2 ring-rose-100";
                  } else {
                    btnStyle = "bg-white border-gray-100 text-gray-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isAnswered}
                    onClick={(e) => handleOptionSelect(oIdx, e)}
                    className={`w-full p-4 rounded-xl text-xs md:text-sm border font-medium text-left transition-all ${
                      !isAnswered ? "active:scale-[0.99] cursor-pointer hover:border-[#4DB6A3]/50" : ""
                    } ${btnStyle} flex justify-between items-center`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrectAns && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />
                    )}
                    {isAnswered && isSelected && !isCorrectAns && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & fun fact */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="bg-teal-50/80 rounded-2xl p-4 border border-teal-100 text-left text-xs md:text-sm text-[#1B4D43] leading-relaxed relative"
                >
                  <p className="font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-teal-400 text-teal-600 animate-pulse" />
                    Dato curioso de nosotros:
                  </p>
                  <p className="mt-1 font-serif italic text-gray-600">
                    "{questions[currentQuestionIdx].funFact}"
                  </p>
                  
                  <button
                    onClick={handleNext}
                    className="mt-4 px-5 py-2 bg-[#4DB6A3] text-white text-xs font-bold rounded-xl hover:bg-[#3AA28F] active:scale-95 transition-all float-right cursor-pointer"
                  >
                    {currentQuestionIdx === questions.length - 1 ? "Ver resultados ✨" : "Siguiente pregunta ➔"}
                  </button>
                  <div className="clear-both" />
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 text-center space-y-4"
          >
            <div className="w-20 h-20 bg-[#EAFDF9] text-[#4DB6A3] rounded-full flex items-center justify-center mx-auto shadow-md">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-800">
                ¡Trivia completada, mi reina! 💕
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1 px-4">
                Puntuación final: <span className="font-bold text-[#1B4D43]">{score} de {questions.length} perfectos</span>.
              </p>
            </div>

            <div className="bg-[#EAFDF9] mx-auto max-w-sm rounded-2xl p-4 border border-[#4DB6A3]/20 font-serif italic text-xs leading-relaxed text-[#1B4D43]">
              {score === questions.length ? (
                <span>"¡Sos perfecta, mi amor! Conocés cada milímetro de nuestra hermosa historia cotidiana. Me enamora enormemente saber que estamos tan conectados. Sos de otra galaxia. 💚🌌"</span>
              ) : score >= 3 ? (
                <span>"¡Excelente! Compartimos tanto que nuestras rutinas y gustos están sellados el uno con el otro. ¡Te amo con locura absoluta! 🧉🍔"</span>
              ) : (
                <span>"¡Hermosa! No importa el puntaje, lo que importa es que cada mate, hamburguesa y Kdrama/serie coreana lo disfrutamos de la mano. ¡Te adoro mi vida! 💕🍿"</span>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="px-6 py-2.5 bg-[#4DB6A3] hover:bg-[#3AA28F] text-white text-xs font-extrabold rounded-full shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Volver a jugar</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
