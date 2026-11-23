import assert from "node:assert/strict";
import { test } from "node:test";
import { phrases } from "./content.ts";
import { timeline, type TimedEvent } from "./music.ts";

const positions = [
  ["ド", 3, 3, "中指"],
  ["レ", 3, 5, "小指"],
  ["ミ", 2, 2, "人差し指"],
  ["ファ", 2, 3, "中指"],
  ["ソ", 2, 5, "小指"],
  ["ラ", 1, 2, "人差し指"],
  ["シ", 1, 4, "薬指"],
  ["ド", 1, 5, "小指"],
  ["レ", 1, 7, "小指"],
  ["ド", 1, 5, "中指"],
];

test("both scale exercises use the specified positions and turnaround", () => {
  for (const [id, order] of [
    ["scale-round-trip", [0, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 0]],
    [
      "scale-thirds",
      [0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 9, 5, 6, 4, 5, 3, 4, 2, 3, 1, 2, 0],
    ],
  ] as const) {
    const phrase = phrases.find((phrase) => phrase.id === id);
    assert(phrase);
    assert.deepEqual(
      phrase.notes.filter((event) => !event.rest).map(({ string, fret, fingering }) => [
        fingering?.name, string, fret, fingering?.finger,
      ]),
      order.map((index) => positions[index]),
    );
    assert(phrase.notes.every((note) => note.beats === 1));
  }
});

test("only the position shift and its return carry movement cues", () => {
  const phrase = phrases.find((phrase) => phrase.id === "scale-thirds");
  assert(phrase);
  assert.deepEqual(
    phrase.notes.flatMap((note, index) =>
      !note.rest && note.fingering?.positionHint ? [index] : [],
    ),
    [12, 13, 14],
  );
});

test("round trip has a full beat of rest at each applicable turn", () => {
  const phrase = phrases.find((phrase) => phrase.id === "scale-round-trip");
  assert(phrase?.loopRest);
  const rest = phrase.loopRest;
  assert.deepEqual(rest, { rest: true, beats: 1 });
  assert.deepEqual(phrase.notes.filter((event) => event.rest), [rest]);
  assert.deepEqual(phrase.notes[8], rest);

  for (const [beats, bpm] of [[1, 60], [0.5, 120]] as const) {
    const score: TimedEvent[] = phrase.notes.map((event) =>
      event.rest ? event : { ...event, beats },
    );
    const at = (beat: number, loop: boolean, lastCycle = 0) =>
      timeline(score, (beat + 4) * 60000 / bpm, bpm, loop, { rest, lastCycle });
    const ascentEnds = 8 * beats;
    const descentEnds = 16 * beats + 1;
    const cycleBeats = descentEnds + 1;

    for (const loop of [false, true]) {
      assert.equal(at(ascentEnds - 0.01, loop).index, 7);
      assert.equal(at(ascentEnds, loop).index, 8);
      assert.equal(at(ascentEnds + 0.99, loop).index, 8);
      assert.equal(at(ascentEnds + 1, loop).index, 9);
      assert.equal(at(descentEnds - 0.01, loop).index, 16);
      assert.equal(at(descentEnds - 0.01, loop).finished, false);
    }
    assert.equal(at(descentEnds, false).finished, true);
    assert.equal(at(descentEnds, false).cycle, 1);

    assert.equal(at(descentEnds, true).index, 17);
    assert.equal(at(descentEnds, true).finished, false);
    assert.equal(at(cycleBeats - 0.01, true).index, 17);
    assert.equal(at(cycleBeats, true).index, 0);
    assert.equal(at(cycleBeats, true).cycle, 1);
    assert.equal(at(cycleBeats, true).beat, cycleBeats % 4);

    // Turning looping off in the second pass preserves its position and end time.
    assert.equal(at(cycleBeats + ascentEnds, false, 1).index, 8);
    assert.equal(at(cycleBeats + descentEnds - 0.01, false, 1).finished, false);
    assert.equal(at(cycleBeats + descentEnds, false, 1).finished, true);
    assert.equal(at(cycleBeats + descentEnds, false, 1).cycle, 2);
  }
});
