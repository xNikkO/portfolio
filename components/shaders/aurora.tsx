"use client";

// Adapted from the React Bits Aurora source supplied for this portfolio.
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./aurora.css";

export type AuroraProps = {
  colorStops?: [string, string, string];
  speed?: number;
  amplitude?: number;
  blend?: number;
  lightMode?: boolean;
};

const DEFAULT_COLORS: [string, string, string] = ["#5227FF", "#7cff67", "#5227FF"];

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;
out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                 + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  // The original three-stop ramp, with its middle stop at 0.5.
  vec3 rampColor = uv.x < 0.5
    ? mix(uColorStops[0], uColorStops[1], uv.x * 2.0)
    : mix(uColorStops[1], uColorStops[2], (uv.x - 0.5) * 2.0);
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = uv.y * 2.0 - height + 0.2;
  float intensity = 0.6 * height;
  float midPoint = 0.20;
  float blend = max(uBlend, 0.001);
  float auroraAlpha = smoothstep(midPoint - blend * 0.5, midPoint + blend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;
  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);
    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);
    vec3 chroma = pow(clamp(rampColor, 0.0, 1.0), vec3(1.2));
    float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
    float chromaMin = min(chroma.r, min(chroma.g, chroma.b));
    // Preserve neutral shades; normalizing gray to white would hide the effect.
    if (chromaPeak - chromaMin > 0.001) {
      chroma /= max(chromaPeak, 0.0001);
    }
    fragColor = vec4(mix(vec3(1.0), chroma, min(coverage * 1.08, 0.94)), 1.0);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`;

export default function Aurora({
  colorStops = DEFAULT_COLORS,
  speed = 1,
  amplitude = 1,
  blend = 0.5,
  lightMode = false,
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<{
    program: Program;
    render: () => void;
    updatePlayback: () => void;
    speed: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: true })) return;
    const renderer = new Renderer({
      canvas,
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const geometry = new Triangle(gl);
    delete geometry.attributes.uv;
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: 1 },
        uColorStops: { value: [new Color("#707070"), new Color("#e5e5e5"), new Color("#707070")] },
        uResolution: { value: [1, 1] },
        uBlend: { value: 0.5 },
        uLightMode: { value: 0 },
      },
    });
    program.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(canvas);
    const render = () => {
      renderer.render({ scene: mesh });
      container.dataset.rendered = "true";
    };
    const resize = () => {
      renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight));
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    let raf = 0;
    let isVisible = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const startedAt = performance.now();
    const loop = (time: number) => {
      program.uniforms.uTime.value = (time - startedAt) * 0.001 * (contextRef.current?.speed ?? 1);
      render();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const updatePlayback = () => {
      if (isVisible && !document.hidden && !reducedMotion.matches && contextRef.current?.speed !== 0) {
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        stop();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      updatePlayback();
    });
    observer.observe(container);
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    contextRef.current = { program, render, updatePlayback, speed: 1 };
    resize();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
      contextRef.current = null;
      geometry.remove();
      program.remove();
      canvas.remove();
      delete container.dataset.rendered;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;
    const uniforms = context.program.uniforms;
    uniforms.uAmplitude.value = amplitude;
    uniforms.uBlend.value = blend;
    uniforms.uColorStops.value = colorStops.map((hex) => new Color(hex));
    uniforms.uLightMode.value = lightMode ? 1 : 0;
    context.speed = speed;
    context.render();
    context.updatePlayback();
  }, [amplitude, blend, colorStops, lightMode, speed]);

  return <div ref={containerRef} aria-hidden="true" className="aurora-container" />;
}
