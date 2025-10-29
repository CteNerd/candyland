export default function BoardBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Candy decorations scattered around */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 dark:opacity-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>🍭</div>
      <div className="absolute top-20 right-20 text-5xl opacity-20 dark:opacity-10 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}>🍬</div>
      <div className="absolute bottom-20 left-40 text-7xl opacity-15 dark:opacity-10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }}>🧁</div>
      <div className="absolute top-40 left-1/3 text-5xl opacity-20 dark:opacity-10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}>🍰</div>
      <div className="absolute bottom-10 right-40 text-6xl opacity-15 dark:opacity-10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>🍫</div>
      <div className="absolute top-1/2 right-10 text-5xl opacity-20 dark:opacity-10 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3.5s' }}>🍩</div>
    </div>
  );
}
