import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { HeroCanvas } from '@/components/ui/HeroCanvas';

/**
 * Generates a realistic woven boxing-ring canvas texture + bump map procedurally.
 */
function createCanvasMatTextures() {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d')!;

  // Deep matte navy-charcoal canvas base
  ctx.fillStyle = '#0A1120';
  ctx.fillRect(0, 0, size, size);

  // Subtle woven fabric grain
  for (let y = 0; y < size; y += 2) {
    ctx.fillStyle = y % 4 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.12)';
    ctx.fillRect(0, y, size, 1);
  }
  for (let x = 0; x < size; x += 2) {
    ctx.fillStyle = x % 4 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.08)';
    ctx.fillRect(x, 0, 1, size);
  }

  // Painted ring lines (brighter gold outer border & emerald center ring circle)
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
  ctx.lineWidth = 5;
  ctx.strokeRect(26, 26, size - 52, size - 52);

  ctx.strokeStyle = 'rgba(0, 229, 153, 0.36)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 112, 0, Math.PI * 2);
  ctx.stroke();

  const colorTex = new THREE.CanvasTexture(colorCanvas);
  colorTex.anisotropy = 8;

  return colorTex;
}

/**
 * Creates a realistic catenary-sagging rope geometry between two 3D points.
 */
function createSaggingRope(
  start: [number, number, number],
  end: [number, number, number],
  sag = 0.045,
  radius = 0.032
) {
  const p0 = new THREE.Vector3(...start);
  const p2 = new THREE.Vector3(...end);
  const mid = new THREE.Vector3().addVectors(p0, p2).multiplyScalar(0.5);
  mid.y -= sag;

  const curve = new THREE.CatmullRomCurve3([p0, mid, p2]);
  return new THREE.TubeGeometry(curve, 32, radius, 12, false);
}

function RealisticBoxingArena({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const cameraRig = useRef<THREE.Group>(null);
  const matTexture = useMemo(() => createCanvasMatTextures(), []);

  const ringHalf = 5.4;
  const ropeLevels = [0.65, 1.15, 1.65];

  // 4 sides of catenary ropes across 3 vertical levels
  const ropeGeometries = useMemo(() => {
    const corners: Array<[number, number]> = [
      [-ringHalf, -ringHalf],
      [ringHalf, -ringHalf],
      [ringHalf, ringHalf],
      [-ringHalf, ringHalf],
    ];
    const items: Array<{ geo: THREE.TubeGeometry; levelIdx: number }> = [];

    ropeLevels.forEach((y, levelIdx) => {
      for (let i = 0; i < 4; i++) {
        const [x1, z1] = corners[i];
        const [x2, z2] = corners[(i + 1) % 4];
        // Pull slightly inside post radius for turnbuckle attachment
        const inset = 0.94;
        items.push({
          geo: createSaggingRope(
            [x1 * inset, y, z1 * inset],
            [x2 * inset, y, z2 * inset],
            0.055,
            0.034
          ),
          levelIdx,
        });
      }
    });
    return items;
  }, []);

  useFrame(({ camera }, delta) => {
    const targetX = mouseRef.current.x * 0.65;
    const targetY = 2.05 + mouseRef.current.y * 0.25;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2.2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2.2);
    camera.lookAt(0, 1.05, 0);
  });

  const postCoords: Array<[number, number, string]> = [
    [-ringHalf, -ringHalf, '#0B1B3D'],
    [ringHalf, -ringHalf, '#054E3E'],
    [ringHalf, ringHalf, '#0B1B3D'],
    [-ringHalf, ringHalf, '#8A6914'],
  ];

  return (
    <group ref={cameraRig}>
      {/* Arena Floor Void */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#030407" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Ring Apron & Steel Skirt */}
      <mesh position={[0, -0.58, 0]}>
        <boxGeometry args={[ringHalf * 2 + 1.2, 1.15, ringHalf * 2 + 1.2]} />
        <meshStandardMaterial color="#050811" roughness={0.85} metalness={0.25} />
      </mesh>

      {/* Gold Apron Trim Strip */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[ringHalf * 2 + 1.24, 0.05, ringHalf * 2 + 1.24]} />
        <meshStandardMaterial color="#9E7817" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Woven Canvas Ring Mat */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[ringHalf * 2 + 0.8, 0.08, ringHalf * 2 + 0.8]} />
        <meshStandardMaterial
          map={matTexture}
          roughness={0.92}
          metalness={0.04}
        />
      </mesh>

      {/* 4 Corner Steel Posts + Padded Turnbuckles */}
      {postCoords.map(([x, z, padColor], idx) => (
        <group key={idx} position={[x, 0, z]}>
          {/* Brushed Steel Post */}
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.1, 0.11, 2.05, 20]} />
            <meshStandardMaterial color="#384152" metalness={0.88} roughness={0.28} />
          </mesh>
          {/* Corner Pad */}
          <mesh position={[0, 1.15, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 1.28, 20]} />
            <meshStandardMaterial color={padColor} roughness={0.55} metalness={0.12} />
          </mesh>
          {/* Antique Gold Post Cap */}
          <mesh position={[0, 2.05, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 20]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.22} />
          </mesh>
        </group>
      ))}

      {/* Realistic Black Competition Ring Ropes */}
      {ropeGeometries.map(({ geo }, idx) => (
        <mesh key={idx} geometry={geo}>
          <meshStandardMaterial
            color="#0D0E12"
            roughness={0.42}
            metalness={0.28}
          />
        </mesh>
      ))}

      {/* Overhead Arena Lighting Rig Truss */}
      <group position={[0, 6.2, 0]}>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[4.4, 0.055, 8, 4]} />
          <meshStandardMaterial color="#334155" metalness={0.88} roughness={0.28} />
        </mesh>
      </group>

      {/* Subtle Volumetric-Style Arena Light Shafts */}
      <mesh position={[0, 3.1, 0]}>
        <coneGeometry args={[6.8, 6.5, 32, 1, true]} />
        <meshBasicMaterial
          color="#00E599"
          transparent
          opacity={0.035}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[3.8, 6.4, 32, 1, true]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export const HeroRing3D: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0 });

  if (prefersReducedMotion) {
    return <HeroCanvas />;
  }

  return (
    <div
      aria-hidden="true"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }}
      className="pointer-events-auto absolute inset-0 z-0"
    >
      <Suspense fallback={<HeroCanvas />}>
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [0, 2.05, 8.6], fov: 48 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#050507']} />
          <fog attach="fog" args={['#050507', 11, 27]} />

          {/* Arena Key Spotlights (Classy, Moody & Balanced) */}
          <ambientLight intensity={0.42} color="#CBD5E1" />
          <spotLight
            position={[0, 8.5, 1]}
            angle={0.8}
            penumbra={0.85}
            intensity={95}
            color="#FFF7DF"
          />
          <pointLight position={[-5.5, 2.8, -4]} intensity={16} color="#00E599" />
          <pointLight position={[5.5, 2.8, 4]} intensity={16} color="#D4AF37" />

          <RealisticBoxingArena mouseRef={mouseRef} />

          {/* Minimal Ring-Chalk Dust Motes */}
          <Sparkles
            count={20}
            scale={[11, 5, 11]}
            size={1.2}
            speed={0.2}
            opacity={0.3}
            color="#F3DC86"
          />
        </Canvas>
      </Suspense>

      {/* Balanced Radial Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(5,5,7,0.38) 0%, rgba(5,5,7,0.65) 60%, rgba(5,5,7,0.92) 100%)',
        }}
      />
    </div>
  );
};
