import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uImg;
  uniform vec3 uTint;

  // cover-fit the texture to the viewport (object-fit: cover)
  vec2 coverUv(vec2 uv, vec2 res, vec2 img) {
    float rRes = res.x / res.y;
    float rImg = img.x / img.y;
    vec2 scale = rRes > rImg ? vec2(1.0, rImg / rRes) : vec2(rRes / rImg, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    // flowing ripple, intensifying toward the bottom (the "water line")
    float depth = smoothstep(0.6, 0.0, vUv.y);
    float w = sin(vUv.x * 24.0 + uTime * 1.1) * 0.0035
            + sin(vUv.y * 32.0 - uTime * 0.8) * 0.0035;

    vec2 uv = coverUv(vUv, uRes, uImg);
    uv += w * (0.35 + depth * 1.7);
    vec3 col = texture2D(uTex, uv).rgb;

    // reflective water surface across the bottom third
    if (vUv.y < 0.32) {
      vec2 ruv = coverUv(vec2(vUv.x, 0.64 - vUv.y), uRes, uImg);
      ruv += w * 2.2;
      vec3 refl = texture2D(uTex, ruv).rgb;
      float m = smoothstep(0.32, 0.0, vUv.y);
      col = mix(col, mix(refl, uTint, 0.22), m * 0.85);
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

function WaterPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const tex = useTexture('/photos/m21723694-tse53-01.jpg');
  tex.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(() => {
    const img = tex.image as { width?: number; height?: number } | undefined;
    return {
      uTex: { value: tex },
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uImg: { value: new THREE.Vector2(img?.width ?? 16, img?.height ?? 9) },
      uTint: { value: new THREE.Color('#3E5763') },
    };
  }, [tex]);

  useFrame((state) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    mat.current.uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function RiverWater() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true }} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={null}>
        <WaterPlane />
      </Suspense>
    </Canvas>
  );
}
