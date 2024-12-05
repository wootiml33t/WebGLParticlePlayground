import * as THREE from "three";
import { ParticleShape } from "../types/particle.types";

export const generateParticleTexture = (
  shape: ParticleShape,
  size: number = 64,
  color: string = "#ffffff"
): THREE.Texture => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  const center = size / 2;
  const radius = size / 3;

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  switch (shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "square":
      ctx.fillRect(center - radius, center - radius, radius * 2, radius * 2);
      break;

    case "star":
      const spikes = 5;
      const outerRadius = radius;
      const innerRadius = radius / 2;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI * i) / spikes;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      break;

    case "ring":
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = size / 10;
      ctx.stroke();
      break;

    case "triangle":
      ctx.beginPath();
      ctx.moveTo(center, center - radius);
      ctx.lineTo(
        center + radius * Math.cos(Math.PI / 6),
        center + radius * Math.sin(Math.PI / 6)
      );
      ctx.lineTo(
        center - radius * Math.cos(Math.PI / 6),
        center + radius * Math.sin(Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
      break;
  }

  // Add glow effect
  const gradient = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    radius * 1.5
  );
  gradient.addColorStop(0, `${color}33`);
  gradient.addColorStop(1, "transparent");

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
};
