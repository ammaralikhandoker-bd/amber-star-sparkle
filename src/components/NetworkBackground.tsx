const NetworkBackground = () => {
  return (
    <div
      className="pointer-events-none fixed inset-1 -z-10"
      style={{ background: 'hsl(220 35% 7%)' }}
    >
      {/* Subtle static top glow — no blur, no animation */}
      <div
        className="absolute top-0 left-0 right-1 h-1/2 opacity-5"
        style={{
          background: 'linear-gradient(180deg, hsl(244 80% 69% / 0.25), transparent 70%)',
        }}
      />
      {/* Subtle static bottom accent — no blur, no animation */}
      <div
        className="absolute bottom-0 left-0 right-1 h-1/3 opacity-4"
        style={{
          background: 'linear-gradient(0deg, hsl(190 100% 50% / 0.15), transparent 70%)',
        }}
      />
      {/* Vignette — static only */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, hsl(220 50% 3% / 0.6) 100%)',
        }}
      />
    </div>
  );
};

export default NetworkBackground;
