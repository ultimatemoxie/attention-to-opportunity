// Simple connected-system diagram — three nodes wired to a central hub.
// Pure SVG, no external deps.

export function ConnectedDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 320"
      className={className}
      role="img"
      aria-label="Content, website and CRM systems connected"
    >
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.2 250)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.82 0.14 210)" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.82 0.14 210)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.68 0.19 250)" stopOpacity="0.1" />
        </radialGradient>
      </defs>

      {/* connection lines */}
      <g stroke="url(#line)" strokeWidth="1.25" fill="none">
        <path d="M110 80 L260 160" />
        <path d="M410 80 L260 160" />
        <path d="M260 260 L260 160" />
      </g>

      {/* nodes */}
      <NodeCard x={40} y={40} label="AI Content" hint="Attention" />
      <NodeCard x={340} y={40} label="Websites" hint="Capture" />
      <NodeCard x={190} y={230} label="CRM + Automation" hint="Follow-up" />

      {/* hub */}
      <circle cx="260" cy="160" r="46" fill="url(#hub)" />
      <circle cx="260" cy="160" r="14" fill="oklch(0.72 0.2 250)" />
      <circle cx="260" cy="160" r="6" fill="oklch(0.98 0.005 250)" />
    </svg>
  );
}

function NodeCard({ x, y, label, hint }: { x: number; y: number; label: string; hint: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="140"
        height="60"
        rx="10"
        fill="oklch(0.22 0.03 260)"
        stroke="oklch(1 0 0 / 12%)"
      />
      <text
        x="16"
        y="26"
        fill="oklch(0.72 0.02 255)"
        fontSize="10"
        fontFamily="Inter, sans-serif"
        letterSpacing="2"
      >
        {hint.toUpperCase()}
      </text>
      <text
        x="16"
        y="46"
        fill="oklch(0.97 0.005 250)"
        fontSize="14"
        fontFamily="Sora, sans-serif"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
}
