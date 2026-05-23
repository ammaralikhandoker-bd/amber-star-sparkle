/**
 * Trending 2026 mesh-gradient background.
 * Fully static (no JS, no animation, no blur filters) — smooth on every device.
 */
const NetworkBackground = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: 'hsl(220 38% 6%)' }}
    >
      {/* Mesh gradient layer — multiple radial gradients composited for that trending aurora-mesh look */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(at 18% 22%, hsl(244 85% 60% / 0.35) 0px, transparent 50%),
            radial-gradient(at 82% 18%, hsl(190 95% 50% / 0.22) 0px, transparent 55%),
            radial-gradient(at 75% 78%, hsl(280 80% 55% / 0.25) 0px, transparent 50%),
            radial-gradient(at 12% 85%, hsl(42 95% 55% / 0.18) 0px, transparent 50%),
            radial-gradient(at 50% 50%, hsl(220 70% 12% / 0.6) 0px, transparent 70%)
          `,
        }}
      />

      {/* Subtle grid overlay for depth (pure CSS, GPU-friendly) */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(0 0% 100%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(0 0% 100%) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Soft vignette for focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, hsl(220 55% 3% / 0.75) 100%)',
        }}
      />

      {/* Fine noise texture (SVG data-uri, ~1KB, no network) for a premium tactile feel */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  );
};

export default NetworkBackground;
