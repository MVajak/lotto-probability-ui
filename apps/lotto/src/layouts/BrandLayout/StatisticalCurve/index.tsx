import type React from 'react';

import { breakpoints, useMediaQuery } from '@lotto/ui';

interface StatisticalCurveProps {
  width?: number;
  height?: number;
  startX?: number;
  endX?: number;
  baseY?: number;
  className?: string;
}

export const StatisticalCurve: React.FC<StatisticalCurveProps> = ({
  width = 800,
  height = 200,
  startX,
  endX,
  baseY = 100,
  className = '',
}) => {
  const isLargeScreen = useMediaQuery(breakpoints.lg);

  // Responsive curve endpoints: match ball positions
  const responsiveStartX = startX ?? 0;
  const responsiveEndX = endX ?? (isLargeScreen ? 950 : 700);
  // Generate curve points
  const generateCurvePoints = () => {
    const points: { x: number; y: number }[] = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = responsiveStartX + t * (responsiveEndX - responsiveStartX);
      const y = baseY + Math.sin(t * Math.PI * 4) * 30 * (1 - t) + t * 50;
      points.push({ x, y });
    }

    return points;
  };

  const curvePoints = generateCurvePoints();

  // Create SVG path from points
  const pathData = curvePoints.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }
    return `${path} L ${point.x} ${point.y}`;
  }, '');

  // Select some points for data markers (12 points evenly spaced)
  const dataPoints = curvePoints.filter((_, index) => index % 9 === 0);

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ overflow: 'visible' }}
      preserveAspectRatio="xMinYMid meet"
      role="img"
      aria-label="Decorative statistical curve visualization"
    >
      <defs>
        {/* Gradient for the curve */}
        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-primary-green)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-primary-green)" stopOpacity="0.4" />
        </linearGradient>

        {/* Glow effect for data points */}
        <filter id="dataPointGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Statistical curve line */}
      <path
        d={pathData}
        fill="none"
        stroke="color-mix(in srgb, var(--color-primary-green), transparent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points on the curve */}
      {dataPoints.map((point) => (
        <circle
          key={`datapoint-${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="color-mix(in srgb, var(--color-primary-blue) 80%, transparent)"
          filter="url(#dataPointGlow)"
        />
      ))}
    </svg>
  );
};

export default StatisticalCurve;
