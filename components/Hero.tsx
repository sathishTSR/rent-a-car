"use client";
import Image from "next/image";
import CustomButton from "./CustomButton";
import bgImage from "@/public/hero.png";
import { Canvas } from "@react-three/fiber";
import {
  Gltf,
  OrbitControls,
  Stage,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";

const Hero = () => {
  let handleScroll = () => {};
  const group = useRef();

  const PlayAnimation = () => {
    const { scene, animations } = useGLTF("/loading_animation.glb", true);
    const { actions, mixer } = useAnimations(animations, group);
    const [viewModel, setViewModel] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setViewModel(true);
      }, 3000);
      const clips = animations;
      clips.forEach(function (clip) {
        mixer.clipAction(clip).play();
      });
    }, [mixer]);

    return (
      // <Suspense
      //   fallback={<primitive ref={group} object={scene} dispose={null} />}
      // >
      <>
        {!viewModel && <primitive position={[-2,0,-10]} ref={group} object={scene} dispose={null} />}
        {viewModel && (
          <>
            <Stage
              adjustCamera={1.1}
              intensity={0.5}
              // center={{ precise: true }}
            >
              {/* <Gltf src="/rolls_royce_ghost.glb" receiveShadow castShadow /> */}
              <Gltf src="/lamborghini_aventador.glb" receiveShadow castShadow />
            </Stage>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              makeDefault
            />
          </>
        )}
      </>
      // </Suspense>
    );
  };
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">Elevate your journey with elegance</h1>
        <p className="hero__subtitle">
          Unleash the Extraordinary: Where Dreams Drive Reality
        </p>
        <CustomButton
          title="Explore"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Canvas >
            <PlayAnimation />
          </Canvas>
        </div>
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
