const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="blob blob-purple w-[500px] h-[500px] -top-40 -left-40" />
      <div className="blob blob-cyan w-[400px] h-[400px] top-1/3 -right-32" />
      <div className="blob blob-indigo w-[350px] h-[350px] -bottom-20 left-1/4" />
    </div>
  );
};

export default AnimatedBackground;
