export interface ParticleSettings {
  count: number;
  size: number;
  speed: number;
  spread: number;
  color: string;
  opacity: number;
  useChunking: boolean;
  chunkSize: number;
  useBlending: boolean;
  shape: ParticleShape;
  texture?: string;
}

export type ParticleShape =
  | "circle"
  | "square"
  | "star"
  | "ring"
  | "triangle"
  | "orb";

export interface ParticleState extends ParticleSettings {
  updateSettings: (settings: Partial<ParticleSettings>) => void;
}
