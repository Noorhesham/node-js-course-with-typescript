"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useProgress, Html, OrbitControls } from "@react-three/drei";
import Model from "./Model";

function Loader() {
  const { progress } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

const Model3d = ({
  className,
  model,
  position,
  scale,
}: {
  className?: string;
  model: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}) => {
  return (
    <div className={className}>
      <Canvas className="w-full    max-h-44  ">
        <OrbitControls enableZoom={true} enableRotate={true} enablePan={true} />

        <Suspense fallback={<Loader />}>
          <directionalLight intensity={0.5} />
          <ambientLight intensity={0.3} />
          <pointLight intensity={0.5} />
          <hemisphereLight intensity={0.6} />
          <Model scale={scale} position={position} model={model} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Model3d;
