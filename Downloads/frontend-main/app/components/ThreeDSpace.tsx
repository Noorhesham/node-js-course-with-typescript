"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useProgress, Html, OrbitControls } from "@react-three/drei";
import Space from "./Space";

function Loader() {
  const { progress } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function ThreeDSpace({ className }: { className?: string }) {
  return (
<div className={className}>
      <Canvas className="w-full mb-20 h-full">
        {/* <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} /> */}
        <Suspense fallback={<Loader />}>
          <directionalLight intensity={0.5} />
          <ambientLight intensity={0.3} />
          <pointLight intensity={0.5} />
          <hemisphereLight intensity={0.6} />
          <Space />
        </Suspense>
      </Canvas>
    </div>
  );
}
