import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Language, StudentBuilder, HackathonEvent, FormedTeam, TeamTask } from '../types';
import { EmptyState } from './EmptyState';
import {
  Shield,
  ShieldCheck,
  MessageCircle,
  CheckSquare,
  Square,
  Lock,
  Unlock,
  Users,
  Plus,
  GitCommit,
  ExternalLink,
  Sparkles,
  PhoneCall,
  Flame,
  Award
} from 'lucide-react';

interface TeamLaunchpadProps {
  language: Language;
  team: FormedTeam;
  setTeam: React.Dispatch<React.SetStateAction<FormedTeam>>;
  selectedEvent: HackathonEvent;
  onGoToRadar: () => void;
}

export const TeamLaunchpad: React.FC<TeamLaunchpadProps> = ({
  language,
  team,
  setTeam,
  selectedEvent,
  onGoToRadar
}) => {
  const t = TRANSLATIONS[language];
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Toggle task checkbox
  const toggleTask = (taskId: string) => {
    setTeam(prev => ({
      ...prev,
      tasks: prev.tasks.map(t =>
        t.id === taskId ? { ...t, done: !t.done } : t
      )
    }));
  };

  // Add custom task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TeamTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      assignedToName: team.members[team.tasks.length % team.members.length]?.name || 'Team',
      done: false
    };

    setTeam(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
    setNewTaskTitle('');
  };

  // Toggle mutual commitment lock
  const toggleCommitmentLock = () => {
    setTeam(prev => ({
      ...prev,
      isCommitmentLocked: !prev.isCommitmentLocked,
      karmaScore: prev.isCommitmentLocked ? 86 : 98
    }));
  };

  // WhatsApp click-to-chat link generation
  const generateWhatsAppLink = () => {
    const memberNames = team.members.map(m => `${m.name} (${m.roleTitle})`).join(', ');
    const text = encodeURIComponent(
      `🚀 *${team.teamName}* — Hackathon Workspace Ready!\n` +
      `🏆 Event: ${selectedEvent.name}\n` +
      `👥 Formed Team: ${memberNames}\n` +
      `🛡️ Karma Shield: ${team.isCommitmentLocked ? '100% MUTUAL COMMITMENT LOCKED' : 'Pending Lock'}\n` +
      `⚡ Assembled via TheWeaveSquad Vizag Hub in under 60 seconds. Let's build and win!`
    );
    return `https://wa.me/?text=${text}`;
  };

  const completedTasksCount = team.tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedTasksCount / Math.max(team.tasks.length, 1)) * 100);

  if (!team.members || team.members.length === 0) {
    return (
      <EmptyState
        title="No Team Members Formed Yet"
        description="Head over to the Instant Match Radar to pick verified Vizag student builders and form your 3-builder team."
        actionLabel="Go to Match Radar"
        onAction={onGoToRadar}
        icon={Users}
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* Workspace Header & Karma Shield Status */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0D1524] to-slate-900 border border-[#00F0FF]/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_25px_rgba(0,240,255,0.15)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00F0FF] mb-1">
              <Shield className="w-4 h-4 text-[#00F0FF]" />
              <span>3-BUILDER WORKSPACE &bull; {selectedEvent.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-center space-x-3">
              <span>{team.teamName}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-sans font-semibold">
                {team.members.length} / 3 Formed
              </span>
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {t.karmaShieldDesc}
            </p>
          </div>

          {/* Karma Score & Lock Status Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-[#FFB800]/50 flex items-center justify-center text-[#FFB800]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">KARMA SHIELD SCORE</span>
                <span className="text-lg font-mono font-bold text-white">
                  {team.karmaScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </span>
              </div>
            </div>

            <button
              onClick={toggleCommitmentLock}
              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold flex items-center space-x-2 transition shadow-lg ${
                team.isCommitmentLocked
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              }`}
            >
              {team.isCommitmentLocked ? (
                <>
                  <Lock className="w-4 h-4 text-black" />
                  <span>{t.mutualLocked}</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-black" />
                  <span>{t.mutualLockBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3-Person Team Members Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-mono flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#00F0FF]" />
            <span>VERIFIED SQUAD COMPOSITION (3-PERSON POD)</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {team.members.length === 3 ? 'Pod Complete (3/3)' : '1 Role Vacant'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {team.members.map((member, idx) => (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-[#0D1524] border border-cyan-950 hover:border-[#00F0FF]/50 transition-all duration-200 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-[#00F0FF] border border-[#00F0FF]/30">
                  BUILDER #{idx + 1}
                </span>
              </div>

              <div className="flex items-center space-x-3.5 mb-3">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#00F0FF]/50 shadow"
                />
                <div className="min-w-0 pr-8">
                  <h3 className="text-base font-bold text-white truncate">{member.name}</h3>
                  <p className="text-xs text-[#00F0FF] font-mono truncate">@{member.githubHandle}</p>
                  <p className="text-xs text-slate-400 truncate">{member.college}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs mb-3 space-y-1">
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Assigned Role:</span>
                  <span className="text-white font-semibold truncate max-w-[140px]">{member.roleTitle}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Verified Proof:</span>
                  <span className="text-[#00F0FF] font-bold">{member.verifiedScore}% score ({member.verifiedCommits} commits)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-emerald-400 font-mono text-[11px] flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Commitment Locked</span>
                </span>
                <a
                  href={`https://wa.me/?text=Hi%20${encodeURIComponent(member.name)}!%20Connecting%20for%20our%20${encodeURIComponent(selectedEvent.name)}%20team.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#00F0FF] flex items-center space-x-1 font-mono text-[11px]"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}

          {/* Placeholder for remaining spot if less than 3 */}
          {team.members.length < 3 && (
            <div
              onClick={onGoToRadar}
              className="p-5 rounded-2xl bg-slate-900/30 border-2 border-dashed border-slate-800 hover:border-[#00F0FF]/50 flex flex-col items-center justify-center text-center cursor-pointer transition group min-h-[200px]"
            >
              <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-700 group-hover:border-[#00F0FF] flex items-center justify-center text-slate-400 group-hover:text-[#00F0FF] mb-3 transition">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono group-hover:text-[#00F0FF] transition">
                Slot Available: 3rd Teammate
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                Click to open Match Radar and invite a complementary builder
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Team Coordination Center: Direct WhatsApp Launch & Task Checkboxes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Direct WhatsApp Group Launch Link (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-mono">
                  {t.directWhatsapp}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Instant 1-Click Coordination Channel
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Skip back-and-forth email loops. Launch your private WhatsApp group pre-loaded with team members, roles, and repository milestones.
            </p>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono text-slate-300 mb-4">
              <div className="text-[#00F0FF] font-bold">PRE-FILLED WHATSAPP PAYLOAD:</div>
              <p className="text-slate-400 text-[11px] italic">
                "🚀 {team.teamName} — Hackathon Workspace Ready! Event: {selectedEvent.name}. Formed via TheWeaveSquad..."
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm transition shadow-[0_0_20px_rgba(16,185,129,0.35)]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Launch WhatsApp Squad Room</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <p className="text-[11px] text-center text-slate-400 font-mono">
              Works directly on mobile browser & WhatsApp Web
            </p>
          </div>
        </div>

        {/* Task Checkboxes & Milestones (7 cols) */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-[#00F0FF]" />
                <h3 className="text-base font-bold text-white font-mono">
                  HACKATHON SPRINT MILESTONES
                </h3>
              </div>
              <span className="text-xs font-mono text-[#00F0FF] font-bold">
                {progressPercent}% Completed ({completedTasksCount}/{team.tasks.length})
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-[#00F0FF] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Task list */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {team.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs sm:text-sm transition-all duration-150 ${
                    task.done
                      ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                      : 'bg-slate-950 border-slate-700/80 text-white hover:border-[#00F0FF]/40'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {task.done ? (
                      <CheckSquare className="w-4 h-4 text-[#00F0FF] shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className={`truncate ${task.done ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 shrink-0 ml-2">
                    {task.assignedToName}
                  </span>
                </div>
              ))}
            </div>

            {/* Add task form */}
            <form onSubmit={handleAddTask} className="mt-3 flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add team milestone (e.g., Finalize pitch deck)..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-[#00F0FF] border border-[#00F0FF]/40 text-xs font-mono font-bold transition shrink-0"
              >
                + Add
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Commitment lock protects all milestones</span>
            <span className="text-emerald-400">Anti-Ghosting Protocol: ON</span>
          </div>
        </div>
      </div>
    </div>
  );
};
