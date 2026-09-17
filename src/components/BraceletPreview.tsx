import { useId } from "react";
import { colors as allColors, findFermeture, findPerle, findTaille, type BraceletConfig } from "@/lib/sur-mesure";

const CX = 160;
const CY = 172;
const R = 100;
const GAP = 24; // demi-ouverture (degrés) laissée en haut pour la fermeture
const baseCount = { ronde: 18, tonneau: 13, fragment: 30 };

const rad = (deg: number) => (deg * Math.PI) / 180;
const onCircle = (deg: number, r = R) => ({ x: CX + r * Math.cos(rad(deg)), y: CY + r * Math.sin(rad(deg)) });
// Variation déterministe : chaque perle a sa nuance, sans changer à chaque rendu.
const jitter = (i: number) => (Math.sin(i * 12.9898) * 43758.5453) % 1;

/** Aperçu dessiné du bracelet sur mesure. Indicatif : les matières naturelles varient. */
export function BraceletPreview({ config, className = "" }: { config: BraceletConfig; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const perle = findPerle(config.perle);
  const fermeture = findFermeture(config.fermeture);
  if (!perle || !fermeture) return null;

  const count = baseCount[perle.shape] + (findTaille(config.taille)?.beads ?? 0);
  const start = -90 + GAP;
  const end = 270 - GAP;
  const step = (end - start) / (count - 1);
  // Les perles tournent dans le sens horaire, du haut-droit au haut-gauche.
  const right = onCircle(start);
  const left = onCircle(end);
  const isChain = fermeture.id === "chaine";
  const colorAt = (i: number) => config.colors[i % config.colors.length] ?? config.colors[0] ?? "";
  const firstColor = config.colors[0] ?? "";

  const beads = Array.from({ length: count }, (_, i) => {
    const a = start + i * step;
    const { x, y } = onCircle(a);
    const color = colorAt(i);
    const j = jitter(i + 1);
    const fill = `url(#${uid}-${color})`;
    const shade = `url(#${uid}-shade)`;
    if (perle.shape === "ronde") {
      return (
        <g key={i}>
          <circle cx={x} cy={y} r={11.5} fill={fill} />
          <circle cx={x} cy={y} r={11.5} fill={shade} />
          <path
            d={`M${x - 6} ${y + 2 * j}q4 ${-5 + 3 * j} 9 ${-1 - 2 * j}`}
            stroke="#000"
            strokeOpacity={0.18}
            strokeWidth={0.8}
            fill="none"
          />
        </g>
      );
    }
    if (perle.shape === "tonneau") {
      const spacer = onCircle(a + step / 2);
      return (
        <g key={i}>
          <g transform={`rotate(${a + 90} ${x} ${y})`}>
            <rect x={x - 9} y={y - 8} width={18} height={16} rx={5.5} fill={fill} />
            <rect x={x - 9} y={y - 8} width={18} height={16} rx={5.5} fill={shade} />
          </g>
          {i < count - 1 && <circle cx={spacer.x} cy={spacer.y} r={3} fill={`url(#${uid}-gold)`} />}
        </g>
      );
    }
    return (
      <g key={i} transform={`rotate(${a + 8 * j} ${x} ${y})`}>
        <ellipse cx={x} cy={y} rx={4.5 + 1.5 * Math.abs(j)} ry={10 + 2.5 * j} fill={fill} />
        <ellipse cx={x} cy={y} rx={4.5 + 1.5 * Math.abs(j)} ry={10 + 2.5 * j} fill={shade} />
      </g>
    );
  });

  // Chaînette : maillons répartis le long de deux segments vers le fermoir.
  const links = (from: { x: number; y: number }, to: { x: number; y: number }, n: number) =>
    Array.from({ length: n }, (_, k) => {
      const t = (k + 0.5) / n;
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;
      const angle = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
      return (
        <ellipse
          key={`${from.x}-${k}`}
          cx={x}
          cy={y}
          rx={4.2}
          ry={2.6}
          transform={`rotate(${angle + (k % 2 ? 90 : 0)} ${x} ${y})`}
          fill="none"
          stroke={`url(#${uid}-silver)`}
          strokeWidth={1.6}
        />
      );
    });

  const knot = { x: CX, y: 46 };
  // La breloque pend au centre, entre les deux extrémités, sans chevaucher les perles.
  const charmAnchor = isChain ? { x: CX - 4, y: 62 } : { x: CX, y: knot.y + 8 };

  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label="Aperçu de votre bracelet sur mesure">
      <defs>
        {allColors.map((c) => (
          <radialGradient key={c.id} id={`${uid}-${c.id}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={c.light} />
            <stop offset="60%" stopColor={c.hex} />
            <stop offset="100%" stopColor={c.hex} />
          </radialGradient>
        ))}
        <radialGradient id={`${uid}-shade`} cx="40%" cy="35%" r="70%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
        <linearGradient id={`${uid}-silver`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2f1ee" />
          <stop offset="50%" stopColor="#a9a59e" />
          <stop offset="100%" stopColor="#e1ded8" />
        </linearGradient>
        <radialGradient id={`${uid}-gold`} cx="35%" cy="30%">
          <stop offset="0%" stopColor="#e7c98f" />
          <stop offset="100%" stopColor="#8a6a38" />
        </radialGradient>
      </defs>

      <ellipse cx={CX} cy={CY + 118} rx={105} ry={8} fill="#000" opacity={0.06} />

      {/* Fil porteur sous les perles */}
      <path
        d={`M${right.x} ${right.y}A${R} ${R} 0 1 1 ${left.x} ${left.y}`}
        fill="none"
        stroke={isChain ? "#8f8b85" : fermeture.tone}
        strokeWidth={1.5}
      />

      {isChain ? (
        <g>
          {links(left, { x: CX - 6, y: 58 }, 5)}
          {links(right, { x: CX + 6, y: 58 }, 5)}
          {links({ x: CX + 6, y: 58 }, { x: CX + 34, y: 44 }, 4)}
          <rect x={CX - 12} y={51} width={16} height={11} rx={5} fill="none" stroke={`url(#${uid}-silver)`} strokeWidth={2.4} />
        </g>
      ) : (
        <g stroke={fermeture.tone} strokeLinecap="round" fill="none">
          <path d={`M${left.x} ${left.y}Q${CX - 30} ${knot.y + 20} ${knot.x - 10} ${knot.y + 6}`} strokeWidth={3} />
          <path d={`M${right.x} ${right.y}Q${CX + 30} ${knot.y + 20} ${knot.x + 10} ${knot.y + 6}`} strokeWidth={3} />
          <path d={`M${knot.x - 8} ${knot.y}Q${CX - 40} ${knot.y - 18} ${CX - 62} ${knot.y - 14}`} strokeWidth={2.4} />
          <path d={`M${knot.x + 8} ${knot.y}Q${CX + 40} ${knot.y - 18} ${CX + 62} ${knot.y - 14}`} strokeWidth={2.4} />
          <rect x={knot.x - 13} y={knot.y - 7} width={26} height={16} rx={5} fill={fermeture.tone} strokeWidth={0} />
          {[-7, -2, 3, 8].map((dx) => (
            <path key={dx} d={`M${knot.x + dx} ${knot.y - 6}l-3 14`} stroke="#fff" strokeOpacity={0.25} strokeWidth={1} />
          ))}
          <circle cx={CX - 66} cy={knot.y - 14} r={6} fill={`url(#${uid}-${firstColor})`} strokeWidth={0} />
          <circle cx={CX + 66} cy={knot.y - 14} r={6} fill={`url(#${uid}-${colorAt(1)})`} strokeWidth={0} />
        </g>
      )}

      {beads}

      {config.breloque && (
        <g transform={`translate(${charmAnchor.x} ${charmAnchor.y})`}>
          <circle cx={0} cy={2} r={3.2} fill="none" stroke={`url(#${uid}-silver)`} strokeWidth={1.6} />
          <path d="M0 6L-12 30H12Z" fill={`url(#${uid}-silver)`} stroke="#8f8b85" strokeWidth={0.8} />
          <path d="M0 12L-6 25H6Z" fill="none" stroke="#6f6b66" strokeWidth={0.7} />
          <circle cx={0} cy={21} r={1.6} fill="#6f6b66" />
          <path d="M0 30v8m-4-4h8" stroke={`url(#${uid}-silver)`} strokeWidth={2} strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
