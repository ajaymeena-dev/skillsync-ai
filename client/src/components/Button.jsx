// client/src/components/Button.jsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({
  variant = "default",
  size = "default",
  children,
  className = "",
  isLoading = false,
  disabled = false,
  loadingText = "Loading...",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none whitespace-nowrap";

  const variants = {
    default:
      "bg-gradient-to-r from-indigo-600 to-indigo-600 text-white hover:from-indigo-700 hover:to-indigo-700 shadow-md hover:shadow-lg hover:shadow-indigo-500/20 dark:shadow-indigo-900/30 dark:hover:shadow-indigo-700/40 active:scale-[0.98]",
    primary:
      "bg-gradient-to-r from-indigo-600 to-indigo-600 text-white hover:from-indigo-700 hover:to-indigo-700 shadow-md hover:shadow-lg hover:shadow-indigo-500/20 dark:shadow-indigo-900/30 dark:hover:shadow-indigo-700/40 active:scale-[0.98]",
    secondary:
      "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg active:scale-[0.98]",
    outline:
      "border-2 border-indigo-500/60 text-indigo-600 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:border-indigo-400/50 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white dark:hover:border-indigo-500 transition-all active:scale-[0.98]",
    ghost:
      "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/60 dark:hover:text-white transition-all active:scale-[0.98]",
    link: "text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400 p-0 h-auto",
    success:
      "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg active:scale-[0.98]",
    danger:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-lg active:scale-[0.98]",
    destructive:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-md hover:shadow-lg active:scale-[0.98]",
    warning:
      "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-md hover:shadow-lg active:scale-[0.98]",
    info: "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 shadow-md hover:shadow-lg active:scale-[0.98]",
  };

  const sizes = {
    default: "px-5 py-2.5 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
    icon: "p-2",
    "icon-sm": "p-1.5",
    "icon-lg": "p-3",
  };

  const getLoaderSize = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "lg":
        return "w-5 h-5";
      case "xl":
        return "w-6 h-6";
      default:
        return "w-4 h-4";
    }
  };

  return (
    <button
      className={cn(
        base,
        variants[variant] ?? variants.default,
        sizes[size] ?? sizes.default,
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className={`${getLoaderSize()} animate-spin`} />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
