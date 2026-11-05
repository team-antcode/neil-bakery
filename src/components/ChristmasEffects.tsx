'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, Pause } from 'lucide-react';

type ChristmasEffectsProps = {
  enabled?: boolean;
  audioSrc?: string;
};

const SNOW_SETTINGS = {
  flakes: 70,
  mobileFlakes: 35,
  minSize: 5,
  maxSize: 13,
  dotRatio: 0.3,
  minSpeed: 0.5,
  maxSpeed: 1.6,
  wind: 0.4,
  spin: 0.02,
  color: '255,255,255',
  glow: '120,165,225',
} as const;

export default function ChristmasEffects({
  enabled = process.env.NEXT_PUBLIC_CHRISTMAS !== 'false',
  audioSrc = '/audio/jingle-bells.mp3',
}: ChristmasEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);
    const spriteRadius = 48;
    const spritePadding = 8;
    const spriteDimension = (spriteRadius + spritePadding) * 2;
    const variants = [
      { branches: [[0.45, 0.3, 55], [0.72, 0.22, 55]], tip: false },
      { branches: [[0.35, 0.22, 60], [0.6, 0.32, 60], [0.85, 0.16, 60]], tip: false },
      { branches: [[0.55, 0.38, 50]], tip: true },
    ];

    const sprites = variants.map((variant) => {
      const sprite = document.createElement('canvas');
      sprite.width = spriteDimension;
      sprite.height = spriteDimension;
      const spriteContext = sprite.getContext('2d');
      if (!spriteContext) return { image: sprite, half: spriteDimension / 2, radius: spriteRadius };

      spriteContext.translate(spriteDimension / 2, spriteDimension / 2);
      spriteContext.lineCap = 'round';
      spriteContext.strokeStyle = `rgb(${SNOW_SETTINGS.color})`;
      spriteContext.shadowColor = `rgba(${SNOW_SETTINGS.glow}, 0.9)`;
      spriteContext.shadowBlur = 5;

      for (let arm = 0; arm < 6; arm += 1) {
        spriteContext.save();
        spriteContext.rotate((arm * Math.PI) / 3);
        spriteContext.lineWidth = 5;
        spriteContext.beginPath();
        spriteContext.moveTo(0, 0);
        spriteContext.lineTo(spriteRadius, 0);
        spriteContext.stroke();

        spriteContext.lineWidth = 3.5;
        variant.branches.forEach(([position, length, angle]) => {
          const branchPosition = spriteRadius * position;
          const branchLength = spriteRadius * length;
          const branchAngle = (angle * Math.PI) / 180;
          [1, -1].forEach((side) => {
            spriteContext.beginPath();
            spriteContext.moveTo(branchPosition, 0);
            spriteContext.lineTo(
              branchPosition + Math.cos(branchAngle) * branchLength,
              side * Math.sin(branchAngle) * branchLength,
            );
            spriteContext.stroke();
          });
        });

        if (variant.tip) {
          spriteContext.beginPath();
          spriteContext.arc(spriteRadius, 0, 3.5, 0, Math.PI * 2);
          spriteContext.fillStyle = `rgb(${SNOW_SETTINGS.color})`;
          spriteContext.fill();
        }
        spriteContext.restore();
      }

      spriteContext.beginPath();
      spriteContext.arc(0, 0, 5, 0, Math.PI * 2);
      spriteContext.fillStyle = `rgb(${SNOW_SETTINGS.color})`;
      spriteContext.fill();

      return { image: sprite, half: spriteDimension / 2, radius: spriteRadius };
    });

    type Flake = {
      dot: boolean;
      sprite: (typeof sprites)[number];
      x: number;
      y: number;
      radius: number;
      speed: number;
      alpha: number;
      sway: number;
      phase: number;
      rotation: number;
      spin: number;
    };

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];

    const makeFlake = (randomY: boolean): Flake => {
      const dot = Math.random() < SNOW_SETTINGS.dotRatio;
      const radius = dot
        ? randomBetween(1.2, 2.6)
        : randomBetween(SNOW_SETTINGS.minSize, SNOW_SETTINGS.maxSize);
      const sizeRatio =
        (radius - SNOW_SETTINGS.minSize) / (SNOW_SETTINGS.maxSize - SNOW_SETTINGS.minSize);

      return {
        dot,
        sprite: sprites[Math.floor(Math.random() * sprites.length)],
        x: randomBetween(0, width),
        y: randomY ? randomBetween(0, height) : -radius * 2,
        radius,
        speed: dot
          ? randomBetween(SNOW_SETTINGS.minSpeed, SNOW_SETTINGS.minSpeed + 0.5)
          : SNOW_SETTINGS.minSpeed + sizeRatio * (SNOW_SETTINGS.maxSpeed - SNOW_SETTINGS.minSpeed),
        alpha: dot ? randomBetween(0.4, 0.7) : randomBetween(0.65, 1),
        sway: randomBetween(0.5, 1.5),
        phase: randomBetween(0, Math.PI * 2),
        rotation: randomBetween(0, Math.PI * 2),
        spin: randomBetween(-SNOW_SETTINGS.spin, SNOW_SETTINGS.spin),
      };
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (flakes.length === 0) {
        const flakeCount = window.innerWidth < 640
          ? SNOW_SETTINGS.mobileFlakes
          : SNOW_SETTINGS.flakes;
        flakes = Array.from({ length: flakeCount }, () => makeFlake(true));
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      flakes.forEach((flake, index) => {
        flake.y += flake.speed;
        flake.x += Math.sin(time * 0.001 * flake.sway + flake.phase) * 0.6 + SNOW_SETTINGS.wind * 0.3;
        if (!reducedMotion) flake.rotation += flake.spin;

        if (flake.y > height + flake.radius * 2) {
          flakes[index] = makeFlake(false);
          return;
        }
        if (flake.x > width + flake.radius * 2) flake.x = -flake.radius * 2;
        if (flake.x < -flake.radius * 2) flake.x = width + flake.radius * 2;

        context.globalAlpha = flake.alpha;
        if (flake.dot) {
          context.fillStyle = `rgb(${SNOW_SETTINGS.color})`;
          context.shadowColor = `rgba(${SNOW_SETTINGS.glow}, 0.7)`;
          context.shadowBlur = 3;
          context.beginPath();
          context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          context.fill();
          context.shadowBlur = 0;
        } else {
          const scale = flake.radius / flake.sprite.radius;
          const size = flake.sprite.half * 2 * scale;
          context.save();
          context.translate(flake.x, flake.y);
          context.rotate(flake.rotation);
          context.drawImage(flake.sprite.image, -size / 2, -size / 2, size, size);
          context.restore();
        }
      });
      context.globalAlpha = 1;

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    if (reducedMotion) {
      draw(0);
    } else {
      animationFrame = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [enabled]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  if (!enabled) return null;

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Unable to play Christmas music.', error);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60]"
      />
      <audio ref={audioRef} src={audioSrc} loop preload="none" />
      <button
        type="button"
        onClick={() => void togglePlayback()}
        aria-label={isPlaying ? 'Pause Christmas music' : 'Play Jingle Bells'}
        aria-pressed={isPlaying}
        className="fixed bottom-5 right-5 z-[70] flex h-10 w-10 items-center justify-center rounded-full bg-[#e98d1a] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#e98d1a] focus:ring-offset-2"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
      </button>
    </>
  );
}
