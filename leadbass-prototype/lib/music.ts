export type TimedNote = { string: number; fret: number; beats: number };
export function phraseBeats(notes: TimedNote[]) {
  return notes.reduce((sum, n) => sum + n.beats, 0);
}
export function noteAtBeat(notes: TimedNote[], beat: number) {
  let cursor = 0;
  for (let i = 0; i < notes.length; i++) {
    cursor += notes[i].beats;
    if (beat < cursor) return i;
  }
  return notes.length - 1;
}
export function timeline(
  notes: TimedNote[],
  elapsedMs: number,
  bpm: number,
  loop: boolean,
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
  const total = phraseBeats(notes),
    played = elapsedBeats - 4;
  const cycle = Math.floor(played / total),
    position = loop ? played % total : Math.min(played, total);
  return {
    countdown: 0,
    index: noteAtBeat(notes, position),
    finished: !loop && played >= total,
    cycle,
    beat: Math.floor(position) % 4,
    progress: position / total,
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
