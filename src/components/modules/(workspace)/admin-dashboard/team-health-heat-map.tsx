'use client';

import { useEffect, useRef } from 'react';

export default function TeamHealthHeatmap() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gridRef.current.innerHTML = '';

    for (let i = 0; i < 182; i++) {
      const opacity = Math.random();
      const div = document.createElement('div');
      const bgClass = opacity > 0.8 ? 'bg-primary' : opacity > 0.5 ? 'bg-primary/60' : opacity > 0.2 ? 'bg-zinc-800' : 'bg-zinc-900';
      div.className = `w-4 h-4 rounded-[2px] ${bgClass}`;
      gridRef.current.appendChild(div);
    }
  }, []);

  return (
    <div className="bg-surface-container-low p-8 rounded-xl">
      <h3 className="text-lg font-bold tracking-tight text-on-background mb-8 flex items-center gap-2">
        Team Health Heatmap
        <span className="text-[0.6875rem] font-medium text-zinc-500 uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded ml-2">
          Last 30 Days
        </span>
      </h3>

      <div className="flex gap-2 overflow-x-auto">
        <div className="grid grid-rows-7 grid-flow-col gap-1.5 h-32" ref={gridRef} />
      </div>

      <div className="mt-6 flex items-center gap-4 text-[0.6875rem] text-zinc-500 font-medium flex-wrap">
        <span>Less Activity</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-zinc-900 rounded-[1px]"></div>
          <div className="w-3 h-3 bg-zinc-800 rounded-[1px]"></div>
          <div className="w-3 h-3 bg-primary/40 rounded-[1px]"></div>
          <div className="w-3 h-3 bg-primary/70 rounded-[1px]"></div>
          <div className="w-3 h-3 bg-primary rounded-[1px]"></div>
        </div>
        <span>High Activity</span>
      </div>
    </div>
  );
}
