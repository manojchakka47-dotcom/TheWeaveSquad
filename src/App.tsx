import React, { useState, useEffect } from 'react';
import {
  StudentBuilder,
  HackathonEvent,
  FormedTeam,
  Language,
  Theme,
  VerificationResult,
  AppStats
} from './types';
import {
  INITIAL_HACKATHONS,
  INITIAL_SAMPLE_BUILDERS,
  INITIAL_APP_STATS
} from './data/sampleBuilders';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { EventSkillSelector } from './components/EventSkillSelector';
import { InstantMatchRadar } from './components/InstantMatchRadar';
import { TeamLaunchpad } from './components/TeamLaunchpad';
import { AboutScreen } from './components/AboutScreen';
import { SkillVerificationModal } from './components/SkillVerificationModal';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const STORAGE_KEYS = {
  USER: 'theweavesquad_user',
  EVENT_ID: 'theweavesquad_event_id',
  ROLES: 'theweavesquad_missing_roles',
  MATCHED_IDS: 'theweavesquad_matched_ids',
  TEAM: 'theweavesquad_team',
  STATS: 'theweavesquad_stats',
  LANG: 'theweavesquad_lang',
  BUILDERS: 'theweavesquad_builders',
  THEME: 'theweavesquad_theme'
};

export default function App() {
  // Navigation State: 1 = Event & Skills, 2 = Match Radar, 3 = Team Launchpad, 4 = About
  const [currentScreen, setCurrentScreen] = useState<number>(1);

  // Theme State: 'light' (White Theme) | 'dark' (Command Center) - Default to White Theme!
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  // Language State: 'en' | 'te'
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'te' || saved === 'en') ? saved : 'en';
  });

  // Hackathon Events
  const [events] = useState<HackathonEvent[]>(INITIAL_HACKATHONS);
  const [selectedEventId, setSelectedEventId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.EVENT_ID) || INITIAL_HACKATHONS[0].id;
  });

  // Missing Team Roles
  const [missingRoles, setMissingRoles] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLES);
    return saved ? JSON.parse(saved) : ['React Dev', 'UI/UX Design'];
  });

  // Student Builders list
  const [builders, setBuilders] = useState<StudentBuilder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BUILDERS);
    return saved ? JSON.parse(saved) : INITIAL_SAMPLE_BUILDERS;
  });

  // Matched Teammate IDs
  const [matchedBuilderIds, setMatchedBuilderIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATCHED_IDS);
    return saved ? JSON.parse(saved) : ['builder-1', 'builder-2']; // Pre-populate Rahul & Ananya for an immediate live demo
  });

  // Connected User Profile (Simulated GitHub OAuth / Verified)
  const [connectedUser, setConnectedUser] = useState<{
    handle: string;
    name: string;
    college: string;
    year: string;
    primarySkill: string;
    verifiedScore: number;
    verifiedCommits: number;
  } | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : {
      handle: 'rahul-vizag-dev',
      name: 'Rahul Verma',
      college: 'VIIT Vizag',
      year: '3rd Year',
      primarySkill: 'Python/Flask',
      verifiedScore: 88,
      verifiedCommits: 142
    };
  });

  // Formed 3-person Team Workspace
  const [team, setTeam] = useState<FormedTeam>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
    if (saved) return JSON.parse(saved);

    // Initial 3-person team seeded with sample builders
    const initialMembers = [
      INITIAL_SAMPLE_BUILDERS[0], // Rahul Verma (Backend)
      INITIAL_SAMPLE_BUILDERS[1], // Ananya Sri (Frontend)
      INITIAL_SAMPLE_BUILDERS[2]  // Kiran Kumar (UI/UX)
    ];

    return {
      id: 'team-vizag-alpha',
      teamName: 'Vizag ByteWeavers Pod #1',
      eventName: INITIAL_HACKATHONS[0].name,
      members: initialMembers,
      karmaScore: 98,
      isCommitmentLocked: true,
      tasks: [
        { id: 't1', title: 'Finalize Hack With Vizag Problem Statement & API Specs', assignedToName: 'Rahul Verma', done: true },
        { id: 't2', title: 'Design Figma High-Fidelity Prototype & Pitch Deck', assignedToName: 'Kiran Kumar', done: true },
        { id: 't3', title: 'Scaffold React + Tailwind UI Components & State Handlers', assignedToName: 'Ananya Sri', done: false },
        { id: 't4', title: 'Wire FastAPI backend endpoints & deployment test', assignedToName: 'Rahul Verma', done: false }
      ],
      createdAt: new Date().toISOString()
    };
  });

  // App Stats
  const [stats, setStats] = useState<AppStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : INITIAL_APP_STATS;
  });

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Skill Verification Modal State
  const [isVerifierOpen, setIsVerifierOpen] = useState(false);
  const [verifierInitialHandle, setVerifierInitialHandle] = useState('rahul-vizag-dev');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'light') {
      document.body.classList.add('theme-light');
      document.documentElement.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENT_ID, selectedEventId);
  }, [selectedEventId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(missingRoles));
  }, [missingRoles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUILDERS, JSON.stringify(builders));
  }, [builders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MATCHED_IDS, JSON.stringify(matchedBuilderIds));
  }, [matchedBuilderIds]);

  useEffect(() => {
    if (connectedUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(connectedUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [connectedUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handler: Send Match Request (The core main action across screens)
  const handleSendMatchRequest = (builderId: string) => {
    const targetBuilder = builders.find(b => b.id === builderId);
    if (!targetBuilder) return;

    const alreadyMatched = matchedBuilderIds.includes(builderId);

    if (alreadyMatched) {
      // Toggle off or notice
      showToast(`Match request already active for ${targetBuilder.name}`, 'info');
      return;
    }

    const updatedIds = [...matchedBuilderIds, builderId];
    setMatchedBuilderIds(updatedIds);

    // Update match volume metric
    setStats(prev => ({
      ...prev,
      matchRequestVolume: prev.matchRequestVolume + 1
    }));

    // If team has fewer than 3 members, automatically welcome builder into the workspace
    if (team.members.length < 3 && !team.members.some(m => m.id === builderId)) {
      setTeam(prev => ({
        ...prev,
        members: [...prev.members, targetBuilder],
        tasks: [
          ...prev.tasks,
          {
            id: `task-${Date.now()}`,
            title: `Coordinate ${targetBuilder.roleTitle} deliverable with ${targetBuilder.name}`,
            assignedToName: targetBuilder.name,
            done: false
          }
        ]
      }));
      showToast(`Match Request Locked! ${targetBuilder.name} added to your 3-person squad.`, 'success');
    } else {
      showToast(`Match Request Sent to ${targetBuilder.name} for ${selectedEvent?.name || 'Hackathon'}.`, 'success');
    }
  };

  // 1-Click GitHub Sign In simulation
  const handleQuickSignIn = (handle: string) => {
    const sample = builders.find(b => b.githubHandle === handle) || builders[0];
    setConnectedUser({
      handle: sample.githubHandle,
      name: sample.name,
      college: sample.college,
      year: sample.year,
      primarySkill: sample.primarySkills.join('/'),
      verifiedScore: sample.verifiedScore,
      verifiedCommits: sample.verifiedCommits
    });
    showToast(`Signed in as @${sample.githubHandle} (${sample.college})`, 'success');
  };

  // Apply AI Verification result to user profile & builders pool
  const handleApplyProfile = (handle: string, college: string, result: VerificationResult) => {
    const newProfile = {
      handle: result.handle,
      name: handle.split('-')[0].replace(/^\w/, c => c.toUpperCase()) + ' (You)',
      college,
      year: '3rd Year',
      primarySkill: result.verifiedSkills[0]?.skill || 'Full Stack',
      verifiedScore: result.overallScore,
      verifiedCommits: result.verifiedCommitsCount
    };
    setConnectedUser(newProfile);

    // Also update builder list or user's member slot in team
    setTeam(prev => ({
      ...prev,
      members: prev.members.map((m, idx) =>
        idx === 0
          ? {
              ...m,
              name: newProfile.name,
              college: newProfile.college,
              githubHandle: newProfile.handle,
              verifiedScore: newProfile.verifiedScore,
              verifiedCommits: newProfile.verifiedCommits,
              roleTitle: result.roleRecommendation
            }
          : m
      )
    }));

    showToast(`Gemini AI audit applied: ${result.overallScore}% score & ${result.verifiedCommitsCount} verified commits`, 'success');
  };

  // Reset data to pristine sample state
  const handleClearData = () => {
    localStorage.clear();
    setBuilders(INITIAL_SAMPLE_BUILDERS);
    setMatchedBuilderIds(['builder-1', 'builder-2']);
    setSelectedEventId(INITIAL_HACKATHONS[0].id);
    setMissingRoles(['React Dev', 'UI/UX Design']);
    setStats(INITIAL_APP_STATS);
    setConnectedUser({
      handle: 'rahul-vizag-dev',
      name: 'Rahul Verma',
      college: 'VIIT Vizag',
      year: '3rd Year',
      primarySkill: 'Python/Flask',
      verifiedScore: 88,
      verifiedCommits: 142
    });

    const initialMembers = [
      INITIAL_SAMPLE_BUILDERS[0],
      INITIAL_SAMPLE_BUILDERS[1],
      INITIAL_SAMPLE_BUILDERS[2]
    ];

    setTeam({
      id: 'team-vizag-alpha',
      teamName: 'Vizag ByteWeavers Pod #1',
      eventName: INITIAL_HACKATHONS[0].name,
      members: initialMembers,
      karmaScore: 98,
      isCommitmentLocked: true,
      tasks: [
        { id: 't1', title: 'Finalize Hack With Vizag Problem Statement & API Specs', assignedToName: 'Rahul Verma', done: true },
        { id: 't2', title: 'Design Figma High-Fidelity Prototype & Pitch Deck', assignedToName: 'Kiran Kumar', done: true },
        { id: 't3', title: 'Scaffold React + Tailwind UI Components & State Handlers', assignedToName: 'Ananya Sri', done: false },
        { id: 't4', title: 'Wire FastAPI backend endpoints & deployment test', assignedToName: 'Rahul Verma', done: false }
      ],
      createdAt: new Date().toISOString()
    });

    showToast('Data reset to sample records successfully', 'info');
  };

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 flex flex-col selection:bg-[#00F0FF] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        matchedCount={matchedBuilderIds.length}
        userHandle={connectedUser?.handle}
        onOpenVerifier={() => {
          setVerifierInitialHandle(connectedUser?.handle || 'rahul-vizag-dev');
          setIsVerifierOpen(true);
        }}
        onClearData={handleClearData}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-fade-in">
          <div className="p-4 rounded-xl bg-slate-900 border border-[#00F0FF]/50 shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-between space-x-3 text-sm">
            <div className="flex items-center space-x-2.5">
              {toastMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-[#FFB800] shrink-0" />
              )}
              <span className="text-white font-medium">{toastMessage.text}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Screen Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {currentScreen === 1 && (
          <EventSkillSelector
            language={language}
            events={events}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
            missingRoles={missingRoles}
            setMissingRoles={setMissingRoles}
            connectedUser={connectedUser}
            onOpenVerifier={() => {
              setVerifierInitialHandle(connectedUser?.handle || 'rahul-vizag-dev');
              setIsVerifierOpen(true);
            }}
            onLaunchRadar={() => setCurrentScreen(2)}
            onQuickSignIn={handleQuickSignIn}
          />
        )}

        {currentScreen === 2 && (
          <InstantMatchRadar
            language={language}
            builders={builders}
            selectedEvent={selectedEvent}
            missingRoles={missingRoles}
            matchedBuilderIds={matchedBuilderIds}
            onSendMatchRequest={handleSendMatchRequest}
            onGoToLaunchpad={() => setCurrentScreen(3)}
            onOpenVerifier={() => {
              setVerifierInitialHandle(connectedUser?.handle || 'ananya-ui-builder');
              setIsVerifierOpen(true);
            }}
          />
        )}

        {currentScreen === 3 && (
          <TeamLaunchpad
            language={language}
            team={team}
            setTeam={setTeam}
            selectedEvent={selectedEvent}
            onGoToRadar={() => setCurrentScreen(2)}
          />
        )}

        {currentScreen === 4 && (
          <AboutScreen
            language={language}
            stats={stats}
            onClearData={handleClearData}
            onGoToRadar={() => setCurrentScreen(2)}
          />
        )}
      </main>

      {/* Skill Verification Modal (Gemini AI Feature) */}
      <SkillVerificationModal
        isOpen={isVerifierOpen}
        onClose={() => setIsVerifierOpen(false)}
        language={language}
        onApplyProfile={handleApplyProfile}
        initialHandle={verifierInitialHandle}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-[#070A11] py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#00F0FF] font-bold">TheWeaveSquad</span>
            <span>&bull;</span>
            <span>SkillBridge Campus Match Engine</span>
            <span>&bull;</span>
            <span>Visakhapatnam, AP, India</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Team Udbhav</span>
            <span>&bull;</span>
            <span className="text-slate-400">₹3,500 / B2B Hackathon Module</span>
            <span>&bull;</span>
            <button
              onClick={handleClearData}
              className="text-slate-400 hover:text-rose-400 underline"
            >
              Reset Data
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
