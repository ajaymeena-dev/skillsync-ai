import React from "react";

export function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)] ${
        className || ""
      }`}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full bg-purple-500/10 dark:bg-purple-500/5 shadow-xl border border-purple-500/20 dark:border-purple-500/10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
            }}
          />
        );
      })}
    </div>
  );
}
