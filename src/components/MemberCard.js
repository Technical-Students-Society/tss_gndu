import { User } from 'lucide-react';

export default function MemberCard({ name, role, image }) {
  return (
    <div className="flex flex-col items-center space-y-4 p-6 border rounded-xl dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 min-w-[280px] max-w-[280px]">
      <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border-2 border-white dark:border-neutral-800">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-12 h-12 text-neutral-400 dark:text-neutral-600" />
        )}
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-50">{name}</h3>
        <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">{role}</p>
      </div>
      <div className="flex gap-4 pt-2">
        {/* Placeholder Social Links */}
        <div className="w-6 h-6 rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="w-6 h-6 rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="w-6 h-6 rounded bg-neutral-100 dark:bg-neutral-800" />
      </div>
    </div>
  );
}
