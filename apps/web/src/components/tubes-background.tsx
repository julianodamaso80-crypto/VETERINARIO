'use client';

import React, { useEffect, useRef } from 'react';

export interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
  colors?: string[];
  lightColors?: string[];
}

const TUBES_CDN_URL =
  'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';

const randomColors = (n: number) =>
  new Array(n)
    .fill(0)
    .map(
      () =>
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
    );

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
  colors = ['#FF4D00', '#FFFFFF', '#FF8A2E'],
  lightColors = ['#FF4D00', '#FFB703', '#FF8A2E', '#FFFFFF'],
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const initTubes = async () => {
      if (!canvasRef.current) return;
      try {
        const dynamicImport = new Function('u', 'return import(u)');
        const mod: any = await dynamicImport(TUBES_CDN_URL);
        const TubesCursor = mod.default;
        if (!mounted || !canvasRef.current) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors,
            lights: { intensity: 200, colors: lightColors },
          },
        });
        tubesRef.current = app;
      } catch (e) {
        console.error('[TubesBackground] failed to load', e);
      }
    };

    initTubes();

    return () => {
      mounted = false;
    };
  }, [colors, lightColors]);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    try {
      tubesRef.current.tubes.setColors(randomColors(3));
      tubesRef.current.tubes.setLightsColors(randomColors(4));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className || ''}`}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

export default TubesBackground;
