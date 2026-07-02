import React, { useEffect, useRef, useState } from 'react';
import forestsData from '@/data/forestsData.json';

// Dynamically import Globe to avoid SSR window errors
const Globe = React.lazy(() => import('react-globe.gl'));

// Helper to generate a circle path for latitudes (like Equator, Tropics)
const generateLatLine = (lat: number, points = 64) => {
  const line = [];
  for (let i = 0; i <= points; i++) {
    const lng = -180 + (i * 360) / points;
    line.push([lat, lng]);
  }
  return line;
};

// Helper for longitudinal line (Prime Meridian)
const generateLngLine = (lng: number, points = 64) => {
  const line = [];
  for (let i = 0; i <= points; i++) {
    const lat = -90 + (i * 180) / points;
    line.push([lat, lng]);
  }
  return line;
};

// --- DATA ---
const pathsData = [
  { name: 'Equator', coords: generateLatLine(0), color: 'rgba(255, 255, 255, 0.4)' },
  { name: 'Tropic of Cancer', coords: generateLatLine(23.5), color: 'rgba(255, 215, 0, 0.4)' }, // Gold
  { name: 'Tropic of Capricorn', coords: generateLatLine(-23.5), color: 'rgba(255, 215, 0, 0.4)' },
  { name: 'Prime Meridian', coords: generateLngLine(0), color: 'rgba(200, 200, 255, 0.4)' },
];

export function RealisticGlobe() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

  useEffect(() => {
    // Responsive sizing
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', updateSize);
    updateSize(); // Initial
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (globeRef.current) {
        const scene = globeRef.current.scene();
        if (scene) {
          // Initialize tilt if not set
          if (scene.rotation.z === 0) {
            scene.rotation.z = (23.5 * Math.PI) / 180;
          }
          // Manually rotate the scene to bypass OrbitControls autoRotate bugs (especially on mobile where it can get permanently paused)
          scene.rotation.y += 0.0015;
        }
        
        // Ensure OrbitControls autoRotate is disabled so it doesn't fight our manual rotation
        const controls = globeRef.current.controls();
        if (controls && controls.autoRotate) {
          controls.autoRotate = false;
        }
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="w-full flex flex-col relative">
      <div ref={containerRef} className="w-full h-[65vh] min-h-[450px] md:h-[75vh] md:min-h-[800px] relative">
        <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center text-fog/50">Loading Globe...</div>}>
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            
            // Paths for Tropics, Equator
            pathsData={pathsData}
            pathPoints="coords"
            pathPointLat={p => p[0]}
            pathPointLng={p => p[1]}
            pathColor="color"
            pathDashAnimateTime={10000} // Invisible animation to keep render loop active
            pathStroke={2}
            
            // Labels for forests
            labelsData={forestsData}
            labelLat="lat"
            labelLng="lng"
            labelAltitude={(d: any) => d.alt || 0.01}
            labelDotRadius={(d: any) => d.size || 0.6}
            labelDotOrientation={() => 'bottom'}
            labelColor="color"
            labelText={() => ''}
            labelLabel={(d: any) => `
              <div style="background: rgba(10, 26, 16, 0.9); border: 1px solid rgba(201, 161, 59, 0.4); padding: 8px 14px; border-radius: 8px; color: #F0D87A; font-family: sans-serif; font-size: 13px; backdrop-filter: blur(4px);">
                ${d.name}
              </div>
            `}
            labelSize={0}
            labelResolution={2}
            labelIncludeDot={true}
            
            // Add atmospheric glow
            atmosphereColor="#3b82f6"
            atmosphereAltitude={0.25}
          />
        </React.Suspense>
      </div>
      
      {/* Legend & Credits Overlay */}
      <div className="relative md:absolute md:bottom-8 md:left-8 mt-4 md:mt-0 mx-4 md:mx-0 mb-4 md:mb-0 p-4 md:p-6 glass-card rounded-2xl border border-white/[0.06] backdrop-blur-md bg-ink/60 md:max-w-sm pointer-events-none z-10">
        <h3 className="text-sm font-display uppercase tracking-widest text-gold mb-4">Global Biomes</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-fog/80">
            <span className="w-3 h-3 rounded-full bg-[#4ade80]" style={{ boxShadow: '0 0 10px #4ade80' }}></span>
            Tropical & Subtropical Forests
          </li>
          <li className="flex items-center gap-3 text-sm text-fog/80">
            <span className="w-3 h-3 rounded-full bg-[#22c55e]" style={{ boxShadow: '0 0 10px #22c55e' }}></span>
            Temperate & Boreal Forests
          </li>
          <li className="flex items-center gap-3 text-sm text-fog/80">
            <span className="w-3 h-3 rounded-full bg-[#bae6fd]" style={{ boxShadow: '0 0 10px #bae6fd' }}></span>
            Polar & Ice Caps (Wildlife)
          </li>
          <li className="flex items-center gap-3 text-sm text-fog/80">
            <span className="w-3 h-3 rounded-full bg-[#fcd34d]" style={{ boxShadow: '0 0 10px #fcd34d' }}></span>
            Cold Deserts
          </li>
        </ul>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-fog/50 pointer-events-auto">
          <p>Tilted at 23.5° (Earth's natural axis).</p>
          <p className="mt-2">
            Data & Imagery: <a href="https://earthobservatory.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-gold/80 hover:text-gold pointer-events-auto underline">NASA Earth Observatory</a>. 
            Forest coordinates via global datasets.
          </p>
        </div>
      </div>
    </div>
  );
}
