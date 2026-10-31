export type Language = 'en' | 'te';
export type Theme = 'light' | 'dark';

export interface VerifiedSkillItem {
  skill: string;
  score: number;
  level: string;
  detail: string;
}

export interface StudentBuilder {
  id: string;
  name: string;
  college: string;
  year: string; // '2nd Year' | '3rd Year' | '4th Year'
  branch: string;
  primarySkills: string[];
  verifiedScore: number;
  verifiedCommits: number;
  isSample: boolean;
  status: 'Available' | 'Matched' | 'Locked';
  activeEvent: string;
  distanceKm: number;
  matchReason: string;
  githubHandle: string;
  phoneWhatsapp: string;
  avatarUrl: string;
  verifiedBreakdown?: VerifiedSkillItem[];
  roleTitle: string;
}

export interface HackathonEvent {
  id: string;
  name: string;
  tagline: string;
  date: string;
  venue: string;
  hub: string;
  maxTeamSize: number;
  minCommitScore: number;
  registeredBuildersCount: number;
  badges: string[];
}

export interface VerificationResult {
  handle: string;
  overallScore: number;
  verifiedCommitsCount: number;
  verifiedSkills: VerifiedSkillItem[];
  roleRecommendation: string;
  authenticityVerdict: string;
  proofBadge: string;
  engine?: string;
  notice?: string;
}

export interface TeamTask {
  id: string;
  title: string;
  assignedToName: string;
  done: boolean;
}

export interface FormedTeam {
  id: string;
  teamName: string;
  eventName: string;
  members: StudentBuilder[];
  karmaScore: number;
  isCommitmentLocked: boolean;
  tasks: TeamTask[];
  createdAt: string;
}

export interface AppStats {
  matchRequestVolume: number;
  teamCompletionRate: number;
  ghostingDropoutRate: number;
}
