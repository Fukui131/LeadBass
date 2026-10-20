import { test } from "node:test";
import assert from "node:assert/strict";
import { timeline, noteAtBeat, clampBpm, pitchName } from "./music.ts";
const notes = [
  { string: 4, fret: 0, beats: 1 },
  { string: 4, fret: 2, beats: 0.5 },
  { string: 3, fret: 3, beats: 2 },
];
test("four-beat count-in, tempo and fractional durations", () => {
  assert.equal(timeline(notes, 3000, 60, false).countdown, 1);
  assert.equal(timeline(notes, 4000, 60, false).index, 0);
  assert.equal(timeline(notes, 5000, 60, false).index, 1);
  assert.equal(timeline(notes, 5500, 60, false).index, 2);
  assert.equal(timeline(notes, 2750, 120, false).index, 2);
});
test("completion and loop boundaries", () => {
  assert.equal(timeline(notes, 7499, 60, false).finished, false);
  assert.equal(timeline(notes, 7500, 60, false).finished, true);
  assert.equal(timeline(notes, 7500, 60, true).index, 0);
  assert.equal(timeline(notes, 7500, 60, true).cycle, 1);
  assert.equal(timeline(notes, 7500, 60, true).finished, false);
});
test("correct strings, open notes and bounded tempo", () => {
  assert.equal(pitchName(4, 0), "E");
  assert.equal(pitchName(1, 0), "G");
  assert.equal(pitchName(4, 3), "G");
  assert.equal(noteAtBeat(notes, 1.49), 1);
  assert.equal(clampBpm(0), 30);
  assert.equal(clampBpm(500), 220);
  assert.equal(clampBpm(NaN), 60);
});
