export type TimedNote = {
  string: number;
  fret: number;
  beats: number;
  rest?: never;
};
export type TimedRest = { rest: true; beats: number };
export type TimedEvent = TimedNote | TimedRest;

export function phraseBeats(notes: TimedEvent[]) {
  return notes.reduce((sum, n) => sum + n.beats, 0);
}
export function noteAtBeat(notes: TimedEvent[], beat: number) {
  let cursor = 0;
  for (let i = 0; i < notes.length; i++) {
    cursor += notes[i].beats;
    if (beat < cursor) return i;
  }
  return notes.length - 1;
}
export function timeline(
  notes: TimedEvent[],
  elapsedMs: number,
  bpm: number,
  loop: boolean,
  loopEnding?: { rest: TimedRest; lastCycle: number },
) {
  const elapsedBeats = (elapsedMs * bpm) / 60000;
  if (elapsedBeats < 4)
    return {
      countdown: 4 - Math.floor(elapsedBeats),
      index: 0,
      finished: false,
      cycle: 0,
      beat: Math.floor(elapsedBeats) % 4,
      progress: 0,
    };
  const total = phraseBeats(notes);
  const cycleBeats = total + (loopEnding?.rest.beats ?? 0);
  const played = elapsedBeats - 4;
  const lastCycle = loopEnding?.lastCycle ?? 0;
  const finished = !loop && played >= lastCycle * cycleBeats + total;
  const cycle =
    finished && loopEnding ? lastCycle + 1 : Math.floor(played / cycleBeats);
  const position = finished ? total : played % cycleBeats;
  // The loop-only rest is the column immediately after the regular score.
  const index =
    !finished && position >= total ? notes.length : noteAtBeat(notes, position);
  return {
    countdown: 0,
    index,
    finished,
    cycle,
    beat: Math.floor(elapsedBeats) % 4,
    progress: position / (loop ? cycleBeats : total),
  };
}
export function pitchName(string: number, fret: number) {
  const names = [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ];
  return names[([0, 7, 2, 9, 4][string] + fret) % 12];
}
export function clampBpm(value: number) {
  return Math.max(
    30,
    Math.min(220, Math.round(Number.isFinite(value) ? value : 60)),
  );
}
