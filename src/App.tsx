import { useState } from 'react';
import { AssessmentForm } from './components/AssessmentForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Button } from './components/Button';
import { Compass, Users, ArrowRight } from 'lucide-react';
import { StudentProfile, CareerMatchResult } from './types';

export default function App() {
  const [view, setView] = useState<'landing' | 'assessment' | 'results'>('landing');
  const [userRole, setUserRole] = useState<'student' | 'parent' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CareerMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = (role: 'student' | 'parent') => {
    setUserRole(role);
    setView('assessment');
  };

  const handleAssessmentSubmit = async (profile: StudentProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/match-careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch career matches');
      }

      const data = await response.json();
      setResult(data);
      setView('results');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setView('landing');
    setResult(null);
    setUserRole(null);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F1] text-[#1A1A1A] font-sans selection:bg-[#FF5F1F] selection:text-white flex flex-col border-8 md:border-[16px] border-white box-border">
      <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-[#1A1A1A]/10 sticky top-0 z-10 bg-[#F9F6F1]">
        <div className="max-w-6xl mx-auto flex items-center gap-4 w-full">
          <div className="w-10 h-10 bg-[#FF5F1F] rounded-full flex items-center justify-center text-white font-bold">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase text-[#1A1A1A]">CareerPath AI</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-12 w-full">
        {view === 'landing' && (
          <div className="w-full max-w-5xl mx-auto text-center space-y-8 md:space-y-12 mt-4 md:mt-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5F1F] text-white font-bold text-xs uppercase tracking-widest">
                AI-Powered Career Guidance
              </div>
              <h1 className="text-5xl sm:text-[60px] md:text-[90px] font-black leading-[0.85] tracking-tighter uppercase mb-6">
                Map your <br className="hidden md:block" />
                <span className="text-[#FF5F1F] italic">future.</span>
              </h1>
              <p className="text-xl max-w-md mx-auto font-medium text-[#1A1A1A]/70 leading-snug">
                The AI Career Explorer analyzes your strengths to suggest paths you'll actually love.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-8">
              <button 
                onClick={() => handleStart('student')}
                className="flex flex-col items-center p-8 bg-white border-2 border-[#1A1A1A] rounded-3xl shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] transition-all group"
              >
                <div className="w-16 h-16 bg-[#FF5F1F]/10 rounded-2xl flex items-center justify-center mb-6 text-[#FF5F1F]">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2 text-[#1A1A1A]">I'm a Student</h3>
                <p className="text-[#1A1A1A]/60 font-medium text-sm mb-6">Take the assessment to find your career matches</p>
                <div className="flex items-center text-[#FF5F1F] font-bold uppercase tracking-widest text-xs mt-auto">
                  Get Started <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>

              <button 
                onClick={() => handleStart('parent')}
                className="flex flex-col items-center p-8 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] rounded-3xl shadow-[8px_8px_0px_0px_rgba(255,95,31,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(255,95,31,1)] transition-all group"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">I'm a Parent</h3>
                <p className="text-white/60 font-medium text-sm mb-6">Help your child discover their potential</p>
                <div className="flex items-center text-[#FF5F1F] font-bold uppercase tracking-widest text-xs mt-auto">
                  Start Assessment <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            </div>
          </div>
        )}

        {view === 'assessment' && (
          <div className="w-full">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1A1A1A]">
                {userRole === 'student' ? 'Let\'s get to know you' : 'Tell us about your child'}
              </h1>
              <p className="text-[#1A1A1A]/70 font-medium mt-2">Answer a few quick questions to generate personalized career matches.</p>
            </div>
            {error && (
              <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 text-red-700 rounded-xl border-2 border-[#1A1A1A] text-center font-bold uppercase text-sm tracking-widest shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                {error}
              </div>
            )}
            <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isLoading} />
          </div>
        )}

        {view === 'results' && result && (
          <ResultsDashboard result={result} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
