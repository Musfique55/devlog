'use client';

interface SystemNoticeProps {
  title: string;
  message: string;
  version: string;
  details: string[];
}

export function SystemNotice({ title, message, version, details }: SystemNoticeProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl relative overflow-hidden border-l-2 border-primary">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary">System Notice</h4>
          <p className="text-sm font-semibold mt-1 text-on-background">{message}</p>
        </div>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">
          {version}
        </span>
      </div>

      <div className="bg-background rounded p-4 font-mono text-[11px] text-zinc-400 leading-relaxed space-y-1">
        {details.map((detail, index) => (
          <div key={index} className="text-primary-container">
            {detail}
          </div>
        ))}
      </div>
    </div>
  );
}
