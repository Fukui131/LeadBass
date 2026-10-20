"use client";
import { useCallback, useEffect, useRef, useState } from "react";
/** One elapsed-time clock drives both the visual guide and Web Audio look-ahead scheduler. */
export function useTransport(bpm: number, sound: boolean, meter = 4) {
  const [running, setRunning] = useState(false),
    [elapsed, setElapsed] = useState(0),
    [audioError, setAudioError] = useState(false);
  const accumulated = useRef(0),
    epoch = useRef(0),
    audio = useRef<AudioContext | null>(null),
    soundRef = useRef(sound),
    nodes = useRef(new Set<OscillatorNode>()),
    alive = useRef(true),
    starting = useRef(false);
  soundRef.current = sound;
  const pause = useCallback(() => {
    if (epoch.current) {
      accumulated.current += performance.now() - epoch.current;
      epoch.current = 0;
      setElapsed(accumulated.current);
    }
    setRunning(false);
  }, []);
  const reset = useCallback(() => {
    setRunning(false);
    epoch.current = 0;
    accumulated.current = 0;
    setElapsed(0);
  }, []);
  const play = useCallback(async () => {
    if (starting.current || epoch.current) return;
    starting.current = true;
    try {
      if (!audio.current) audio.current = new AudioContext();
      await audio.current.resume();
      setAudioError(false);
    } catch {
      setAudioError(true);
    } finally {
      starting.current = false;
      if (alive.current) setRunning(true);
    }
  }, []);
  useEffect(() => {
    if (!running) return;
    epoch.current = performance.now();
    let raf = 0;
    const step = 60000 / bpm;
    let nextBeat = Math.ceil(accumulated.current / step);
    const frame = () => {
      setElapsed(accumulated.current + performance.now() - epoch.current);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const schedule = () => {
      const position = accumulated.current + performance.now() - epoch.current;
      while (nextBeat * step < position + 100) {
        const delay = nextBeat * step - position;
        if (
          soundRef.current &&
          audio.current &&
          audio.current.state === "running" &&
          delay >= -30
        ) {
          const ctx = audio.current;
          const at = ctx.currentTime + Math.max(0, delay / 1000);
          const osc = ctx.createOscillator(),
            gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = nextBeat % meter === 0 ? 1100 : 760;
          gain.gain.setValueAtTime(0, at);
          gain.gain.linearRampToValueAtTime(0.18, at + 0.002);
          gain.gain.exponentialRampToValueAtTime(0.001, at + 0.055);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(at);
          osc.stop(at + 0.06);
          nodes.current.add(osc);
          osc.onended = () => {
            nodes.current.delete(osc);
            osc.disconnect();
            gain.disconnect();
          };
        }
        nextBeat++;
      }
    };
    schedule();
    const timer = setInterval(schedule, 25);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
      for (const node of nodes.current) {
        try {
          node.stop();
        } catch {}
      }
      nodes.current.clear();
    };
  }, [running, bpm, meter]);
  useEffect(() => {
    const hide = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", hide);
    return () => document.removeEventListener("visibilitychange", hide);
  }, [pause]);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      audio.current?.close().catch(() => {});
      audio.current = null;
    };
  }, []);
  return { running, elapsed, play, pause, reset, audioError };
}
