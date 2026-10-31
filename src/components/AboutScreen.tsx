import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Language, AppStats } from '../types';
import { StatCards } from './StatCards';
import {
  Shield,
  MapPin,
  Users,
  Building,
  CheckCircle,
  HelpCircle,
  Target,
  Sparkles,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Trash2,
  Send,
  Zap
} from 'lucide-react';

interface AboutScreenProps {
  language: Language;
  stats: AppStats;
  onClearData: () => void;
  onGoToRadar: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  language,
  stats,
  onClearData,
  onGoToRadar
}) => {
  const t = TRANSLATIONS[language];
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="space-y-8 sm:space-y-12 max-w-5xl mx-auto">
      {/* Hero Intro */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>About TheWeaveSquad &bull; SkillBridge Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight">
          Engineering Student Team Formation in 60 Seconds
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.pitch}
        </p>
      </div>

      {/* Live Stats Strip */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0D1524] via-slate-900 to-[#0D1524] border border-[#00F0FF]/40 shadow-[0_0_25px_rgba(0,240,255,0.15)]">
        <div className="text-xs font-mono text-[#00F0FF] mb-4 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span>REAL-TIME PLATFORM METRICS (VIZAG HUB)</span>
          </span>
          <span className="text-slate-400">Live Local Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-3xl font-extrabold font-mono text-[#00F0FF] mb-1">
              {stats.matchRequestVolume}
            </div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              {t.statsStripVolume}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Total connection matches requested</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-3xl font-extrabold font-mono text-emerald-400 mb-1">
              {stats.teamCompletionRate}%
            </div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              {t.statsStripCompletion}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Teams delivering final submissions</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-3xl font-extrabold font-mono text-amber-400 mb-1">
              {stats.ghostingDropoutRate}%
            </div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              {t.statsStripGhosting}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Protected by Karma Shield Protocol</p>
          </div>
        </div>
      </div>

      {/* Why It Matters: High Impact Stat Cards */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-[#FFB800]" />
          <h2 className="text-xl font-bold text-white font-mono">
            WHY IT MATTERS: THE FOUNDATIONAL DATA
          </h2>
        </div>
        <StatCards language={language} />
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-rose-950/80 hover:border-rose-900 transition shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-400 flex items-center justify-center font-bold">
            !
          </div>
          <h3 className="text-lg font-bold text-white font-mono">
            The Problem It Solves
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Student hackathon participants and capstone builders in regional college hubs struggle to quickly discover local, verified teammates with complementary skills outside their immediate social circles.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 pt-2 font-mono">
            <li>&bull; Friend groups lack balanced skills (e.g., 3 frontend devs, 0 backend).</li>
            <li>&bull; Inability to verify real coding proficiency before registration.</li>
            <li>&bull; High dropout & ghosting rates on overnight hackathon checkpoints.</li>
          </ul>
        </div>

        {/* Our Solution */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-950/80 hover:border-[#00F0FF]/40 transition shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-[#00F0FF]/50 text-[#00F0FF] flex items-center justify-center font-bold">
            ✓
          </div>
          <h3 className="text-lg font-bold text-white font-mono">
            Our Solution
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            For engineering students in campus hubs who need balanced project teams, SkillBridge is a hyper-local team finder using GitHub profile data and event availability to instantly recommend compatible teammates.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 pt-2 font-mono">
            <li>&bull; 1-click GitHub commit analysis verifies real proof-of-work.</li>
            <li>&bull; Campus proximity radar matches students within 15 km of venue.</li>
            <li>&bull; Karma Shield locks in mutual team accountability.</li>
          </ul>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="p-6 rounded-2xl bg-[#0D1524] border border-[#00F0FF]/30 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 text-[#00F0FF]">
          <Target className="w-5 h-5 text-[#00F0FF]" />
          <h3 className="text-lg font-bold text-white font-mono">
            {t.differenceHeader}
          </h3>
        </div>
        <p className="text-base text-slate-200 font-medium leading-relaxed">
          "{t.differenceBody}"
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Generic discord channels and bulletin boards fail because students cannot verify their teammates' actual coding velocity or attendance integrity. TheWeaveSquad combines verified Git authorship with local campus geography.
        </p>
      </div>

      {/* Target Users & Who Pays Later (B2B SaaS Model) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-white">
            <Users className="w-5 h-5 text-[#00F0FF]" />
            <h3 className="text-base font-bold font-mono">Primary Users</h3>
          </div>
          <p className="text-sm text-slate-300">
            2nd to 4th year B.Tech Computer Science and Information Technology students participating in campus hackathons across Visakhapatnam engineering colleges (VIIT, GVP, ANITS, GITAM, AU College of Engineering, Vignan Institute).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-white">
            <DollarSign className="w-5 h-5 text-[#FFB800]" />
            <h3 className="text-base font-bold font-mono">Who Pays Later (B2B Model)</h3>
          </div>
          <p className="text-sm text-slate-300">
            Hackathon Organizers, College E-Cells, and Student Tech Clubs pay via a B2B Event SaaS / Team-Building Portal Fee per Hackathon at <span className="text-[#FFB800] font-bold">₹3,500 per event listing & team-formation module</span>.
          </p>
        </div>
      </div>

      {/* Team Udbhav & Location */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{t.vizagPlace}</span>
          </div>
          <h4 className="text-lg font-bold text-white font-mono">
            {t.udbhavTeam}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Dedicated to empowering student builders across coastal Andhra tech ecosystems.
          </p>
        </div>

        {/* Clear Data Reset Button */}
        <div>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-950 hover:text-rose-300 border border-slate-700 hover:border-rose-700 text-slate-300 text-xs font-mono transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.clearData}</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Clear Data */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full bg-[#0D1524] border border-rose-900 rounded-2xl p-6 space-y-4 text-white shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-400 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-mono">
              Reset Session Data?
            </h3>
            <p className="text-sm text-slate-300">
              {t.clearDataConfirm}
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearData();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Action Big Button */}
      <div className="pt-4 border-t border-slate-800 text-center">
        <button
          onClick={onGoToRadar}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-[#00F0FF] hover:bg-cyan-300 text-black font-extrabold text-base sm:text-lg transition shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer"
        >
          <Zap className="w-5 h-5 text-black" />
          <span>{t.sendMatchRequest} (Open Match Radar)</span>
        </button>
        <p className="text-xs text-slate-400 font-mono mt-2">
          Lock in a compatible teammate for Hack With Vizag 4.0 or Smart India Hackathon
        </p>
      </div>
    </div>
  );
};
