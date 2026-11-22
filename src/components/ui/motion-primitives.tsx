import * as React from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { cn } from '@/src/lib/utils';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll reveal ONLY for section headings and image blocks (fade + 16px rise, 600ms, triggered once).
 * Respects prefers-reduced-motion: renders immediately without staying hidden.
 */
export function RevealBlock({ children, className, delay = 0 }: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxFrameProps {
  children: React.ReactNode;
  className?: string;
  range?: number;
}

/**
 * Subtle vertical parallax strictly for hero and gallery media (max 40px). Never on text.
 */
export function ParallaxMedia({
  children,
  className,
  range = 32,
}: ParallaxFrameProps) {
  const prefersReduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const clamped = Math.min(Math.max(range, 0), 40);
  const y = useTransform(scrollYProgress, [0, 1], [-clamped / 2, clamped / 2]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const prefersReduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = React.useState(prefersReduced ? value : 0);

  React.useEffect(() => {
    if (prefersReduced) {
      setDisplay(value);
      return;
    }
    if (!isInView) return;

    const duration = 900;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, prefersReduced, value]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {display}
      {suffix}
    </span>
  );
}
