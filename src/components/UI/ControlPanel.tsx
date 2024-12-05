import { useParticleStore } from "../../hooks/useParticleStore";

const ControlPanel = () => {
  const store = useParticleStore();

  return (
    <div className="control-panel">
      <h3>Particle Controls</h3>
      <div className="control-group">
        <label>
          Count:
          <input
            type="range"
            min="100"
            max="10000"
            value={store.count}
            onChange={(e) =>
              store.updateSettings({ count: parseInt(e.target.value) })
            }
          />
          {store.count}
        </label>
      </div>
      {/* Add similar controls for other parameters */}
    </div>
  );
};

export default ControlPanel;
