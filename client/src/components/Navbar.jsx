// client/src/components/Navbar.jsx
import { Bell, Menu, Sparkles, Moon, Sun } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetNotificationsQuery } from "../services/notificationApi";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar({
  onMenuClick,
  onNotificationsClick,
  darkMode,
  onDarkModeToggle,
  isMenuOpen = false,
  isNotificationsOpen = false,
}) {
  const { data: notificationsData } = useGetNotificationsQuery();
  const unreadCount = notificationsData?.unreadCount || 0;

  // Ultra-premium VisionOS-style Glassmorphism effect
  // Dark Theme: Deep dark frosted glass that blends with dark background
  // Light Theme: Polished solid dark charcoal with a glossy edge (Apple style) so it doesn't look muddy over white
  const bgStyle = darkMode
    ? "bg-[#09090b]/75 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_10px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(99,102,241,0.15)] ring-1 ring-white/5"
    : "bg-[#111116] border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] ring-1 ring-black/5";

  // Since the Island is always dark, text and icons must always be light!
  const textColor = "text-white";
  const subTextColor = "text-gray-400";
  const iconColor = "text-gray-200";
  const hoverBg = "hover:bg-white/10";

  return (
    <>
      <div className="lg:hidden fixed top-3 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
        <AnimatePresence>
          {!isMenuOpen && !isNotificationsOpen && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`pointer-events-auto w-full max-w-[360px] md:max-w-[480px] relative overflow-hidden flex items-center h-[52px] rounded-full will-change-transform ${bgStyle}`}
            >
              <div className="absolute inset-0 w-full px-4 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`font-semibold tracking-tight text-[13px] leading-tight ${textColor}`}
                    >
                      SkillSync
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-wider font-bold leading-tight ${subTextColor}`}
                    >
                      AI Engine
                    </span>
                  </div>
                </div>

                {/* Actions Area */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDarkModeToggle();
                    }}
                    className={`p-1.5 rounded-full transition-colors active:scale-95 ${hoverBg}`}
                  >
                    {darkMode ? (
                      <Sun className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-indigo-400" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNotificationsClick();
                    }}
                    className={`relative p-1.5 rounded-full transition-colors active:scale-95 ${hoverBg}`}
                  >
                    <Bell className={`w-4 h-4 ${iconColor}`} />
                    {unreadCount > 0 && (
                      <span className="absolute top-[4px] right-[4px] flex h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMenuClick();
                    }}
                    className={`p-2 rounded-full transition-colors ml-0.5 active:scale-95 bg-white/10 hover:bg-white/20`}
                  >
                    <Menu className={`w-4 h-4 ${iconColor}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Spacer to prevent content from hiding behind the island */}
      <div className="h-[72px] lg:hidden" />
    </>
  );
}
