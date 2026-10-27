
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, ContactShadows } from "@react-three/drei";
import { useState } from "react";

function Room({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function House() {
  const wall = "#eee9dd";
  const floor = "#b9a58a";

  return (
    <group>
      {/* Main floor */}
      <Room
        position={[0, -0.12, 0]}
        size={[8, 0.24, 6]}
        color={floor}
      />

      {/* Back wall */}
      <Room
        position={[0, 1.4, -2.9]}
        size={[8, 2.8, 0.2]}
        color={wall}
      />

      {/* Left wall */}
      <Room
        position={[-3.9, 1.4, 0]}
        size={[0.2, 2.8, 6]}
        color={wall}
      />

      {/* Right wall */}
      <Room
        position={[3.9, 1.4, 0]}
        size={[0.2, 2.8, 6]}
        color={wall}
      />

      {/* Front wall sections leave an entrance gap */}
      <Room
        position={[-2.6, 1.4, 2.9]}
        size={[2.8, 2.8, 0.2]}
        color={wall}
      />
      <Room
        position={[2.6, 1.4, 2.9]}
        size={[2.8, 2.8, 0.2]}
        color={wall}
      />

      {/* Interior divider walls */}
      <Room
        position={[0, 1.4, -1]}
        size={[0.14, 2.8, 3.8]}
        color="#d6cbb9"
      />
      <Room
        position={[1.9, 1.4, 1]}
        size={[4, 2.8, 0.14]}
        color="#d6cbb9"
      />

      {/* Simple furniture */}
      <Room
        position={[-1.7, 0.35, 1]}
        size={[1.8, 0.7, 1]}
        color="#68816b"
      />
      <Room
        position={[2.5, 0.25, -1.8]}
        size={[1.4, 0.5, 1.4]}
        color="#e0d4c2"
      />
      <Room
        position={[-2.7, 0.4, -1.7]}
        size={[1.2, 0.8, 1.4]}
        color="#9c765c"
      />
    </group>
  );
}

export default function ThreeDPage() {
  const [showGrid, setShowGrid] = useState(true);

  return (
    <main className="min-h-screen bg-[#f5f4f0] text-[#252820]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-5 py-4 md:px-8">
        <div>
          <a href="/" className="text-xl font-bold">
            Formspace<span className="text-emerald-700">.</span>
          </a>
          <p className="text-xs text-gray-500">3D HOME DESIGNER</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="rounded-xl border px-4 py-2 text-sm"
          >
            {showGrid ? "Hide grid" : "Show grid"}
          </button>
          <a
            href="/editor"
            className="rounded-xl bg-emerald-800 px-4 py-2 text-sm text-white"
          >
            2D Editor
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl p-4 md:p-8">
        <h1 className="text-3xl font-semibold">Explore your home in 3D</h1>
        <p className="mt-2 text-gray-600">
          Drag to rotate · Scroll to zoom · Right-click to pan
        </p>

        <div className="mt-6 h-[65vh] min-h-[420px] overflow-hidden rounded-3xl border bg-[#e8e8df] shadow-sm">
          <Canvas
            shadows
            camera={{ position: [10, 9, 11], fov: 45 }}
          >
            <color attach="background" args={["#e8e8df"]} />
            <ambientLight intensity={1.4} />
            <directionalLight
              position={[8, 12, 6]}
              intensity={2}
              castShadow
            />

            <House />

            {showGrid && (
              <Grid
                position={[0, -0.26, 0]}
                args={[30, 30]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#a3a99d"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#71816f"
                fadeDistance={30}
                infiniteGrid
              />
            )}

            <ContactShadows
              position={[0, -0.25, 0]}
              opacity={0.35}
              scale={18}
              blur={2}
            />

            <OrbitControls
              makeDefault
              minDistance={6}
              maxDistance={24}
              maxPolarAngle={Math.PI / 2.05}
            />
          </Canvas>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-sm text-gray-500">Design mode</p>
            <p className="mt-1 font-semibold">3D Preview</p>
          </div>
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-sm text-gray-500">Structure</p>
            <p className="mt-1 font-semibold">Walls & floor</p>
          </div>
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-sm text-gray-500">Controls</p>
            <p className="mt-1 font-semibold">Rotate & zoom</p>
          </div>
        </div>
      </section>
    </main>
  );
}
