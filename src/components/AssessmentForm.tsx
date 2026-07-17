import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { Sparkles, Brain, Heart, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
import { StudentProfile } from '../types';

const QUESTIONS = [
  {
    id: 'interests',
    title: 'What do you love doing?',
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    options: [
      'Solving puzzles & math', 'Writing stories or articles', 
      'Building/fixing things', 'Helping other people',
      'Drawing or designing', 'Playing sports',
      'Using computers/coding', 'Debating or public speaking'
    ]
  },
  {
    id: 'strengths',
    title: 'What are you naturally good at?',
    icon: <Brain className="w-6 h-6 text-indigo-500" />,
    options: [
      'Logical thinking', 'Creativity & Arts',
      'Communicating clearly', 'Leading teams',
      'Analyzing data', 'Understanding emotions',
      'Physical coordination', 'Memorizing facts'
    ]
  },
  {
    id: 'subjects',
    title: 'Which subjects do you enjoy most?',
    icon: <GraduationCap className="w-6 h-6 text-emerald-500" />,
    options: [
      'Mathematics', 'English Language', 'Physics', 'Chemistry',
      'Biology', 'Economics', 'Government/History', 'Computer Studies',
      'Fine Arts', 'Literature in English'
    ]
  },
  {
    id: 'personality',
    title: 'How would you describe yourself?',
    icon: <Sparkles className="w-6 h-6 text-amber-500" />,
    options: [
      'Introverted (Quiet/Thoughtful)', 'Extroverted (Outgoing/Social)',
      'Organized & Planner', 'Flexible & Spontaneous',
      'Risk-taker', 'Cautious & Careful',
      'Independent', 'Team Player'
    ]
  }
];

interface AssessmentFormProps {
  onSubmit: (data: StudentProfile) => void;
  isLoading: boolean;
}

export function AssessmentForm({ onSubmit, isLoading }: AssessmentFormProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({
    interests: [],
    strengths: [],
    subjects: [],
    personality: []
  });

  const currentQuestion = QUESTIONS[step];

  const handleToggleOption = (option: string) => {
    setAnswers(prev => {
      const current = prev[currentQuestion.id];
      if (current.includes(option)) {
        return { ...prev, [currentQuestion.id]: current.filter(item => item !== option) };
      }
      if (current.length >= 3) return prev; // Max 3 selections
      return { ...prev, [currentQuestion.id]: [...current, option] };
    });
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1);
    } else {
      onSubmit({
        interests: answers.interests,
        strengths: answers.strengths,
        subjects: answers.subjects,
        personality: answers.personality,
        extra: ''
      });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const isNextDisabled = answers[currentQuestion.id].length === 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] overflow-hidden relative z-10">
      <div className="bg-[#F9F6F1]/50 p-4 sm:p-6 border-b-2 border-[#1A1A1A]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
            Step {step + 1} of {QUESTIONS.length}
          </span>
          <div className="flex gap-1">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${i <= step ? 'w-4 sm:w-8 bg-[#FF5F1F]' : 'w-2 bg-[#1A1A1A]/10'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rounded-xl shrink-0">
            {currentQuestion.icon}
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-[#1A1A1A]">{currentQuestion.title}</h2>
        </div>
        <p className="mt-2 text-[#1A1A1A]/50 ml-12 sm:ml-16 text-sm font-medium">Select up to 3 options.</p>
      </div>

      <div className="p-4 sm:p-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {currentQuestion.options.map(option => {
            const isSelected = answers[currentQuestion.id].includes(option);
            return (
              <button
                key={option}
                onClick={() => handleToggleOption(option)}
                className={`p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-[4px_4px_0px_0px_rgba(255,95,31,1)]'
                    : 'border-[#1A1A1A]/20 hover:border-[#1A1A1A] bg-white/50 text-[#1A1A1A]'
                }`}
              >
                <span className={`font-bold ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  {option}
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected ? 'border-[#FF5F1F] bg-[#FF5F1F]' : 'border-[#1A1A1A]/20'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </motion.div>

        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0 || isLoading}
            className={step === 0 ? 'invisible' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={isNextDisabled || isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing
              </span>
            ) : step === QUESTIONS.length - 1 ? (
              <span className="flex items-center gap-2">
                Discover <Sparkles className="w-4 h-4" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
