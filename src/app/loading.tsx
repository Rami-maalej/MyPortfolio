export default function Loading() {
  return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black">
      <div className="font-display text-3xl text-white">RM<span className="text-white/40">.</span></div>
      <div className="mt-6 h-px w-32 overflow-hidden bg-white/10">
        <div
          className="h-full w-1/2 bg-white"
          style={{
            animation: 'rm-loading-bar 1.2s ease-in-out infinite',
          }}
        />
      </div>
      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
        Loading
      </div>
      <style>{`
        @keyframes rm-loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}
