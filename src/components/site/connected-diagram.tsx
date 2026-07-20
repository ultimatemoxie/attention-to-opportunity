// Connected-system diagram — three nodes wired to a central hub.
// Editorial navy + gold, warm-white paper.

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
          <stop offset="0%" stopColor="#C79635" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C79635" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C79635" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#061A3A" stopOpacity="0" />
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
      <circle cx="260" cy="160" r="14" fill="#061A3A" />
      <circle cx="260" cy="160" r="5" fill="#C79635" />
    </svg>
  );
}

function NodeCard({ x, y, label, hint }: { x: number; y: number; label: string; hint: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="140"
        height="60"
        rx="8"
        fill="#FFFFFF"
        stroke="#E7E1D5"
      />
      <text
        x="16"
        y="26"
        fill="#C79635"
        fontSize="9"
        fontFamily="Manrope, sans-serif"
        fontWeight="600"
        letterSpacing="2"
      >
        {hint.toUpperCase()}
      </text>
      <text
        x="16"
        y="46"
        fill="#061A3A"
        fontSize="14"
        fontFamily="Cormorant Garamond, serif"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
}
