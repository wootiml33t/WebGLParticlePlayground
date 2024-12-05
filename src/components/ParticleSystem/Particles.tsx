import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useParticleStore } from "../../hooks/useParticleStore";
import { generateParticleTexture } from "../../utils/particleTextures";
import { ParticleShape } from "../../types/particle.types";

const Particles = () => {
  const { count, size, speed, spread, color, shape, opacity } =
    useParticleStore();

  const points = useRef<THREE.Points>(null);

  // Generate particle texture based on shape
  const texture = useMemo(() => {
    return generateParticleTexture(shape, 64, color);
  }, [shape, color]);

  // Create positions and velocities
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x, y, z;

      switch (shape) {
        case "sphere" as ParticleShape: {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          const r = Math.cbrt(Math.random()) * spread;
          x = r * Math.sin(phi) * Math.cos(theta);
          y = r * Math.sin(phi) * Math.sin(theta);
          z = r * Math.cos(phi);
          break;
        }
        case "cube" as ParticleShape: {
          x = (Math.random() - 0.5) * spread;
          y = (Math.random() - 0.5) * spread;
          z = (Math.random() - 0.5) * spread;
          break;
        }
        default: {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * spread;
          x = r * Math.cos(angle);
          y = r * Math.sin(angle);
          z = (Math.random() - 0.5) * spread;
        }
      }

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }

    return [positions, velocities];
  }, [count, spread, speed, shape]);

  // Create geometry
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }, [positions]);

  // Create material
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size,
      map: texture,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      vertexColors: false,
    });
  }, [size, texture, opacity]);

  // Animation loop
  useFrame(() => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position
      .array as Float32Array;

    // Process particles in chunks for better performance
    const chunkSize = 1000;
    const chunks = Math.ceil(count / chunkSize);

    for (let chunk = 0; chunk < chunks; chunk++) {
      const start = chunk * chunkSize;
      const end = Math.min(start + chunkSize, count);

      for (let i = start; i < end; i++) {
        const i3 = i * 3;

        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary check with smooth transition
        if (Math.abs(positions[i3]) > spread) {
          positions[i3] = Math.sign(positions[i3]) * spread;
          velocities[i3] *= -1;
        }
        if (Math.abs(positions[i3 + 1]) > spread) {
          positions[i3 + 1] = Math.sign(positions[i3 + 1]) * spread;
          velocities[i3 + 1] *= -1;
        }
        if (Math.abs(positions[i3 + 2]) > spread) {
          positions[i3 + 2] = Math.sign(positions[i3 + 2]) * spread;
          velocities[i3 + 2] *= -1;
        }
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={points} geometry={geometry} material={material} />;
};

export default Particles;
