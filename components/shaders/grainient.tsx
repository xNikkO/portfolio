"use client";

// Adapted from the React Bits Grainient component supplied for this portfolio.
import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./grainient.css";

const defaults = {
  timeSpeed: 0.25,
  colorBalance: 0,
  warpStrength: 1,
  warpFrequency: 5,
  warpSpeed: 2,
  warpAmplitude: 50,
  blendAngle: 0,
  blendSoftness: 0.05,
  rotationAmount: 500,
  noiseScale: 2,
  grainAmount: 0.1,
  grainScale: 2,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1,
  saturation: 1,
  centerX: 0,
  centerY: 0,
  zoom: 0.9,
  color1: "#FF9FFC",
  color2: "#5227FF",
  color3: "#B497CF",
  lightMode: false,
};

export type GrainientProps = Partial<typeof defaults> & { className?: string };

function hexToRgb(hex: string): Float32Array {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return new Float32Array(
    result ? result.slice(1).map((value) => parseInt(value, 16) / 255) : [1, 1, 1]
  );
}

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uLightMode;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;
  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=max(uWarpAmplitude,0.001)/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);
  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  // Equivalent descending blend, with defined GLSL smoothstep edge ordering.
  vec3 col=mix(layer1,layer2,1.0-S(v1,v0,tuv.y));
  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  if(uLightMode>0.5){
    float energy=max(max(col.r,col.g),col.b);
    vec3 hue=col/max(energy,0.001);
    float chroma=length(col-vec3(dot(col,vec3(0.333333))));
    float coverage=clamp(0.12+chroma*1.15+energy*0.18,0.0,0.88);
    col=mix(vec3(1.0),clamp(hue*0.58+col*0.18,0.0,1.0),coverage);
  }
  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

function getUniformValues(props: GrainientProps) {
  const settings = { ...defaults, ...props };
  const values: Record<string, number | Float32Array> = {};
  for (const [key, value] of Object.entries(settings)) {
    if (typeof value === "number" || typeof value === "boolean") {
      values[`u${key.charAt(0).toUpperCase()}${key.slice(1)}`] = Number(value);
    }
  }
  values.uCenterOffset = new Float32Array([settings.centerX, settings.centerY]);
  values.uColor1 = hexToRgb(settings.color1);
  values.uColor2 = hexToRgb(settings.color2);
  values.uColor3 = hexToRgb(settings.color3);
  return values;
}

export default function Grainient(props: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<{
    program: Program;
    render: () => void;
    updatePlayback: () => void;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const canvas = document.createElement("canvas");
    // Keep the CSS gradient fallback when WebGL 2 is unavailable.
    if (!canvas.getContext("webgl2", { alpha: true, antialias: false })) return;
    const renderer = new Renderer({
      canvas,
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });
    const gl = renderer.gl;
    container.appendChild(canvas);
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        ...Object.fromEntries(
          Object.entries(getUniformValues({})).map(([key, value]) => [key, { value }])
        ),
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const render = () => renderer.render({ scene: mesh });
    const setSize = () => {
      renderer.setSize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight));
      program.uniforms.iResolution.value = new Float32Array([gl.drawingBufferWidth, gl.drawingBufferHeight]);
      render();
    };
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

    let raf = 0;
    let isVisible = false;
    let isPageVisible = !document.hidden;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const t0 = performance.now();
    const loop = (time: number) => {
      program.uniforms.iTime.value = (time - t0) * 0.001;
      render();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const updatePlayback = () => {
      if (isVisible && isPageVisible && !reducedMotion.matches && program.uniforms.uTimeSpeed.value !== 0) {
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        stop();
      }
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      updatePlayback();
    });
    intersectionObserver.observe(container);
    const onVisibility = () => {
      isPageVisible = !document.hidden;
      updatePlayback();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", updatePlayback);
    contextRef.current = { program, render, updatePlayback };
    setSize();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", updatePlayback);
      contextRef.current = null;
      geometry.remove();
      program.remove();
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // Uniform changes update the existing renderer, including while motion is paused.
  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;
    for (const [key, value] of Object.entries(getUniformValues(props))) {
      context.program.uniforms[key]!.value = value;
    }
    context.render();
    context.updatePlayback();
  }, [props]);

  return <div ref={containerRef} aria-hidden="true" className={`grainient-container ${props.className ?? ""}`.trim()} />;
}
