import { create } from "zustand";
import { ParticleState, ParticleSettings } from "../types/particle.types";

const defaultSettings: ParticleSettings = {
  count: 1000,
  size: 0.1,
  speed: 0.5,
  spread: 1,
  color: "#ffffff",
  shape: "sphere",
  opacity: 0.6,
  useChunking: true,
  chunkSize: 1000,
  useBlending: true,
};

export const useParticleStore = create<ParticleState>((set) => ({
  ...defaultSettings,
  updateSettings: (newSettings) =>
    set((state) => ({ ...state, ...newSettings })),
}));
