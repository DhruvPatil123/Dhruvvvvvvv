"use client";

import React, { useEffect, useRef } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  drift: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, lerpX: 0, lerpY: 0 });
  const particles = useRef<Particle[]>([]);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const spawnParticle = (x: number, y: number, isBurst = false) => {
      const count = isBurst ? 15 : 1;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = isBurst ? Math.random() * 3 + 2 : Math.random() * 0.5 + 0.2;

        // Theme-based color mapping
        let color = 'rgba(241, 245, 249, 0.8)'; // Charcoal (Default)
        if (theme === 'emerald') color = `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.5})`;
        if (theme === 'cobalt') color = `rgba(0, 242, 255, ${Math.random() * 0.5 + 0.5})`;
        if (theme === 'charcoal') color = `rgba(241, 245, 249, ${Math.random() * 0.5 + 0.5})`;

        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 0.5,
          alpha: 1,
          color,
          drift: Math.random() * 0.02 - 0.01
        });
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      spawnParticle(e.clientX, e.clientY, true);
    };

    window.addEventListener('mousedown', handleGlobalClick);

    // Listener for .interactive elements burst
    const handleInteractiveHover = () => {
      // This is a simplified way to handle bursts on specific elements.
      // The actual implementation will be handled via the event bubbled up to window
    };

    window.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('interactive') || target.closest('.interactive')) {
        const rect = target.getBoundingClientRect();
        spawnParticle(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
      }
    });

    let animationFrame: number;

    const render = () => {
      // Lerp mouse position
      mouse.current.lerpX += (mouse.current.x - mouse.current.lerpX) * 0.15;
      mouse.current.lerpY += (mouse.current.y - mouse.current.lerpY) * 0.15;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn particles at lerped position
      if (Math.abs(mouse.current.x - mouse.current.lerpX) > 0.1 || Math.abs(mouse.current.y - mouse.current.lerpY) > 0.1) {
        spawnParticle(mouse.current.lerpX, mouse.current.lerpY);
      }

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];

        // Physics
        p.vx += p.drift;
        p.vy += p.drift;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.8', p.alpha.toFixed(2)); // Handle alpha decay

        // Better color handling for themes
        if (theme === 'emerald') ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        else if (theme === 'cobalt') ctx.fillStyle = `rgba(0, 242, 255, ${p.alpha})`;
        else ctx.fillStyle = `rgba(241, 245, 249, ${p.alpha})`;

        ctx.fill();
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleGlobalClick);
      cancelAnimationFrame(animationFrame);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen -z-5 pointer-events-none"
    />
  );
}
