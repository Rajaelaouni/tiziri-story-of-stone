/**
 * Motif signature : frise de losanges et chevrons, inspirée de la géométrie
 * des tapis et bijoux amazighs. S’utilise comme séparateur, jamais comme décor de fond.
 */
export function Motif({ className = "text-clay" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-current opacity-40 md:w-24" />
      <svg viewBox="0 0 84 16" className="h-4 w-auto" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M2 8L8 2L14 8L8 14Z" />
        <path d="M20 12L26 4L32 12" />
        <path d="M36 8L42 1L48 8L42 15Z" />
        <circle cx="42" cy="8" r="1.4" fill="currentColor" stroke="none" />
        <path d="M52 12L58 4L64 12" />
        <path d="M70 8L76 2L82 8L76 14Z" />
      </svg>
      <span className="h-px w-16 bg-current opacity-40 md:w-24" />
    </div>
  );
}
