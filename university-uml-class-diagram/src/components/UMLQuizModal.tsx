import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/umlData';
import { X, CheckCircle2, AlertCircle, RotateCcw, Trophy, Award } from 'lucide-react';

interface UMLQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UMLQuizModal: React.FC<UMLQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const q = QUIZ_QUESTIONS[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: index,
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
    return ansIdx === QUIZ_QUESTIONS[Number(qIdx)].correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-lg">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                UML Mimarisi & İlişki Bilgi Testi
              </h3>
              <p className="text-[11px] text-slate-500">
                Üniversite sınıf diyagramı senaryosu kavrama soruları
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        {!showResults ? (
          <div className="p-6">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
              <span>Soru {currentQuestion + 1} / {totalQuestions}</span>
              <span>{q.ruleNumber ? `Madde ${q.ruleNumber} ile ilgili` : 'Genel UML'}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Title */}
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 leading-snug">
              {q.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {q.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestion] === idx;
                const isCorrect = idx === q.correctIndex;

                let optionStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60';
                if (isAnswered) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                  } else if (isSelected) {
                    optionStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                  } else {
                    optionStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                  >
                    <span className="font-medium">{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {isAnswered && (
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-semibold block mb-0.5 text-blue-600 dark:text-blue-400">
                  Açıklama & Gerekçe:
                </span>
                {q.explanation}
              </div>
            )}

            {/* Next Button */}
            <div className="mt-5 flex justify-end">
              <button
                disabled={!isAnswered}
                onClick={handleNext}
                className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {currentQuestion < totalQuestions - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Test Tamamlandı!
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Üniversite Nesne Yönelimli UML Modelleme Başarınız
            </p>
            <div className="text-3xl font-extrabold text-blue-600 font-mono mb-2">
              {correctCount} / {totalQuestions} Doğru
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mb-6">
              {correctCount === totalQuestions
                ? 'Tebrikler! Üniversite sınıf diyagramındaki bileşim, kümeleme, kalıtım ve kardinalite kurallarını eksiksiz kavradınız.'
                : 'Güzel deneme! İlgili maddelerin mimari gerekçelerini sol panelden inceleyip tekrar deneyebilirsiniz.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tekrar Çöz</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Tamamla
              </button>
            </div>
          </div>
        )}

        {/* Footer Author Stamp */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Soru Seti: Nesne Yönelimli Analiz ve Tasarım</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Hazırlayan: Enes Öztürk</span>
        </div>
      </div>
    </div>
  );
};
