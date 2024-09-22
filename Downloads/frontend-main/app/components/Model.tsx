'use client'
import React, { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

const Space = ({model,position,scale}:{model:string,position?:[number,number,number],scale?:[number,number,number]}) => {
  const group = useRef<Group>(null);
  const { nodes, animations, scene } = useGLTF(model);
  const { actions, names } = useAnimations(animations, scene);
console.log(actions)

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01; // Adjust the rotation speed as needed
    }
  });

  return (
    <group  ref={group} position={position||[0, -1, 0]} scale={scale||[1.5, 1.5, 1.5]}>
      <primitive object={scene} />
    </group>
  );
};

export default Space;

