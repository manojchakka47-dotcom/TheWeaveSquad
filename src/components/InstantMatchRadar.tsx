import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Language, StudentBuilder, HackathonEvent } from '../types';
import { EmptyState } from './EmptyState';
import {
  Radio,
  MapPin,
  GitCommit,
  CheckCircle2,
  Send,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Shield,
  ArrowRight
} from 'lucide-react';
import { LOCAL_COLLEGES } from '../data/sampleBuilders';

interface InstantMatchRadarProps {
  language: Language;
  builders: StudentBuilder[];
  selectedEvent: HackathonEvent;
  missingRoles: string[];
  matchedBuilderIds: string[];
  onSendMatchRequest: (builderId: string) => void;
  onGoToLaunchpad: () => void;
  onOpenVerifier: () => void;
}

export const InstantMatchRadar: React.FC<InstantMatchRadarProps> = ({
  language,
  builders,
  selectedEvent,
  missingRoles,
  matchedBuilderIds,
  onSendMatchRequest,
  onGoToLaunchpad,
  onOpenVerifier
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCollege, setSelectedCollege] = useState<string>('All');
  const [minVerifiedScore, setMinVerifiedScore] = useState<number>(70);
  const [expandedBuilderId, setExpandedBuilderId] = useState<string | null>(null);
  const [filterActiveEventOnly, setFilterActiveEventOnly] = useState<boolean>(true);

  // Filter builders based on active event, missing roles, college, and score
  const filteredBuilders = builders.filter((builder) => {
    // Event filter
    if (filterActiveEventOnly && builder.activeEvent !== selectedEvent.name) {
      return false;
    }

    // College filter
    if (selectedCollege !== 'All' && !builder.college.includes(selectedCollege)) {
      return false;
    }

    // Score filter
    if (builder.verifiedScore < minVerifiedScore) {
      return false;
    }

    // Missing role match filter (if specified, match if builder has related skill)
    if (missingRoles.length > 0) {
      const skillsConcat = (builder.primarySkills.join(' ') + ' ' + builder.roleTitle).toLowerCase();
      const hasMatch = missingRoles.some((role) => {
        const r = role.toLowerCase().replace('/ ', '').replace(' dev', '').replace(' design', '');
        return skillsConcat.includes(r);
      });
      if (!hasMatch && missingRoles.length > 2) {
        // loose match if multiple roles
        return true;
      }
    }

    return true;
  });

  // Calculate dynamic compatibility score based on roles, distance, and verified score
  const calculateCompatibility = (builder: StudentBuilder): number => {
    let score = builder.verifiedScore;
    if (builder.distanceKm <= 5) score += 4;
    if (missingRoles.length > 0) score += 3;
    return Math.min(score, 99);
  };

  // Top 3 recommendations prioritized
  const topRecommendations = [...filteredBuilders]
    .sort((a, b) => calculateCompatibility(b) - calculateCompatibility(a))
    .slice(0, 3);

  // Other matching builders
  const otherMatches = [...filteredBuilders]
    .sort((a, b) => calculateCompatibility(b) - calculateCompatibility(a))
    .slice(3);

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* Radar Control Banner */}
      <div className="bg-gradient-to-r from-[#0D1524] via-slate-900 to-[#0D1524] border border-[#00F0FF]/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_25px_rgba(0,240,255,0.15)] relative overflow-hidden">
        {/* Background Radar Grid Sweep */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-cyan-500/10 pointer-events-none hidden md:block">
          <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-10 rounded-full border border-cyan-500/30" />
          <div className="absolute inset-20 rounded-full border border-[#00F0FF]/40" />
          <div className="w-full h-1/2 bg-gradient-to-b from-[#00F0FF]/20 to-transparent origin-bottom animate-radar-sweep" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00F0FF] mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
              <span>RADAR LOCK: {selectedEvent.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
              {t.recommendedBuilders}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {t.radarSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenVerifier}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF] text-xs font-mono transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Verify Any Handle</span>
            </button>
            {matchedBuilderIds.length >= 2 && (
              <button
                onClick={onGoToLaunchpad}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono transition shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-bounce"
              >
                <Shield className="w-4 h-4" />
                <span>Team Ready &bull; Open Launchpad</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 font-mono mb-1">Campus Hub Filter</label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00F0FF] font-mono text-xs"
            >
              <option value="All">All Vizag Campuses</option>
              {LOCAL_COLLEGES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">
              Minimum Verified Proof: <span className="text-[#00F0FF] font-bold">{minVerifiedScore}%</span>
            </label>
            <input
              type="range"
              min="60"
              max="90"
              step="2"
              value={minVerifiedScore}
              onChange={(e) => setMinVerifiedScore(Number(e.target.value))}
              className="w-full accent-[#00F0FF] cursor-pointer mt-1.5"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setFilterActiveEventOnly(!filterActiveEventOnly)}
              className={`w-full py-2 px-3 rounded-lg border text-xs font-mono flex items-center justify-center space-x-2 transition ${
                filterActiveEventOnly
                  ? 'bg-cyan-950/60 text-[#00F0FF] border-[#00F0FF]/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>Event Locked: {selectedEvent.name.split(' ')[0]}</span>
              <span className={`w-2 h-2 rounded-full ${filterActiveEventOnly ? 'bg-[#00F0FF]' : 'bg-slate-600'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Featured Builders Grid (The Core Match Radar) */}
      {topRecommendations.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
              <span>TOP 3 RECOMMENDED BUILDERS</span>
              <span className="text-xs font-normal text-slate-400 font-sans">
                (Matched for {selectedEvent.name})
              </span>
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              Live Campus Distance Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topRecommendations.map((builder, rankIndex) => {
              const isMatched = matchedBuilderIds.includes(builder.id);
              const compatibility = calculateCompatibility(builder);
              const isExpanded = expandedBuilderId === builder.id;

              return (
                <div
                  key={builder.id}
                  className={`relative flex flex-col justify-between rounded-2xl p-5 border transition-all duration-200 shadow-xl ${
                    isMatched
                      ? 'bg-gradient-to-b from-cyan-950/70 to-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'bg-[#0D1524] border-slate-800 hover:border-[#00F0FF]/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                  }`}
                >
                  {/* Card Header & Badges */}
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-950 text-[#00F0FF] border border-[#00F0FF]/40">
                          #{rankIndex + 1} MATCH
                        </span>
                        {builder.isSample && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                            {t.sampleBadge}
                          </span>
                        )}
                      </div>

                      {/* Compatibility % Button-Badge */}
                      <div className="px-2.5 py-1 rounded-full bg-cyan-950 border border-[#00F0FF] text-[#00F0FF] text-xs font-mono font-bold shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                        {compatibility}% Match
                      </div>
                    </div>

                    {/* Builder Profile Row */}
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={builder.avatarUrl}
                        alt={builder.name}
                        className="w-13 h-13 rounded-xl object-cover border border-[#00F0FF]/40 shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-white truncate">
                          {builder.name}
                        </h4>
                        <p className="text-xs text-[#00F0FF] font-mono truncate">
                          @{builder.githubHandle}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {builder.college} &bull; {builder.year}
                        </p>
                      </div>
                    </div>

                    {/* Verified GitHub Confidence Score Meter */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 mb-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">{t.verifiedScoreLabel}</span>
                        <span className="text-[#00F0FF] font-bold text-sm">
                          {builder.verifiedScore}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 via-[#00F0FF] to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${builder.verifiedScore}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                        <span className="flex items-center space-x-1">
                          <GitCommit className="w-3 h-3 text-[#FFB800]" />
                          <span>{builder.verifiedCommits} commits</span>
                        </span>
                        <span className="flex items-center space-x-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-[#00F0FF]" />
                          <span>{builder.distanceKm} km away</span>
                        </span>
                      </div>
                    </div>

                    {/* Primary Role & Skills */}
                    <div className="mb-3">
                      <p className="text-xs font-bold text-white mb-1.5">
                        {builder.roleTitle}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {builder.primarySkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-200 border border-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {builder.matchReason}
                    </p>

                    {/* Expandable proof breakdown */}
                    {builder.verifiedBreakdown && (
                      <div className="mb-3">
                        <button
                          type="button"
                          onClick={() => setExpandedBuilderId(isExpanded ? null : builder.id)}
                          className="text-[11px] font-mono text-[#00F0FF] flex items-center space-x-1 hover:underline"
                        >
                          <span>{isExpanded ? 'Hide audit breakdown' : 'View proof-of-work breakdown'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-2 p-2.5 rounded-lg bg-black/60 border border-slate-800 space-y-1.5 text-[11px]">
                            {builder.verifiedBreakdown.map((item, i) => (
                              <div key={i} className="pb-1 border-b border-slate-900 last:border-none">
                                <div className="flex justify-between font-mono text-slate-300">
                                  <span>{item.skill}</span>
                                  <span className="text-[#00F0FF]">{item.score}%</span>
                                </div>
                                <p className="text-[10px] text-slate-400">{item.detail}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Main Action: One Big Button ("Send Match Request") */}
                  <div className="pt-3 border-t border-slate-800">
                    <button
                      onClick={() => onSendMatchRequest(builder.id)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition shadow-lg ${
                        isMatched
                          ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-[#00F0FF] hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(0,240,255,0.35)] cursor-pointer'
                      }`}
                    >
                      {isMatched ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-black" />
                          <span>{t.matchRequestSent}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black" />
                          <span>{t.sendMatchRequest}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyState
          title={t.emptyTitle}
          description={t.emptyDesc}
          actionLabel="Reset Filters to View All Builders"
          onAction={() => {
            setSelectedCollege('All');
            setMinVerifiedScore(60);
            setFilterActiveEventOnly(false);
          }}
        />
      )}

      {/* Additional Matching Builders if present */}
      {otherMatches.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-base font-bold text-slate-300 font-mono">
            ADDITIONAL COMPATIBLE BUILDERS ({otherMatches.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherMatches.map((builder) => {
              const isMatched = matchedBuilderIds.includes(builder.id);
              return (
                <div
                  key={builder.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={builder.avatarUrl}
                      alt={builder.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <h5 className="text-sm font-bold text-white truncate">{builder.name}</h5>
                      <p className="text-xs text-slate-400 truncate">
                        {builder.college} &bull; {builder.primarySkills.join(', ')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onSendMatchRequest(builder.id)}
                    className={`ml-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition shrink-0 ${
                      isMatched
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                        : 'bg-cyan-950 hover:bg-cyan-900 text-[#00F0FF] border border-[#00F0FF]/40'
                    }`}
                  >
                    {isMatched ? 'Sent ✓' : 'Request'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Sticky CTA if teammates are requested */}
      {matchedBuilderIds.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-[#00F0FF]/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#00F0FF] text-black flex items-center justify-center font-bold">
              {matchedBuilderIds.length}
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {matchedBuilderIds.length} Builder{matchedBuilderIds.length > 1 ? 's' : ''} Locked in Your Match Queue
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Ready to assemble your 3-builder team workspace for {selectedEvent.name}
              </p>
            </div>
          </div>
          <button
            onClick={onGoToLaunchpad}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#00F0FF] text-black font-extrabold text-sm hover:bg-cyan-300 transition shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            <span>Proceed to Team Launchpad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
