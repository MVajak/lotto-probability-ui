import type React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';

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
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

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
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.4" />
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
        stroke="rgba(0, 255, 136, 0.4)"
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
          fill="rgba(0, 204, 255, 0.8)"
          filter="url(#dataPointGlow)"
        />
      ))}
    </svg>
  );
};

export default StatisticalCurve;
