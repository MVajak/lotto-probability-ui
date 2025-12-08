import type React from 'react';

import { breakpoints, useMediaQuery } from '@lotto/ui';

interface LotteryBall {
  x: number;
  y: number;
  num: string;
  freq: number;
}

interface LotteryBallsProps {
  width?: number;
  height?: number;
  ballSize?: number;
  className?: string;
}

export const LotteryBalls: React.FC<LotteryBallsProps> = ({ width = 800, height = 400, ballSize, className = '' }) => {
  const isLargeScreen = useMediaQuery(breakpoints.lg);

  // Use responsive ball size: 36px always (if not provided)
  const responsiveBallSize = ballSize ?? 36;

  // Responsive ball positions: closer together on md, spread out on lg
  const balls: LotteryBall[] = isLargeScreen
    ? [
        { x: 50, y: 200, num: '7', freq: 85 },
        { x: 230, y: 160, num: '23', freq: 72 },
        { x: 410, y: 220, num: '42', freq: 91 },
        { x: 590, y: 180, num: '15', freq: 68 },
        { x: 770, y: 210, num: '31', freq: 79 },
        { x: 950, y: 170, num: '49', freq: 88 },
      ]
    : [
        { x: 50, y: 200, num: '7', freq: 85 },
        { x: 180, y: 160, num: '23', freq: 72 },
        { x: 310, y: 220, num: '42', freq: 91 },
        { x: 440, y: 180, num: '15', freq: 68 },
        { x: 570, y: 210, num: '31', freq: 79 },
        { x: 700, y: 170, num: '49', freq: 88 },
      ];

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ overflow: 'visible' }}
      preserveAspectRatio="xMinYMid meet"
      role="img"
      aria-label="Decorative lottery balls with frequency indicators"
    >
      <defs>
        {/* Ball gradient */}
        <radialGradient id="ballGradient">
          <stop offset="0%" stopColor="var(--color-gold-light)" />
          <stop offset="60%" stopColor="var(--color-gold)" />
          <stop offset="100%" stopColor="var(--color-gold-dark)" />
        </radialGradient>

        {/* Shine gradient */}
        <radialGradient id="shineGradient">
          <stop offset="0%" stopColor="var(--color-primary-foreground)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-primary-foreground)" stopOpacity="0" />
        </radialGradient>

        {/* Glow gradient */}
        <radialGradient id="glowGradient">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </radialGradient>

        {/* Frequency bar gradient */}
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-primary-green)" />
          <stop offset="100%" stopColor="var(--color-primary-blue)" />
        </linearGradient>
      </defs>

      {/* Connecting lines between balls */}
      {balls.map((ball, index) => {
        if (index === balls.length - 1) return null;
        const nextBall = balls[index + 1];

        // Calculate angle between balls to offset line endpoints
        const dx = nextBall.x - ball.x;
        const dy = nextBall.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const unitX = dx / distance;
        const unitY = dy / distance;

        // Start line at edge of first ball, end at edge of second ball
        const x1 = ball.x + unitX * responsiveBallSize;
        const y1 = ball.y + unitY * responsiveBallSize;
        const x2 = nextBall.x - unitX * responsiveBallSize;
        const y2 = nextBall.y - unitY * responsiveBallSize;

        return (
          <line
            key={`line-${ball.num}-${nextBall.num}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--color-gold)"
            strokeWidth="2"
            strokeDasharray="5,5"
            strokeOpacity="0.2"
          />
        );
      })}

      {/* Lottery balls */}
      {balls.map((ball) => {
        const barWidth = 60;
        const barHeight = 6;
        const barY = ball.y + responsiveBallSize + 12;
        const fillWidth = (ball.freq / 100) * barWidth;

        return (
          <g key={`ball-${ball.num}`}>
            {/* Glow effect - larger circle with radial gradient */}
            <circle cx={ball.x} cy={ball.y} r={responsiveBallSize + 15} fill="url(#glowGradient)" />

            {/* Main ball */}
            <circle cx={ball.x} cy={ball.y} r={responsiveBallSize} fill="url(#ballGradient)" />

            {/* Shine effect */}
            <circle
              cx={ball.x - responsiveBallSize * 0.27}
              cy={ball.y - responsiveBallSize * 0.27}
              r={responsiveBallSize * 0.27}
              fill="url(#shineGradient)"
            />

            {/* Number on ball */}
            <text
              x={ball.x}
              y={ball.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--color-primary)"
              fontSize="20"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {ball.num}
            </text>

            {/* Frequency bar background (full width, grayish) */}
            <rect
              x={ball.x - barWidth / 2}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="color-mix(in srgb, var(--color-primary-foreground) 10%, transparent)"
              rx="3"
            />

            {/* Frequency bar fill (only the percentage filled) */}
            {fillWidth > 0 && (
              <rect x={ball.x - barWidth / 2} y={barY} width={fillWidth} height={barHeight} fill="url(#barGradient)" />
            )}

            {/* Frequency percentage text */}
            <text
              x={ball.x}
              y={barY + barHeight + 15}
              textAnchor="middle"
              fill="color-mix(in srgb, var(--color-primary-foreground) 70%, transparent)"
              fontSize="10"
              fontFamily="sans-serif"
            >
              {ball.freq}%
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default LotteryBalls;
