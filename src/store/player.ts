import { ITrack } from "@repo/types/track";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PlayerState {
  activeTrack: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  setActiveTrack: (track: ITrack) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setVolume: (volume: number) => void;
}

export const usePlayer = create<PlayerState>()(
  persist(
    (set) => ({
      activeTrack: null,
      volume: 50,
      duration: 0,
      currentTime: 0,
      isPlaying: false,
      play: () => set({ isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      setActiveTrack: (track: ITrack) =>
        set({ activeTrack: track, currentTime: 0, duration: 0 }),
      setDuration: (duration: number) => set({ duration }),
      setCurrentTime: (currentTime: number) => set({ currentTime }),
      setVolume: (volume: number) => set({ volume }),
    }),
    {
      name: "active-track-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
