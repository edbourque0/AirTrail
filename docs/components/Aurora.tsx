import React from 'react';

const widths = ['0.5rem', '1rem', '1.5rem', '2rem', '2.5rem', '3rem', '4rem'];
const heights = ['80%', '85%', '90%', '95%', '100%'];
const anims = [
  ['0s', '4s'],
  ['-3s', '7s'],
  ['-2s', '8s'],
  ['-3s', '9s'],
  ['-2s', '10s'],
  ['-4s', '11s'],
  ['-6s', '12s'],
];
const opacity = [
  'opacity-10',
  'opacity-20',
  'opacity-30',
  'opacity-40',
  'opacity-50',
  'opacity-60',
  'opacity-70',
  'opacity-80',
  'opacity-90',
  'opacity-100',
];
const margins = ['0', '0.3rem', '1rem'];

interface AuroraProps {
  className?: string;
  bands: number;
}

const Aurora: React.FC<AuroraProps> = ({ className = '', bands }) => {
  return (
    <>
      <style>
        {`
          .aurora {
            transform: perspective(300px) rotateX(-10deg) rotateY(-9deg);
            pointer-events: none;
            position: fixed;
            inset: 5rem 0 0 0;
            z-index: -10;
            display: flex;
            align-items: center;
            width: 100%;
            height: 300px;
            filter: blur(1.5rem);
          }

          @media (max-width: 60rem) {
            .aurora {
              filter: blur(1rem);
            }
            .aurora-slice:nth-child(odd) {
              display: none;
            }
          }

          .aurora-slice {
            will-change: transform;
            animation-name: aurora;
            animation-timing-function: ease-in-out;
            animation-iteration-count: 20;
            flex-grow: 1;
            background-image: linear-gradient(
              0deg,
              rgba(30, 58, 138, 0) 0%,
              rgba(29, 78, 216, 0.8) 4%,
              rgba(37, 99, 235, 0.6) 5%,
              rgba(96, 165, 250, 0.75) 8%,
              rgba(59, 130, 246, 0.4) 12%,
              rgba(191, 219, 254, 0.65) 22%,
              rgba(30, 58, 138, 0.55) 40%,
              rgba(30, 58, 138, 0) 100%
            );
          }

          [data-theme="light"] .aurora-slice {
            background-image: linear-gradient(
              0deg,
              rgba(30, 58, 138, 0) 0%,
              rgba(29, 78, 216, 0.5) 4%,
              rgba(37, 99, 235, 0.35) 8%,
              rgba(59, 130, 246, 0.3) 18%,
              rgba(191, 219, 254, 0.15) 20%,
              rgba(30, 58, 138, 0.4) 40%,
              rgba(30, 58, 138, 0) 100%
            );
          }

          @keyframes aurora {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(10%);
            }
          }
        `}
      </style>
      <div className={`aurora ${className}`}>
        {Array.from({ length: bands }).map((_, i) => {
          const opacityI =
            i < bands / 2
              ? Math.ceil(i / 2)
              : bands - i < opacity.length
                ? bands - i
                : Math.floor(
                    (Math.random() * opacity.length) / 2 + opacity.length / 2,
                  );
          const anim = Math.floor(Math.random() * anims.length);
          return (
            <div
              key={i}
              className="aurora-slice"
              style={{
                animationDelay: anims[anim][0],
                animationDuration: anims[anim][1],
                opacity: (opacityI + 1) / 15,
                marginRight:
                  margins[Math.floor(Math.random() * margins.length)],
                height: heights[Math.floor(Math.random() * heights.length)],
                width: widths[Math.floor(Math.random() * widths.length)],
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Aurora;
