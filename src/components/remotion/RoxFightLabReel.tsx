import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CURRICULUM_STEPS = [
  { code: 'LVL 01', title: 'STANCE & GUARD', tag: 'DEFENSE FOUNDATION' },
  { code: 'LVL 02', title: 'JAB · CROSS · HOOK', tag: 'BAG & PAD WORK' },
  { code: 'LVL 03', title: 'COUNTERPUNCHING', tag: 'TIMING & FOOTWORK' },
  { code: 'LVL 04', title: 'TECHNICAL SPARRING', tag: "20' × 20' RING" },
];

export const RoxFightLabComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(155deg, #060B18 0%, #0B1530 55%, #060B18 100%)',
        fontFamily: '"Manrope", system-ui, sans-serif',
        color: '#F4F5F7',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Blueprint Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.16,
          backgroundImage:
            'linear-gradient(to right, rgba(0,229,153,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,229,153,0.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top HUD Bar */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          left: 36,
          right: 36,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          letterSpacing: '0.18em',
          color: '#00E599',
        }}
      >
        <span>ROX BOXING GYM · BENGALURU</span>
        <span style={{ color: '#D4AF37' }}>EST. 2018 · KABA AFFILIATED</span>
      </div>

      {/* SCENE 1 (0–90): Animated 20'x20' Ring Blueprint */}
      <Sequence from={0} durationInFrames={95}>
        <RingBlueprintScene frame={frame} fps={fps} />
      </Sequence>

      {/* SCENE 2 (90–190): 4-Level Certified Curriculum */}
      <Sequence from={90} durationInFrames={105}>
        <CurriculumScene />
      </Sequence>

      {/* SCENE 3 (190–270): Sweat, Blood & Glory Lockup */}
      <Sequence from={190} durationInFrames={80}>
        <GloryLockupScene />
      </Sequence>
    </AbsoluteFill>
  );
};

function RingBlueprintScene({ frame, fps }: { frame: number; fps: number }) {
  const scale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const ropeProgress = interpolate(frame, [10, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [75, 95], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 64px',
      }}
    >
      <div style={{ maxWidth: 460 }}>
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            letterSpacing: '0.2em',
            color: '#00E599',
            marginBottom: 12,
          }}
        >
          01 / FULL-RING ARCHITECTURE
        </div>
        <div
          style={{
            fontFamily: '"Oswald", sans-serif',
            fontSize: 64,
            lineHeight: 0.94,
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          20&apos; × 20&apos;{' '}
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              color: '#D4AF37',
              textTransform: 'lowercase',
              fontWeight: 600,
            }}
          >
            platform
          </span>{' '}
          RING
        </div>
        <div style={{ marginTop: 14, fontSize: 18, color: '#94A3B8' }}>
          5,000 sq. ft. dedicated boxing floor in HSR Extension, Bengaluru.
        </div>
      </div>

      {/* Animated Top-Down Boxing Ring */}
      <div
        style={{
          width: 280,
          height: 280,
          position: 'relative',
          transform: `scale(${scale})`,
          borderRadius: 16,
          background: 'rgba(15, 26, 54, 0.85)',
          border: '2px solid rgba(212, 175, 55, 0.65)',
          boxShadow: '0 0 50px rgba(0, 229, 153, 0.2)',
        }}
      >
        {/* Inner Ropes */}
        <div
          style={{
            position: 'absolute',
            inset: 22,
            border: '2px solid #00E599',
            transform: `scale(${ropeProgress})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 42,
            border: '1px dashed rgba(212, 175, 55, 0.5)',
            transform: `scale(${ropeProgress})`,
          }}
        />
        {/* 4 Corner Turnbuckles */}
        {[
          { top: -7, left: -7, bg: '#D4AF37' },
          { top: -7, right: -7, bg: '#00E599' },
          { bottom: -7, left: -7, bg: '#00E599' },
          { bottom: -7, right: -7, bg: '#D4AF37' },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 14,
              height: 14,
              borderRadius: 99,
              background: c.bg,
              top: c.top,
              left: c.left,
              right: c.right,
              bottom: c.bottom,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 22,
            fontWeight: 700,
            color: '#D4AF37',
          }}
        >
          20&apos; × 20&apos;
        </div>
      </div>
    </AbsoluteFill>
  );
}

function CurriculumScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeOut = interpolate(frame, [85, 105], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        padding: '84px 48px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          letterSpacing: '0.2em',
          color: '#00E599',
          marginBottom: 16,
        }}
      >
        02 / 4-LEVEL CERTIFIED CURRICULUM
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        {CURRICULUM_STEPS.map((step, idx) => {
          const pop = spring({
            frame: Math.max(0, frame - idx * 10),
            fps,
            config: { damping: 14, stiffness: 140 },
          });
          return (
            <div
              key={step.code}
              style={{
                transform: `translateY(${(1 - pop) * 24}px)`,
                opacity: pop,
                borderRadius: 14,
                border: '1px solid rgba(148,163,184,0.2)',
                background: 'rgba(15, 26, 54, 0.9)',
                padding: '20px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 12,
                  color: '#D4AF37',
                  letterSpacing: '0.16em',
                }}
              >
                {step.code} · {step.tag}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                {step.title}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function GloryLockupScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transform: `scale(${0.92 + pop * 0.08})`,
        opacity: pop,
      }}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          letterSpacing: '0.24em',
          color: '#00E599',
        }}
      >
        4.9 / 5 · 280+ GOOGLE REVIEWS
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: '"Oswald", sans-serif',
          fontSize: 76,
          lineHeight: 0.92,
          fontWeight: 700,
        }}
      >
        SWEAT, BLOOD &amp;{' '}
        <span
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            color: '#D4AF37',
          }}
        >
          Glory
        </span>
      </div>
      <div
        style={{
          marginTop: 18,
          borderRadius: 999,
          padding: '10px 26px',
          background: 'linear-gradient(135deg, #E8CA64 0%, #C59B27 100%)',
          color: '#060B18',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.14em',
        }}
      >
        BOOK YOUR ₹0 FREE TRIAL
      </div>
    </AbsoluteFill>
  );
}
