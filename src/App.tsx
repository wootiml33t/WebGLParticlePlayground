import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "./components/ParticleSystem/Particles";
import Controls from "./components/ParticleSystem/Controls";
import InfoPopup from "./components/UI/InfoPopup";

function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <color attach="background" args={["#000000"]} />
        <OrbitControls />
        <Particles />
      </Canvas>
      <Controls onInfoClick={() => setShowInfo(true)} />
      {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}
    </div>
  );
}

export default App;
