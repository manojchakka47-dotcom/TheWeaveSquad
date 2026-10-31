import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Language } from '../types';
import { Shield, Radio, Users, Info, Sparkles, Menu, X, Trash2, Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface NavbarProps {
  currentScreen: number;
  setCurrentScreen: (screen: number) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  matchedCount: number;
  userHandle?: string;
  onOpenVerifier: () => void;
  onClearData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  setCurrentScreen,
  language,
  setLanguage,
  theme,
  setTheme,
  matchedCount,
  userHandle,
  onOpenVerifier,
  onClearData
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 1, label: t.navEvent, icon: Sparkles },
    { id: 2, label: t.navRadar, icon: Radio, badge: matchedCount > 0 ? `${matchedCount}` : undefined },
    { id: 3, label: t.navLaunchpad, icon: Shield },
    { id: 4, label: t.navAbout, icon: Info }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0E17]/95 backdrop-blur-md border-b border-cyan-950/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentScreen(1)}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950/50 border border-[#00F0FF]/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping absolute" />
              <Radio className="w-5 h-5 text-[#00F0FF] relative z-10" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  TheWeave<span className="text-[#00F0FF]">Squad</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-950 text-[#00F0FF] border border-[#00F0FF]/30">
                  VIZAG HUB
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wider hidden sm:block">
                {t.poweredBy}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-cyan-950/70 text-[#00F0FF] border border-[#00F0FF]/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00F0FF]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#FFB800] text-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: AI Verifier, Language Toggle, Reset */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick AI Skill Verifier Button */}
            <button
              onClick={onOpenVerifier}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-950 to-slate-900 border border-[#00F0FF]/40 text-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition"
              title="Test Gemini AI GitHub Verifier"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="hidden sm:inline">AI Skill Audit</span>
              <span className="sm:hidden">Audit</span>
            </button>

            {/* Language Toggle */}
            <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded transition ${
                  language === 'en' ? 'bg-[#00F0FF] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2 py-1 rounded transition ${
                  language === 'te' ? 'bg-[#00F0FF] text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Switch to Telugu"
              >
                తెలుగు
              </button>
            </div>

            {/* Theme Toggle: White Theme / Dark Mode */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold border border-slate-700 hover:border-[#00F0FF] bg-slate-900 transition"
              title={theme === 'light' ? 'Switch to Dark Command Center' : 'Switch to White Theme'}
              aria-label="Toggle White or Dark Theme"
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="hidden sm:inline">White Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Clear data button */}
            <button
              onClick={onClearData}
              title={t.clearData}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition"
              aria-label={t.clearData}
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0E17] border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentScreen(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-cyan-950/80 text-[#00F0FF] border border-[#00F0FF]/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4 text-[#00F0FF]" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#FFB800] text-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
