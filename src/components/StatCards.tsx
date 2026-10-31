import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Language } from '../types';
import { AlertTriangle, TrendingUp, Users, ExternalLink } from 'lucide-react';

interface StatCardsProps {
  language: Language;
}

export const StatCards: React.FC<StatCardsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const cards = [
    {
      stat: '23%',
      title: t.statCard1Title,
      description: t.statCard1Text,
      sourceUrl: 'https://ff.co/startup-statistics-guide/',
      sourceLabel: 'ff.co Startup Guide',
      icon: AlertTriangle,
      accentColor: 'text-[#FFB800]',
      borderColor: 'border-[#FFB800]/30 hover:border-[#FFB800]/60',
      badgeBg: 'bg-amber-950/40 text-[#FFB800]'
    },
    {
      stat: '18–23%',
      title: t.statCard2Title,
      description: t.statCard2Text,
      sourceUrl: 'https://medium.com/@sachinvishkarma/why-90-of-indian-startups-fail-the-7-critical-reasons-and-how-to-avoid-them-adc0b94b2bd4',
      sourceLabel: 'Sachin Vishkarma (Medium)',
      icon: TrendingUp,
      accentColor: 'text-rose-400',
      borderColor: 'border-rose-900/40 hover:border-rose-500/60',
      badgeBg: 'bg-rose-950/40 text-rose-300'
    },
    {
      stat: '50,000+',
      title: t.statCard3Title,
      description: t.statCard3Text,
      sourceUrl: 'https://reskilll.com/blogs/smart-india-hackathon-2026-complete-guide-registration-themes-winning/',
      sourceLabel: 'Reskilll SIH Winning Guide',
      icon: Users,
      accentColor: 'text-[#00F0FF]',
      borderColor: 'border-[#00F0FF]/30 hover:border-[#00F0FF]/60',
      badgeBg: 'bg-cyan-950/40 text-[#00F0FF]'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative flex flex-col justify-between p-5 rounded-xl bg-slate-900/60 backdrop-blur-sm border ${card.borderColor} transition-all duration-200 group shadow-lg`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${card.accentColor}`}>
                  {card.stat}
                </span>
                <div className={`p-2 rounded-lg ${card.badgeBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-base font-bold text-white mb-1.5 leading-snug">
                {card.title}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px] truncate mr-2">
                {card.sourceLabel}
              </span>
              <a
                href={card.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[#00F0FF] hover:underline hover:text-white transition font-mono text-[11px]"
              >
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
