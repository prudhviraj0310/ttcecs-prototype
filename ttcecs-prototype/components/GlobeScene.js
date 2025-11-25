// components/GlobeScene.js
'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Sphere, useTexture } from '@react-three/drei';
import { Suspense, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat, lng, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Real coordinates for Tamil Nadu branches
const BRANCH_LOCATIONS = [
  { name: 'Anna Nagar (HQ)', members: '50,000+', lat: 13.0878, lng: 80.2086 },
  { name: 'T Nagar', members: '25,000+', lat: 13.0418, lng: 80.2341 },
  { name: 'Kilambakkam', members: '15,000+', lat: 12.7945, lng: 80.0839 },
  { name: 'Nanganallur', members: '12,000+', lat: 12.9850, lng: 80.1927 },
  { name: 'Coimbatore', members: '18,000+', lat: 11.0168, lng: 76.9558 },
  { name: 'Nagercoil', members: '5,000+', lat: 8.1790, lng: 77.4337 },
];

// Enhanced camera controller with smooth arc zoom
function CameraController({ activePin, controlsRef }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!activePin) {
      return;
    }

    const controls = controlsRef.current;
    if (!controls) {
      console.log('Controls not ready');
      return;
    }

    console.log('🎯 Zooming to:', activePin.name);

    const location = BRANCH_LOCATIONS.find(loc => loc.name === activePin.name);
    if (!location) {
      console.log('❌ Location not found');
      return;
    }

    // Store original state
    const originalAutoRotate = controls.autoRotate;

    // Stop auto-rotation during zoom
    controls.autoRotate = false;
    controls.enableDamping = false;

    const targetPos = latLngToVector3(location.lat, location.lng, 2);
    const distance = 0.5; // Balanced zoom - shows city without overlap
    const cameraPos = targetPos.clone().normalize().multiplyScalar(2 + distance);

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const startTime = Date.now();
    const duration = 1500; // Faster zoom

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeInOutCubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Smooth interpolation
      camera.position.lerpVectors(startPos, cameraPos, eased);
      controls.target.lerpVectors(startTarget, targetPos, eased);
      controls.update();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        controls.enableDamping = true;
        console.log('✅ Zoom complete to', activePin.name);
      }
    };

    animate();

    return () => {
      controls.autoRotate = originalAutoRotate;
    };
  }, [activePin, camera, controlsRef]);

  return null;
}

// Particle ring effect for active marker
function ParticleRing({ position, isActive }) {
  const particlesRef = useRef();

  const positions = useMemo(() => {
    const particleCount = 30;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.3;
      posArray[i * 3] = Math.cos(angle) * radius;
      posArray[i * 3 + 1] = 0;
      posArray[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return posArray;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current || !isActive) return;
    particlesRef.current.rotation.y += 0.02;
    particlesRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  if (!isActive) return null;

  return (
    <group position={position} ref={particlesRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={30}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00ff88"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Enhanced location pin with clean design
function LocationPin({ lat, lng, name, members, onClick, isActive }) {
  const meshRef = useRef();
  const position = useMemo(() => latLngToVector3(lat, lng), [lat, lng]);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const scale = 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position.toArray()} onClick={onClick}>
      {/* Simple pin marker - no excessive glow */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#00cc77" : "#ff4466"}
          emissive={isActive ? "#00cc77" : "#ff4466"}
          emissiveIntensity={0.3}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Simple vertical beam */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.24, 8]} />
        <meshStandardMaterial
          color={isActive ? "#00cc77" : "#ff4466"}
          emissive={isActive ? "#00cc77" : "#ff4466"}
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Particle ring only for active marker */}
      {isActive && <ParticleRing position={[0, 0, 0]} isActive={isActive} />}

      {/* Label - Only show if active */}
      <Html position={[0, 0.3, 0]} center distanceFactor={1.2} style={{ pointerEvents: 'none', userSelect: 'none', display: isActive ? 'block' : 'none' }}>
        <div
          className="px-3 py-2 rounded-lg backdrop-blur-md bg-green-500/90 text-white"
          style={{
            fontSize: '12px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          {name}
          <div style={{ fontSize: '10px', opacity: 0.9, fontWeight: '500', marginTop: '2px' }}>
            {members} members
          </div>
        </div>
      </Html>
    </group>
  );
}

// Realistic Earth globe with textures - Fixed version
function EarthGlobe({ onPinClick, activePin }) {
  const globeRef = useRef();
  const atmosphereRef = useRef();

  // Load textures safely
  const textures = useTexture({
    map: 'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
    bumpMap: 'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png',
    specularMap: 'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png',
  },
    // Error callback
    (error) => {
      console.warn('Failed to load Earth textures:', error);
    });

  useFrame((state) => {
    if (globeRef.current && !activePin) {
      globeRef.current.rotation.y += 0.0008;
    }

    if (atmosphereRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
      atmosphereRef.current.scale.setScalar(scale);
    }
  });

  const indiaPosition = useMemo(() => latLngToVector3(20, 78, 2.05).toArray(), []);

  return (
    <group ref={globeRef}>
      <Sphere args={[2, 128, 128]}>
        <meshStandardMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          bumpScale={0.05}
          metalness={0.1}
          roughness={0.7}
        />
      </Sphere>

      <Sphere args={[2.15, 64, 64]} ref={atmosphereRef}>
        <meshPhongMaterial
          color="#4fc3f7"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          shininess={100}
        />
      </Sphere>

      <Sphere args={[2.08, 64, 64]}>
        <meshBasicMaterial
          color="#81d4fa"
          transparent
          opacity={0.08}
          side={THREE.FrontSide}
        />
      </Sphere>

      <mesh position={indiaPosition}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={activePin ? 0.25 : 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {BRANCH_LOCATIONS.map((loc) => (
        <LocationPin
          key={loc.name}
          lat={loc.lat}
          lng={loc.lng}
          name={loc.name}
          members={loc.members}
          onClick={() => onPinClick(loc)}
          isActive={activePin?.name === loc.name}
        />
      ))}

      <Stars radius={200} depth={100} count={12000} factor={6} saturation={0} fade speed={0.5} />
    </group>
  );
}

export default function GlobeScene({ onPinClick, activePin }) {
  const controlsRef = useRef();

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#b3e5fc" />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#0d47a1"
          intensity={0.5}
        />

        <EarthGlobe onPinClick={onPinClick} activePin={activePin} />

        <CameraController activePin={activePin} controlsRef={controlsRef} />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={2.4}
          maxDistance={15}
          autoRotate={!activePin}
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
}
