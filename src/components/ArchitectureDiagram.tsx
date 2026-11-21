/**
 * A small animated system diagram built from a project's technologies:
 * nodes connected by lines with data "flowing" along them. SVG + CSS only.
 */
export function ArchitectureDiagram({ nodes, seed = 0 }: { nodes: string[]; seed?: number }) {
  const items = nodes.slice(0, 5);
  const layouts = [
    [[70, 60], [230, 40], [340, 130], [190, 200], [60, 190]],
    [[60, 130], [180, 50], [330, 70], [300, 200], [150, 210]],
    [[80, 50], [320, 50], [200, 130], [70, 210], [330, 210]],
    [[200, 40], [70, 120], [330, 120], [130, 215], [280, 215]],
  ];
  const points = layouts[seed % layouts.length].slice(0, items.length);
  const edges = points.slice(1).map((point, index) => [points[index], point]);
  if (points.length > 3) edges.push([points[0], points[points.length - 1]]);

  return (
    <svg viewBox="0 0 400 260" className="arch size-full" role="img" aria-label={`Built with ${items.join(", ")}`}>
      <defs>
        <radialGradient id={`arch-glow-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="130" r="150" fill={`url(#arch-glow-${seed})`} />
      {edges.map(([a, b], index) => {
        const d = `M ${a[0]} ${a[1]} C ${(a[0] + b[0]) / 2} ${a[1]}, ${(a[0] + b[0]) / 2} ${b[1]}, ${b[0]} ${b[1]}`;
        return (
          <g key={index}>
            <path d={d} className="arch-line" />
            <path d={d} className="arch-flow" style={{ animationDelay: `${index * -0.6}s` }} />
          </g>
        );
      })}
      {items.map((label, index) => {
        const [x, y] = points[index];
        const width = Math.max(64, label.length * 8.2 + 26);
        return (
          <g key={label} className="arch-node" style={{ animationDelay: `${index * 0.4}s` }}>
            <rect x={x - width / 2} y={y - 17} width={width} height={34} rx={17} />
            <circle cx={x - width / 2 + 15} cy={y} r={3.5} className="arch-dot" />
            <text x={x + 6} y={y + 4.5} textAnchor="middle">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}
