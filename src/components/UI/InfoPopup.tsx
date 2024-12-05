import React, { useEffect } from "react";
import styles from "./InfoPopup.module.css";
import ReactMarkdown from "react-markdown";

const particleTheory = `
# Particle System Implementation

## 1. Core Components

### 1.1 Particle Properties
\`\`\`typescript
interface ParticleSettings {
  count: number;    // Number of particles
  size: number;     // Particle size
  speed: number;    // Movement speed
  spread: number;   // Distribution area
  color: string;    // Particle color
  shape: string;    // Particle shape
  opacity: number;  // Transparency
}
\`\`\`

### 1.2 Distribution Patterns
\`\`\`typescript
// Spherical Distribution
const theta = Math.random() * Math.PI * 2;
const phi = Math.random() * Math.PI;
const r = Math.cbrt(Math.random()) * spread;
x = r * Math.sin(phi) * Math.cos(theta);
y = r * Math.sin(phi) * Math.sin(theta);
z = r * Math.cos(phi);
\`\`\`

## 2. Memory Management

### 2.1 Efficient Arrays
\`\`\`typescript
// Use TypedArrays for better performance
const positions = new Float32Array(count * 3);
const velocities = new Float32Array(count * 3);
\`\`\`

### 2.2 Three.js Integration
\`\`\`typescript
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', 
  new THREE.Float32BufferAttribute(positions, 3)
);
\`\`\`

## 3. Animation System

### 3.1 Particle Movement
\`\`\`typescript
// Update positions based on velocity
positions[i3] += velocities[i3];
positions[i3 + 1] += velocities[i3 + 1];
positions[i3 + 2] += velocities[i3 + 2];
\`\`\`

### 3.2 Boundary Handling
\`\`\`typescript
// Bounce off boundaries
if (Math.abs(positions[i3]) > spread) {
  positions[i3] = Math.sign(positions[i3]) * spread;
  velocities[i3] *= -1;
}
\`\`\`

## 4. Performance Optimization

### 4.1 Chunk Processing
\`\`\`typescript
const chunkSize = 1000;
const chunks = Math.ceil(count / chunkSize);

for (let chunk = 0; chunk < chunks; chunk++) {
  const start = chunk * chunkSize;
  const end = Math.min(start + chunkSize, count);
  // Process particles...
}
\`\`\`

### 4.2 Material Settings
\`\`\`typescript
const material = new THREE.PointsMaterial({
  size,
  transparent: true,
  opacity,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true
});
\`\`\`

## 5. User Controls

### 5.1 Interactive Parameters
- Particle Count
- Particle Size
- Movement Speed
- Distribution Spread
- Color
- Opacity
- Shape Selection

### 5.2 Real-time Updates
\`\`\`typescript
const updateSettings = (newSettings: Partial<ParticleSettings>) => {
  set((state) => ({ ...state, ...newSettings }));
};
\`\`\`
`;

interface InfoPopupProps {
  onClose: () => void;
}

const InfoPopup = ({ onClose }: InfoPopupProps) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent scroll on body when popup is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className={styles.content}>
          <ReactMarkdown>{particleTheory}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
