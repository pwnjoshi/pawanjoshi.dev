import type { CSSProperties } from "react";

const terrain = [
  "  11222  ",
  " 1112222 ",
  "111122233",
  "111112233",
  "111111222",
  "111111122",
  " 11111122",
  "  111112 ",
  "   1111  ",
];

const structures: Record<string, readonly string[]> = {
  "4,1": ["stone", "stone", "crystal"],
  "5,1": ["stone", "crystal"],
  "6,3": ["bark", "leaf", "leaf"],
  "7,2": ["bark", "leaf"],
  "2,5": ["stone", "amethyst"],
  "1,3": ["bark", "leaf"],
  "4,6": ["stone"],
};

const tiles = terrain.flatMap((row, y) =>
  Array.from(row, (height, x) => ({ x, y, height: Number(height) }))
    .filter(tile => tile.height > 0)
).sort((a, b) => a.x + a.y - b.x - b.y);

export type WorldPosition = { x: number; y: number };

export const worldBeacons = [
  { x: 4, y: 7, label: "Cloud platforms", color: "mint" },
  { x: 3, y: 5, label: "AI engineering", color: "violet" },
  { x: 4, y: 2, label: "Community", color: "gold" },
] as const;

export function isWalkable({ x, y }: WorldPosition) {
  return Number(terrain[y]?.[x]) > 0 && !structures[`${x},${y}`];
}

function worldCoordinates(x: number, y: number, level: number): CSSProperties {
  return {
    "--block-x": `${50 + (x - y) * 5}%`,
    "--block-y": `${27 + (x + y) * 3.65 - level * 6}%`,
  } as CSSProperties;
}

export function VoxelTerrain({
  player,
  collected = [],
  onMove,
  pulse = false,
}: {
  player?: WorldPosition;
  collected?: readonly number[];
  onMove?: (direction: WorldPosition) => void;
  pulse?: boolean;
}) {
  const nearby = player && [
    { x: player.x, y: player.y - 1 },
    { x: player.x - 1, y: player.y },
    { x: player.x, y: player.y + 1 },
    { x: player.x + 1, y: player.y },
  ].filter(isWalkable);

  return (
    <div className="voxel-scene">
      <div className="world-sky" aria-hidden="true">
        <div className="world-cloud world-cloud-high" />
        <div className="world-cloud world-cloud-low" />
        <div className="world-moon" />
      </div>
      <div className="voxel-island" aria-hidden="true">
        {tiles.flatMap(({ x, y, height }) => {
          const path = x === 4 || (y === 5 && x >= 2 && x <= 4);
          const blocks = [
            ...Array.from({ length: height - 1 }, () => "earth"),
            path ? "path" : "grass",
            ...(structures[`${x},${y}`] ?? []),
          ];

          const beacon = worldBeacons.findIndex(point => point.x === x && point.y === y);
          return blocks.map((material, level) => (
            <span
              key={`${x},${y},${level}`}
              className={`voxel-block voxel-${material}`}
              style={worldCoordinates(x, y, level)}
            />
          )).concat(
            player && beacon !== -1 && !collected.includes(beacon)
              ? [<span key={`beacon-${beacon}`} className={`world-beacon beacon-${worldBeacons[beacon].color}`} style={worldCoordinates(x, y, height - 1)} />]
              : [],
          );
        })}
        {player && (
          <span className="world-player" style={worldCoordinates(player.x, player.y, Number(terrain[player.y][player.x]) - 1)}>
            {pulse && <span className="world-discovery-ripple" key={collected.length} />}
          </span>
        )}
      </div>
      {player && onMove && nearby?.map(({ x, y }) => (
        <button
          type="button"
          className="world-tile-target"
          key={`${x},${y}`}
          tabIndex={-1}
          aria-label={`Move to column ${x + 1}, row ${y + 1}`}
          style={worldCoordinates(x, y, Number(terrain[y][x]) - 1)}
          onClick={() => onMove({ x: x - player.x, y: y - player.y })}
        />
      ))}
    </div>
  );
}
