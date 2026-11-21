"use client";

import Link from "next/link";
import { type KeyboardEvent, useRef, useState } from "react";
import { isWalkable, VoxelTerrain, worldBeacons, type WorldPosition } from "./VoxelTerrain";

const moves = {
  ArrowUp: { x: 0, y: -1, label: "North", arrow: "↑" },
  ArrowLeft: { x: -1, y: 0, label: "West", arrow: "←" },
  ArrowDown: { x: 0, y: 1, label: "South", arrow: "↓" },
  ArrowRight: { x: 1, y: 0, label: "East", arrow: "→" },
};

const initialRun = {
  position: { x: 4, y: 8 },
  collected: [] as number[],
  message: "You’re at base camp. Head north for your first beacon.",
  pulse: false,
};

const initialRelay = [0, 1, 1];
const relayTiles = [
  { name: "Upper elbow", kind: "elbow", orientations: ["north and east", "east and south", "south and west", "west and north"], solution: 2 },
  { name: "Lower elbow", kind: "elbow", orientations: ["north and east", "east and south", "south and west", "west and north"], solution: 0 },
  { name: "Straight pipe", kind: "straight", orientations: ["east and west", "north and south"], solution: 0 },
];

export type TourDiscovery = { detail: string; href: string };

export function WorldTour({ discoveries }: { discoveries: readonly TourDiscovery[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const northControl = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [run, setRun] = useState(initialRun);
  const [relay, setRelay] = useState(initialRelay);
  const [showHint, setShowHint] = useState(false);
  const complete = run.collected.length === worldBeacons.length;
  const nextBeacon = worldBeacons.find((_, index) => !run.collected.includes(index));
  const misaligned = relayTiles.findIndex((tile, index) => tile.solution !== relay[index]);
  const restored = complete && misaligned === -1;
  const hint = nextBeacon
    ? `Look for ${nextBeacon.label} at column ${nextBeacon.x + 1}, row ${nextBeacon.y + 1}.`
    : misaligned === -1
      ? "The relay is connected."
      : `Rotate the ${relayTiles[misaligned].name.toLowerCase()} so it opens ${relayTiles[misaligned].orientations[relayTiles[misaligned].solution]}.`;

  function restart() {
    setRun(initialRun);
    setRelay(initialRelay);
    setShowHint(false);
  }

  function rotate(index: number) {
    setRelay(current => current.map((angle, tileIndex) =>
      tileIndex === index ? (angle + 1) % relayTiles[index].orientations.length : angle
    ));
  }

  function move(direction: WorldPosition) {
    setRun(current => {
      const position = {
        x: current.position.x + direction.x,
        y: current.position.y + direction.y,
      };
      if (!isWalkable(position)) return { ...current, message: "That tile is blocked. Try a different direction.", pulse: false };

      const beacon = worldBeacons.findIndex(point => point.x === position.x && point.y === position.y);
      if (beacon < 0 || current.collected.includes(beacon)) return { ...current, position, message: "", pulse: false };

      const collected = [...current.collected, beacon];
      const message = collected.length === worldBeacons.length
        ? "All three beacons found. Restore the relay to finish."
        : `${worldBeacons[beacon].label} discovered. ${collected.length} of ${worldBeacons.length} beacons found.`;
      return { position, collected, message, pulse: true };
    });
  }

  function handleKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || !Object.hasOwn(moves, event.key)) return;
    event.preventDefault();
    move(moves[event.key as keyof typeof moves]);
  }

  function moveFromMap(direction: WorldPosition) {
    northControl.current?.focus({ preventScroll: true });
    move(direction);
  }

  return (
    <>
      <button type="button" ref={trigger} className="world-tour-trigger" onClick={() => {
        dialog.current?.showModal();
        setOpen(true);
      }}>
        <span aria-hidden="true">▶</span> Play island tour
      </button>
      <dialog
        ref={dialog}
        className="world-tour"
        aria-labelledby="tour-title"
        onKeyDown={handleKey}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
      >
        <header className="tour-header">
          <div>
            <p className="home-label">{run.collected.length} / {worldBeacons.length} beacons</p>
            <h2 id="tour-title">Island tour</h2>
          </div>
          <button type="button" className="tour-control" onClick={() => dialog.current?.close()}>Close</button>
        </header>

        {open && <div className="tour-layout">
          <div className="tour-map">
            <VoxelTerrain player={run.position} collected={run.collected} onMove={moveFromMap} pulse={run.pulse} />
            <p className="tour-position">Column {run.position.x + 1}, row {run.position.y + 1}</p>
            <div className="tour-directions" role="group" aria-label="Movement">
              {Object.values(moves).map(direction => (
                <button key={direction.label} ref={direction === moves.ArrowUp ? northControl : undefined} type="button" className="tour-control" aria-label={`Move ${direction.label.toLowerCase()}`} onClick={() => move(direction)}>
                  {direction.arrow}
                </button>
              ))}
            </div>
          </div>

          <div className="tour-details">
            <p>Use the arrow keys, movement buttons, or highlighted tiles. Land on each beacon to uncover part of my work.</p>
            <p className="tour-status" role="status">{run.message || `Column ${run.position.x + 1}, row ${run.position.y + 1}.`}</p>
            <ul className="tour-beacons">
              {worldBeacons.map((beacon, index) => (
                <li key={beacon.label} data-collected={run.collected.includes(index) || undefined}>
                  <span className={`beacon-key beacon-${beacon.color}`} aria-hidden="true" />
                  <div>
                    <h3>{beacon.label}</h3>
                    {run.collected.includes(index) ? (
                      <Link href={discoveries[index].href} onClick={() => dialog.current?.close()}>{discoveries[index].detail} ↗</Link>
                    ) : (
                      <p>Column {beacon.x + 1}, row {beacon.y + 1}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {complete && (
              <section className="relay-puzzle" aria-labelledby="relay-title">
                <h3 id="relay-title">Restore the relay</h3>
                <p>Rotate the three pipes to connect the source to the receiver.</p>
                <div className="relay-board" data-powered={restored || undefined}>
                  <span className="relay-source" aria-hidden="true">●</span>
                  {relayTiles.map((tile, index) => (
                    <button
                      key={tile.name}
                      type="button"
                      className={`relay-tile relay-tile-${index + 1}`}
                      aria-label={`${tile.name}, opens ${tile.orientations[relay[index]]}. Rotate clockwise.`}
                      onClick={() => rotate(index)}
                    >
                      <span aria-hidden="true" className={`relay-pipe relay-${tile.kind}`} style={{ transform: `rotate(${relay[index] * 90}deg)` }} />
                    </button>
                  ))}
                  <span className="relay-receiver" aria-hidden="true">◆</span>
                </div>
                <p className="relay-status" role="status">{restored ? "Relay restored. Island tour complete." : "The relay is offline."}</p>
                {restored && <Link href={discoveries[0].href} onClick={() => dialog.current?.close()}>Read the cloud platform case study ↗</Link>}
              </section>
            )}
            <div className="tour-actions">
              <button type="button" className="tour-control" aria-expanded={showHint} aria-controls="tour-hint" onClick={() => setShowHint(current => !current)}>
                {showHint ? "Hide hint" : "Show hint"}
              </button>
              <button type="button" className="tour-control" onClick={restart}>{restored ? "Play again" : "Restart tour"}</button>
            </div>
            <p id="tour-hint" className="tour-hint" hidden={!showHint} aria-live="polite">{hint}</p>
          </div>
        </div>}
      </dialog>
    </>
  );
}
