import { MouseEvent as ReactMouseEvent } from "react";
import { useParticleStore } from "../../hooks/useParticleStore";
import { ParticleShape } from "../../types/particle.types";
import styles from "./Controls.module.css";

const particleShapes: ParticleShape[] = [
  "circle",
  "square",
  "star",
  "ring",
  "triangle",
  "orb",
];

const particlePresets = {
  default: {
    count: 1000,
    size: 0.1,
    speed: 0.5,
    spread: 2,
    color: "#ffffff",
    shape: "circle" as ParticleShape,
    opacity: 0.6,
  },
  sparkles: {
    count: 2000,
    size: 0.05,
    speed: 0.8,
    spread: 3,
    color: "#ffff00",
    shape: "star" as ParticleShape,
    opacity: 0.8,
  },
  matrix: {
    count: 5000,
    size: 0.03,
    speed: 0.3,
    spread: 4,
    color: "#00ff00",
    shape: "square" as ParticleShape,
    opacity: 0.5,
  },
};

interface ControlsProps {
  onInfoClick: () => void;
}

const Controls = ({ onInfoClick }: ControlsProps) => {
  const { count, size, speed, spread, color, shape, opacity, updateSettings } =
    useParticleStore();

  const handlePresetChange = (preset: keyof typeof particlePresets) => {
    updateSettings(particlePresets[preset]);
  };

  const handleInfoClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onInfoClick();
  };

  return (
    <div className={styles.controls}>
      <div className={styles.header}>
        <h3>Particle Controls</h3>
        <button className={styles.infoButton} onClick={handleInfoClick}>
          ℹ️
        </button>
      </div>
      <div className={styles.controlGroup}>
        <label>Presets</label>
        <select
          onChange={(e) =>
            handlePresetChange(e.target.value as keyof typeof particlePresets)
          }
          className={styles.select}
        >
          {Object.keys(particlePresets).map((preset) => (
            <option key={preset} value={preset}>
              {preset.charAt(0).toUpperCase() + preset.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.controlGroup}>
        <label>
          Particle Count
          <div className={styles.rangeContainer}>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={count}
              onChange={(e) =>
                updateSettings({ count: parseInt(e.target.value) })
              }
            />
            <span>{count}</span>
          </div>
        </label>
      </div>

      <div className={styles.controlGroup}>
        <label>
          Size
          <div className={styles.rangeContainer}>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={size}
              onChange={(e) =>
                updateSettings({ size: parseFloat(e.target.value) })
              }
            />
            <span>{size.toFixed(2)}</span>
          </div>
        </label>
      </div>

      <div className={styles.controlGroup}>
        <label>
          Speed
          <div className={styles.rangeContainer}>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) =>
                updateSettings({ speed: parseFloat(e.target.value) })
              }
            />
            <span>{speed.toFixed(1)}</span>
          </div>
        </label>
      </div>

      <div className={styles.controlGroup}>
        <label>
          Spread
          <div className={styles.rangeContainer}>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={spread}
              onChange={(e) =>
                updateSettings({ spread: parseFloat(e.target.value) })
              }
            />
            <span>{spread.toFixed(1)}</span>
          </div>
        </label>
      </div>

      <div className={styles.controlGroup}>
        <label>
          Opacity
          <div className={styles.rangeContainer}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) =>
                updateSettings({ opacity: parseFloat(e.target.value) })
              }
            />
            <span>{opacity.toFixed(1)}</span>
          </div>
        </label>
      </div>

      <div className={styles.controlGroup}>
        <label>
          Color
          <div className={styles.colorContainer}>
            <input
              type="color"
              value={color}
              onChange={(e) => updateSettings({ color: e.target.value })}
            />
            <span>{color}</span>
          </div>
        </label>
      </div>

      <div className={styles.controlGroup}>
        <label>Shape</label>
        <div className={styles.shapeGrid}>
          {particleShapes.map((shapeOption) => (
            <button
              key={shapeOption}
              className={`${styles.shapeButton} ${
                shape === shapeOption ? styles.selected : ""
              }`}
              onClick={() => updateSettings({ shape: shapeOption })}
            >
              {shapeOption.charAt(0).toUpperCase() + shapeOption.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls;
