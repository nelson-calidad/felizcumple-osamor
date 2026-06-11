import React, { useState } from "react";
import { Award, CheckCircle2, XCircle, RefreshCw, HelpCircle, Star } from "lucide-react";
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
      question: "Cual es nuestra comida infalible cuando salimos en una cita linda o nos quedamos charlando hasta tarde?",
      options: [
        "Ensalada gourmet y sushi",
        "Hamburguesas riquisimas o lomitos espectaculares",
        "Empanadas de verdura tibias",
        "Un asado gigante de tres horas",
      ],
      answerIndex: 1,
      funFact: "Amamos comer hamburguesas o lomitos, reirnos de tonterias y charlar sin darnos cuenta de la hora.",
    },
    {
      id: 2,
      question: "Que pasa inevitablemente cuando intentamos ver una serie coreana o un kdrama juntos en el sillon?",
      options: [
        "La terminamos completa en silencio y sin interrupcion",
        "Vos te dormis en los primeros cinco minutos",
        "Terminamos charlando de la vida por horas y emocionandonos juntos",
        "Peleamos por quien tiene el control remoto",
      ],
      answerIndex: 2,
      funFact: "Aunque queremos verla entera, lo tierno es que charlamos mil horas y amo verte emocionada.",
    },
    {
      id: 3,
      question: "Que profesion hermosa y admirable ejerces con tanta vocacion y de la que amo escucharte hablar?",
      options: [
        "Inmunologa espacial",
        "Tecnica en Hemoterapia",
        "Catadora oficial de chocolates",
        "Entrenadora de cachorritos",
      ],
      answerIndex: 1,
      funFact: "Me fascina cuando me explicas sobre hemoterapia con tanto conocimiento y tanta pasion.",
    },
    {
      id: 4,
      question: "Quien es nuestro pilar perruno y la que siempre nos acompana con alegria?",
      options: [
        "El perrito de la fiambreria",
        "La Duque",
        "Un gato invisible del techo",
        "El duque de Inglaterra",
      ],
      answerIndex: 1,
      funFact: "La Duque siempre termina siendo parte de nuestras tardes y de nuestros planes mas simples.",
    },
    {
      id: 5,
      question: "Cual es el companero fiel que aparece en charlas, desvelos y jornadas de estudio?",
      options: [
        "Te de tilo frio",
        "Gaseosa de pomelo",
        "Un mate calentito tras otro",
        "Cafe negro doble instantaneo",
      ],
      answerIndex: 2,
      funFact: "Compartir un mate con vos se siente como estar en casa, aunque sea en medio de cualquier caos.",
    },
  ];

  const handleOptionSelect = (optIdx: number, e: React.MouseEvent) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);

    const isCorrect = optIdx === questions[currentQuestionIdx].answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      onTriggerFloating(e.clientX, e.clientY, "Correcto, mi amor");
    } else {
      onTriggerFloating(e.clientX, e.clientY, "Casi, pero igual te adoro");
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
    <div id="trivia-section" className="relative overflow-hidden rounded-3xl border border-[#4DB6A3]/25 bg-white/60 p-6 shadow-xl shadow-glow backdrop-blur-md md:p-8">
      <div className="absolute right-0 top-0 p-4 text-teal-800 opacity-5">
        <HelpCircle className="h-24 w-24" />
      </div>

      <div className="mb-6">
        <span className="rounded-full border border-[#4DB6A3]/20 bg-[#EAFDF9] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1B4D43]">
          Un jueguito nuestro
        </span>
        <h2 className="mt-2 flex items-center gap-2 font-sans text-2xl font-extrabold tracking-tight text-gray-800">
          Cuanto nos conocemos, amorcito
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Una excusa tierna para volver a esas cositas nuestras que me encantan.
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
            <div className="flex items-center justify-between font-mono text-xs text-gray-400">
              <span>Recuerdo {currentQuestionIdx + 1} de {questions.length}</span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                      idx < currentQuestionIdx
                        ? "bg-[#4DB6A3]"
                        : idx === currentQuestionIdx
                          ? "w-8 animate-pulse bg-[#4DB6A3]/80"
                          : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-teal-100 bg-[linear-gradient(180deg,rgba(234,253,249,0.65),rgba(255,255,255,0.95))] p-5 text-left shadow-sm">
              <h3 className="text-base font-bold leading-tight text-gray-800 md:text-lg">
                {questions[currentQuestionIdx].question}
              </h3>
            </div>

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
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-xs font-medium transition-all md:text-sm ${
                      !isAnswered ? "cursor-pointer hover:border-[#4DB6A3]/50 active:scale-[0.99]" : ""
                    } ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrectAns && (
                      <CheckCircle2 className="ml-2 h-5 w-5 shrink-0 text-emerald-500" />
                    )}
                    {isAnswered && isSelected && !isCorrectAns && (
                      <XCircle className="ml-2 h-5 w-5 shrink-0 text-rose-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="relative rounded-[1.6rem] border border-teal-100 bg-[#F9FFFD] p-4 text-left text-xs leading-relaxed text-[#1B4D43] md:text-sm"
                >
                  <p className="flex items-center gap-1 font-bold">
                    <Star className="h-4 w-4 animate-pulse fill-teal-400 text-teal-600" />
                    Lo que me encanta de esto:
                  </p>
                  <p className="mt-1 font-serif italic text-gray-600">
                    "{questions[currentQuestionIdx].funFact}"
                  </p>

                  <button
                    onClick={handleNext}
                    className="float-right mt-4 rounded-xl bg-[#4DB6A3] px-5 py-2 text-xs font-bold text-white transition-all hover:bg-[#3AA28F] active:scale-95"
                  >
                    {currentQuestionIdx === questions.length - 1 ? "Seguir" : "La siguiente"}
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
            className="space-y-4 py-6 text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAFDF9] text-[#4DB6A3] shadow-md">
              <Award className="h-10 w-10 animate-bounce" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-gray-800 md:text-2xl">
                Te salio hermosa
              </h3>
              <p className="mt-1 px-4 text-xs text-gray-500 md:text-sm">
                Te llevaste <span className="font-bold text-[#1B4D43]">{score} de {questions.length}</span> y a mi me seguis gustando igual de mucho.
              </p>
            </div>

            <div className="mx-auto max-w-sm rounded-2xl border border-[#4DB6A3]/20 bg-[#EAFDF9] p-4 font-serif text-xs italic leading-relaxed text-[#1B4D43]">
              {score === questions.length ? (
                <span>"Sos perfecta. Conoces nuestra historia de una manera que me derrite por completo."</span>
              ) : score >= 3 ? (
                <span>"Compartimos tanto que nuestras costumbres ya tienen algo muy nuestro, y eso me encanta."</span>
              ) : (
                <span>"No importa el puntaje. Lo importante es que cada mate, cada hamburguesa y cada charla con vos valen oro."</span>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#4DB6A3] px-6 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:bg-[#3AA28F] active:scale-95"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Jugar otra vez</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
