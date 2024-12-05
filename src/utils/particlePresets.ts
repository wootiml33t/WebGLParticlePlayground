import { ParticleShape } from "../types/particle.types";

export const particlePresets = {
  sparkles: {
    shape: "star" as ParticleShape,
    count: 1000,
    size: 0.1,
    speed: 0.3,
    spread: 2,
    color: "#ffff00",
    opacity: 0.8,
  },
  snow: {
    shape: "circle" as ParticleShape,
    count: 2000,
    size: 0.05,
    speed: 0.1,
    spread: 3,
    color: "#ffffff",
    opacity: 0.6,
  },
};
