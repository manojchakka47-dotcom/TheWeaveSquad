import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Language, VerificationResult } from '../types';
import { Sparkles, X, CheckCircle2, AlertOctagon, Terminal, GitCommit, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { LOCAL_COLLEGES } from '../data/sampleBuilders';

interface SkillVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onApplyProfile: (handle: string, college: string, result: VerificationResult) => void;
  initialHandle?: string;
}

export const SkillVerificationModal: React.FC<SkillVerificationModalProps> = ({
  isOpen,
  onClose,
  language,
  onApplyProfile,
  initialHandle = 'rahul-vizag-dev'
}) => {
  const t = TRANSLATIONS[language];
  const [handle, setHandle] = useState(initialHandle);
  const [college, setCollege] = useState(LOCAL_COLLEGES[0]);
  const [reposCount, setReposCount] = useState(4);
  const [sampleDetails, setSampleDetails] = useState('4 public repos with Python scripts, Flask backend, and React UI commits');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);

  if (!isOpen) return null;

  const handleVerify = async () => {
    if (!handle.trim()) {
      setError('Please provide a valid GitHub handle');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/verify-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: handle.trim(),
          reposCount,
          sampleCodeOrRepos: sampleDetails,
          college
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: VerificationResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Skill verification error:', err);
      setError('Skill audit service was unable to reach Gemini API. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectPreset = (presetHandle: string, presetCollege: string, presetRepos: number, presetNotes: string) => {
    setHandle(presetHandle);
    setCollege(presetCollege);
    setReposCount(presetRepos);
    setSampleDetails(presetNotes);
    setResult(null);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D1524] border border-[#00F0FF]/40 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.2)] text-white overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-cyan-950">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-cyan-950 border border-[#00F0FF]/40 text-[#00F0FF]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-mono tracking-tight text-white">
                Gemini Repo-to-Skill Verifier
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Model: gemini-3.8-flash &bull; Structured Code Proof Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-mono text-[#00F0FF] mb-2 uppercase tracking-wider">
              Quick Test Handles:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => selectPreset('rahul-vizag-dev', 'VIIT Vizag', 4, 'Python scripts, Flask backend, React UI commits')}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-cyan-950 hover:text-[#00F0FF] border border-slate-700 hover:border-[#00F0FF]/50 transition"
              >
                rahul-vizag-dev (Python/React)
              </button>
              <button
                type="button"
                onClick={() => selectPreset('ananya-ui-builder', 'GVP Gajuwaka', 5, 'Tailwind UI, React components, Next.js state')}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-cyan-950 hover:text-[#00F0FF] border border-slate-700 hover:border-[#00F0FF]/50 transition"
              >
                ananya-ui-builder (UI/Next.js)
              </button>
              <button
                type="button"
                onClick={() => selectPreset('kiran-design-works', 'ANITS Sangivalasa', 3, 'Figma tokens, UI wireframes, Pitch deck')}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-cyan-950 hover:text-[#00F0FF] border border-slate-700 hover:border-[#00F0FF]/50 transition"
              >
                kiran-design-works (Figma/UX)
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                GitHub Handle <span className="text-[#00F0FF]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-sm">@</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="e.g. rahul-vizag-dev"
                  className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00F0FF] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Vizag Campus / College
              </label>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00F0FF]"
              >
                {LOCAL_COLLEGES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Sample Public Repos & Commit Signature
              </label>
              <input
                type="text"
                value={sampleDetails}
                onChange={(e) => setSampleDetails(e.target.value)}
                placeholder="Describe public repos, commit languages, or architecture"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-200 text-sm flex items-start space-x-3">
              <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{t.errorTitle}</p>
                <p className="text-xs text-rose-300 mt-1">{error}</p>
                <button
                  type="button"
                  onClick={handleVerify}
                  className="mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-rose-900/60 hover:bg-rose-900 text-white text-xs font-medium transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.tryAgain}</span>
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="p-8 rounded-xl bg-slate-950/80 border border-cyan-900/50 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00F0FF] animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-[#FFB800] opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-[#00F0FF]" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white font-mono">
                  {t.verifyingWithAi}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Parsing commit frequencies, AST logic depth & anti-template integrity
                </p>
              </div>
            </div>
          )}

          {/* Success Structured Card Result */}
          {result && !loading && (
            <div className="p-5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-[#00F0FF]/50 shadow-[0_0_20px_rgba(0,240,255,0.15)] space-y-4">
              {/* Header result */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] font-mono font-bold text-lg shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                    {result.overallScore}%
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-base font-mono">
                        @{result.handle}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{result.proofBadge}</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#FFB800] font-mono mt-0.5">
                      Role Fit: {result.roleRecommendation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-right">
                  <div className="bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono block">VERIFIED ORIGINAL COMMITS</span>
                    <span className="text-base font-mono font-bold text-[#00F0FF] flex items-center justify-end space-x-1">
                      <GitCommit className="w-4 h-4" />
                      <span>{result.verifiedCommitsCount}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Skills breakdown */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Verified Skill Breakdown:
                </p>
                <div className="space-y-2.5">
                  {result.verifiedSkills.map((s, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white">
                          {s.skill} <span className="text-slate-400 font-normal">({s.level})</span>
                        </span>
                        <span className="font-mono font-bold text-[#00F0FF]">{s.score}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-[#00F0FF]"
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authenticity verdict */}
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-[#00F0FF]/30 text-xs">
                <span className="text-[#00F0FF] font-semibold block mb-0.5 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authenticity & Proof-of-Work Verdict:</span>
                </span>
                <p className="text-slate-300 leading-relaxed">{result.authenticityVerdict}</p>
              </div>

              {/* Action */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onApplyProfile(handle, college, result);
                    onClose();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#00F0FF] text-black font-bold text-sm hover:bg-[#00F0FF]/90 transition shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  <span>Apply Audit to My Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Direct Gemini API &bull; 60s Verified Matching
          </span>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleVerify}
              disabled={loading}
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-lg bg-[#00F0FF] text-black font-bold text-sm hover:bg-cyan-300 disabled:opacity-50 transition shadow-[0_0_12px_rgba(0,240,255,0.3)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Auditing...' : 'Run Audit'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
