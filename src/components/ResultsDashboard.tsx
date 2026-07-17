import { motion } from 'motion/react';
import { CareerMatchResult } from '../types';
import { Briefcase, BookOpen, Target, Sparkles, TrendingUp, CheckCircle2, ChevronRight, GraduationCap, Heart } from 'lucide-react';
import { Button } from './Button';
import { useState } from 'react';

interface ResultsDashboardProps {
  result: CareerMatchResult;
  onReset: () => void;
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);

  if (selectedCareer !== null) {
    const career = result.careers[selectedCareer];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto space-y-6"
      >
        <button
          onClick={() => setSelectedCareer(null)}
          className="text-[#FF5F1F] font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-80 transition-opacity mb-4"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Matches
        </button>

        <div className="bg-white rounded-3xl p-8 border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10 pb-8 border-b-2 border-[#1A1A1A]/10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1A1A1A] mb-4">{career.title}</h1>
              <p className="text-xl font-medium text-[#1A1A1A]/70 leading-relaxed max-w-2xl">{career.description}</p>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-[#FF5F1F] flex items-center justify-center shrink-0 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-2 border-[#1A1A1A] rounded-3xl p-6">
                <h3 className="font-black text-xl uppercase mb-4 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#FF5F1F]" />
                  Required Subjects
                </h3>
                <div className="space-y-3">
                  {career.requiredSubjects.map((subject, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-[#1A1A1A]/10 pb-2 last:border-0 last:pb-0">
                      <span className="font-medium text-[#1A1A1A]">{subject}</span>
                      <span className="text-[10px] font-bold uppercase text-[#1A1A1A] bg-[#1A1A1A]/5 px-2 py-1 rounded-full">Mandatory</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-2 border-[#1A1A1A] rounded-3xl p-6">
                <h3 className="font-black text-xl uppercase mb-4 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-[#FF5F1F]" />
                  University Courses
                </h3>
                <div className="space-y-3">
                  {career.universityCourses.map((course, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#1A1A1A] shrink-0" />
                      <span className="font-medium text-[#1A1A1A]">{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#FF5F1F] text-white rounded-3xl p-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                <h3 className="font-black text-xl uppercase mb-6 flex items-center gap-3 opacity-90">
                  <TrendingUp className="w-6 h-6" />
                  Market Insights
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Expected Salary Range</p>
                    <p className="text-3xl font-black">{career.salaryRangeNGN}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Future Demand</p>
                    <p className="text-xl font-bold">{career.futureDemand}</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-[#1A1A1A] rounded-3xl p-6">
                <h3 className="font-black text-xl uppercase mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6 text-[#FF5F1F]" />
                  Key Skills Needed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {career.keySkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#1A1A1A]/5 border-2 border-[#1A1A1A]/10 rounded-xl text-sm font-bold text-[#1A1A1A]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto space-y-12"
    >
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-[#FF5F1F]/10 text-[#FF5F1F] rounded-2xl mb-6">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter leading-[0.85] text-[#1A1A1A] mb-4">Your Career Matches</h2>
        <p className="text-xl text-[#1A1A1A]/70 font-medium">
          Based on your unique profile, here are the top paths where you're most likely to thrive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {result.careers.map((career, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-3xl p-6 relative overflow-hidden flex flex-col group transition-transform hover:-translate-y-1 ${
              index === 0 
                ? 'bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(255,95,31,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,95,31,1)]' 
                : 'bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[12px_12px_0px_0px_rgba(26,26,26,1)]'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                index === 0 ? 'bg-[#FF5F1F] text-white' : 'bg-[#1A1A1A]/10 text-[#1A1A1A]'
              }`}>
                {index === 0 ? 'Top Match' : 'Great Fit'}
              </div>
              <Briefcase className={`w-6 h-6 ${index === 0 ? 'text-[#FF5F1F]' : 'text-[#1A1A1A]'}`} />
            </div>
            <h3 className="text-2xl font-black uppercase leading-tight mb-3">{career.title}</h3>
            <p className={`text-sm mb-6 flex-grow line-clamp-3 font-medium ${index === 0 ? 'opacity-70' : 'text-[#1A1A1A]/70'}`}>
              {career.description}
            </p>
            <Button
              variant={index === 0 ? 'secondary' : 'outline'}
              className="w-full justify-between mt-auto"
              onClick={() => setSelectedCareer(index)}
            >
              Explore Path
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="bg-white border-2 border-[#1A1A1A] rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] mt-12">
        <h3 className="text-2xl font-black uppercase text-[#1A1A1A] mb-8 flex items-center gap-3">
          <Target className="w-8 h-8 text-[#FF5F1F]" />
          Your Action Plan
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Focus Subjects
            </h4>
            <ul className="space-y-3">
              {result.academicGuidance.suggestedSubjects.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[#1A1A1A] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F1F] mt-2 shrink-0" />
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Extracurriculars
            </h4>
            <ul className="space-y-3">
              {result.academicGuidance.extracurriculars.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[#1A1A1A] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F1F] mt-2 shrink-0" />
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Next Steps
            </h4>
            <ul className="space-y-3">
              {result.academicGuidance.nextSteps.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[#1A1A1A] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F1F] mt-2 shrink-0" />
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Button onClick={onReset} variant="ghost" size="lg">
          Start Over
        </Button>
      </div>
    </motion.div>
  );
}
