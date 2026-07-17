export interface Career {
  title: string;
  description: string;
  requiredSubjects: string[];
  universityCourses: string[];
  salaryRangeNGN: string;
  futureDemand: string;
  keySkills: string[];
}

export interface AcademicGuidance {
  suggestedSubjects: string[];
  extracurriculars: string[];
  nextSteps: string[];
}

export interface CareerMatchResult {
  careers: Career[];
  academicGuidance: AcademicGuidance;
}

export interface StudentProfile {
  interests: string[];
  strengths: string[];
  subjects: string[];
  personality: string[];
  extra: string;
}
