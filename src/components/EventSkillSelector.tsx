import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Language, HackathonEvent, StudentBuilder } from '../types';
import { StatCards } from './StatCards';
import { Sparkles, Calendar, MapPin, CheckCircle, Github, Users, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { AVAILABLE_ROLES } from '../data/sampleBuilders';

interface EventSkillSelectorProps {
  language: Language;
  events: HackathonEvent[];
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
  missingRoles: string[];
  setMissingRoles: React.Dispatch<React.SetStateAction<string[]>>;
  connectedUser: {
    handle: string;
    name: string;
    college: string;
    year: string;
    primarySkill: string;
    verifiedScore: number;
    verifiedCommits: number;
  } | null;
  onOpenVerifier: () => void;
  onLaunchRadar: () => void;
  onQuickSignIn: (handle: string) => void;
}

export const EventSkillSelector: React.FC<EventSkillSelectorProps> = ({
  language,
  events,
  selectedEventId,
  setSelectedEventId,
  missingRoles,
  setMissingRoles,
  connectedUser,
  onOpenVerifier,
  onLaunchRadar,
  onQuickSignIn
}) => {
  const t = TRANSLATIONS[language];
  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const toggleRole = (role: string) => {
    setMissingRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Headline & Promise */}
      <div className="relative text-center max-w-4xl mx-auto pt-4 sm:pt-8 px-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <Zap className="w-3.5 h-3.5 text-[#00F0FF] animate-bounce" />
          <span>Visakhapatnam Campus Hub &bull; 60s Verified Formation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none">
          {language === 'en' ? (
            <>
              Assemble verified, hackathon-ready student teams in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-300 to-[#FFB800]">
                60 seconds.
              </span>
            </>
          ) : (
            t.headline
          )}
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.pitch}
        </p>

        {/* Home Stats Fact Cards (3 required cards) */}
        <div className="mt-8 sm:mt-10">
          <StatCards language={language} />
        </div>
      </div>

      {/* Main Configuration Card: Step 1 & Step 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
        {/* Left Column: Active Hackathon Selection (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-xs font-bold">
                01
              </span>
              <h2 className="text-lg font-bold text-white font-mono">
                {t.selectActiveEvent}
              </h2>
            </div>

            <div className="space-y-3">
              {events.map((event) => {
                const isSelected = event.id === selectedEventId;
                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-bold text-white">
                            {event.name}
                          </h3>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {event.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-y-1 items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>{event.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                        <span className="truncate max-w-[150px]">{event.venue}</span>
                      </span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {event.badges.map((b, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-cyan-300 border border-slate-700"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected User or Sign In */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            {connectedUser ? (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                    {connectedUser.verifiedScore}%
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm font-bold text-white font-mono">
                        @{connectedUser.handle}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400">
                      {connectedUser.college} &bull; {connectedUser.year}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenVerifier}
                  className="text-xs text-[#00F0FF] hover:underline font-mono"
                >
                  Re-audit
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => onQuickSignIn('rahul-vizag-dev')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-700 hover:border-[#00F0FF] text-white text-sm font-medium transition shadow-md group"
                >
                  <Github className="w-4 h-4 group-hover:text-[#00F0FF] transition" />
                  <span>{t.signInGithub} (1-Click Connect)</span>
                </button>
                <p className="text-[11px] text-center text-slate-400 font-mono">
                  Simulates OAuth with real Vizag student repositories
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Missing Team Roles & Trigger Radar (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-xs font-bold">
                02
              </span>
              <h2 className="text-lg font-bold text-white font-mono">
                {t.missingRolesTitle}
              </h2>
            </div>

            <p className="text-sm text-slate-300 mb-4">
              SkillBridge automatically balances your 3-builder team by pairing complementary skills (e.g., Backend + Frontend + UI/UX) with near campus proximity.
            </p>

            {/* Role Tags Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
              {AVAILABLE_ROLES.map((role) => {
                const isSelected = missingRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-medium border text-left transition-all duration-150 ${
                      isSelected
                        ? 'bg-cyan-950/80 text-[#00F0FF] border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                        : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="truncate mr-1">{role}</span>
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-[#00F0FF] text-black font-bold' : 'border border-slate-600'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Smart Balancing Notice */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3 mb-6">
              <Sparkles className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-white block mb-0.5">
                  Proof-of-Work Verification Guarantee
                </span>
                <p className="text-slate-400 leading-relaxed">
                  Every candidate on your radar has verified git commit trees, eliminating resume inflation and ensuring 100% hackathon delivery rate.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Button: One Big Button on Every Screen */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              onClick={onLaunchRadar}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl bg-[#00F0FF] hover:bg-cyan-300 text-black font-extrabold text-base sm:text-lg transition shadow-[0_0_25px_rgba(0,240,255,0.4)] group cursor-pointer"
            >
              <Zap className="w-5 h-5 text-black group-hover:scale-110 transition" />
              <span>{t.instantRadarBtn} ({selectedEvent.name})</span>
              <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition" />
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
              <span>Selected roles: {missingRoles.length > 0 ? missingRoles.join(', ') : 'All candidates'}</span>
              <span>Event venue: {selectedEvent.venue.split(',')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
