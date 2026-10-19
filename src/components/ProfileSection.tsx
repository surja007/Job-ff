import React from 'react';

interface ProfileSectionProps {
  title: string;
  description: string;
  completion: number;
  children: React.ReactNode;
}

export default function ProfileSection({ title, description, completion, children }: ProfileSectionProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">{completion}%</span>
          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${completion}%` }}></div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
