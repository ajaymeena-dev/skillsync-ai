import React from "react";

export const AuroraBackground = ({ children, className = "", showRadialGradient = true }) => {
  return (
    <div
      className={`relative flex flex-col w-full items-center justify-center transition-bg bg-gray-50 dark:bg-gray-950 text-slate-950 dark:text-slate-50 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
            [--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,#030712_0%,#030712_7%,transparent_10%,transparent_12%,#030712_16%)]
            [--aurora:repeating-linear-gradient(100deg,#4f46e5_10%,#ec4899_15%,#6366f1_20%,#06b6d4_25%,#4f46e5_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[''] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-60 dark:opacity-40 will-change-transform
          `}
        >
          {showRadialGradient && (
            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_80%)]" />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
